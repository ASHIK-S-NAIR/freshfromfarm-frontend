import React, { useState, useEffect } from "react";
import ViewIcon from "assets/svg/view.svg";
import EditIcon from "assets/svg/Edit.svg";
import AddIcon from "assets/svg/add.svg";
import TrashIcon from "assets/svg/Trash.svg";
import { isAuthenticated } from "api/auth";
import { getAllProducts } from "api/product";
import { API } from "setup/backend-manager";
import AddProduct from "./Components/AddProduct";
import ProductDetail from "./Components/ProductDetail";
import EditProduct from "./Components/EditProduct";
import DeleteProduct from "./Components/DeleteProduct";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [addProductActive, setAddProductActive] = useState("");
  const [editProductActive, setEditProductActive] = useState("");
  const [deleteProductActive, setDeleteProductActive] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [product, setProduct] = useState();
  const [countValues, setCountValues] = useState({
    all: 0,
    Fruit: 0,
    Vegetable: 0,
  });

  const { user, token } = isAuthenticated();

  const { all, Fruit, Vegetable } = countValues;

  const loadProducts = async (category) => {
    try {
      const data = await getAllProducts(category);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setProducts(data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const filterBtn = (CategoryState, CategoryValue, CategoryBtnValue) => {
    return (
      <button
        className={`orders-filter-btn ${
          category === CategoryState ? "active" : ""
        }`}
        onClick={() => setCategory(CategoryState)}
      >
        {CategoryBtnValue}{" "}
        <span className="filter-btn-value">{CategoryValue}</span>
      </button>
    );
  };

  const loadCountValues = async () => {
    var products = [];
    try {
      const data = await getAllProducts("all");
      if (data.error) {
        return console.log(data.error);
      } else {
        products = data;
      }
    } catch (error) {
      return console.log(error);
    }

    setCountValues({
      ...countValues,
      all: products.length,
      Fruit: products.filter((product) => product.pCategory === "fruit").length,
      Vegetable: products.filter((product) => product.pCategory === "vegetable")
        .length,
    });
  };

  const handlePreview = (product) => {
    return setProductDetail("productDetail"), setProduct(product);
  };
  const handleEdit = (product) => {
    return setEditProductActive("editProduct"), setProduct(product);
  };
  const handleDelete = async (product) => {
    return setDeleteProductActive("deleteProduct"), setProduct(product);
  };

  useEffect(() => {
    loadProducts(category);
  }, [category, addProductActive, editProductActive]);

  useEffect(() => {
    loadCountValues();
  }, [category, addProductActive, editProductActive]);

  return (
    <section className="adminDashPanel-section product-section">
      <h1 className="adminDashPanel-right-header">Products</h1>
      <div className="adminDashPanel-right-subsection adminDashPanel-product-add-btn-subSection">
        <button
          className="adminDashPanel-product-add-btn"
          onClick={() => setAddProductActive("addProduct")}
        >
          <img
            src={AddIcon}
            className="adminDashPanel-product-add-btn-icon"
            alt=""
          />
          ADD PRODUCT
        </button>
      </div>
      <div className="adminDashPanel-right-subsection adminDashPanel-product-filter-subSection">
        {filterBtn("all", all, "All")}
        {filterBtn("fruit", Fruit, "Fruit")}
        {filterBtn("vegetable", Vegetable, "Vegetable")}
      </div>
      <div className="adminDashPanel-right-subsection">
        <table className="adminDashPanel-right-table">
          <thead className="adminDashPanel-right-table-head-sec">
            <tr>
              <th className="adminDashPanel-right-table-head-value">
                Product Image
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Product Name
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Product ID
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Description
              </th>

              <th className="adminDashPanel-right-table-head-value">
                Category
              </th>

              <th className="adminDashPanel-right-table-head-value">Stock</th>
              <th className="adminDashPanel-right-table-head-value">Price</th>
              <th className="adminDashPanel-right-table-head-value">Action</th>
            </tr>
          </thead>
          <tbody className="adminDashPanel-right-table-body-sec">
            {products &&
              products.map((product, index) => {
                return (
                  <tr
                    key={index}
                    className="adminDashPanel-right-table-body-tr"
                  >
                    <td className="adminDashPanel-right-table-body-value">
                      <img
                        className="adminDashPanel-product-img"
                        src={product.pImg.url}
                        alt=""
                      />
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {product.pName}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {product._id}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {product.pDescription}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {product.pCategory}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {product.pStock !== 0
                        ? `${product.pStock} Kg`
                        : "Out of Stock"}
                    </td>

                    <td className="adminDashPanel-right-table-body-value">
                      {product.pPrice}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      <button onClick={() => handlePreview(product)}>
                        <img
                          src={ViewIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                      <button onClick={() => handleEdit(product)}>
                        <img
                          src={EditIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                      <button onClick={() => handleDelete(product)}>
                        <img
                          src={TrashIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {addProductActive === "addProduct" && (
        <AddProduct setAddProductActive={setAddProductActive} />
      )}
      {editProductActive === "editProduct" && (
        <EditProduct
          setEditProductActive={setEditProductActive}
          product={product}
        />
      )}
      {deleteProductActive === "deleteProduct" && (
        <DeleteProduct
          setDeleteProductActive={setDeleteProductActive}
          product={product}
        />
      )}
      {productDetail === "productDetail" && (
        <ProductDetail setProductDetail={setProductDetail} product={product} />
      )}
    </section>
  );
};

export default Product;
