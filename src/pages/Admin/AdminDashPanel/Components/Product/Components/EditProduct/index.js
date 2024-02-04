import React, { useState, useEffect } from "react";
import { isAuthenticated } from "api/auth";
import {
  getProduct,
  updateProduct,
  updateProductWithImage,
} from "api/product";
import CrossIcon from "assets/svg/cross-black.svg";

const EditProduct = ({ setEditProductActive, product }) => {
  const [values, setValues] = useState({
    pName: "",
    pDescription: "",
    pStock: "",
    pCategory: "",
    pPrice: "",
  });

  const [file, setFile] = useState(null);

  const { pName, pDescription, pStock, pCategory, pPrice } = values;

  const { user, token } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    console.log("file", file);
  };

  const loadValues = async () => {
    try {
      const data = await getProduct(product._id);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setValues({
          ...values,
          pName: data.pName,
          pDescription: data.pDescription,
          pStock: data.pStock,
          pCategory: data.pCategory,
          pPrice: data.pPrice,
        });
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("pImg", file);
      formData.append("pName", pName);
      formData.append("pDescription", pDescription);
      formData.append("pStock", pStock);
      formData.append("pPrice", pPrice);
      formData.append("pCategory", pCategory);
      try {
        const data = await updateProductWithImage(
          user._id,
          token,
          product._id,
          formData
        );
        if (data.error) {
          return console.log(data.error);
        } else {
          return setEditProductActive(null);
        }
      } catch (error) {
        return console.log(error);
      }
    } else {
      try {
        const data = await updateProduct(user._id, token, product._id, values);
        if(data.error){
          return console.log(data.error);
        }else{
          return setEditProductActive(null);
        }
      } catch (error) {
        return console.log(error);
      }
    }
  };

  useEffect(() => {
    loadValues();
  }, []);

  return (
    <section className="addProduct-section">
      <div className="black-background">
        <div className="popup-big-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header">Edit Product</h1>
              <div
                className="cross-sec"
                onClick={() => setEditProductActive(null)}
              >
                <img src={CrossIcon} alt="" className="cross-img" />
              </div>
            </div>

            <form className="popup-form" onSubmit={onSubmit}>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Name</label>
                  <input
                    type="text"
                    className="popup-form-input"
                    value={pName}
                    onChange={handleChange("pName")}
                  />
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">
                    Product Description
                  </label>
                  <textarea
                    className="popup-form-input adminDashPanel-addproduct-textArea"
                    name="popup-form-input"
                    id="popup-form-input"
                    cols="30"
                    rows="10"
                    value={pDescription}
                    onChange={handleChange("pDescription")}
                  ></textarea>
                </div>
              </div>
              <div className="popup-form-triple-group adminDashPanel-addProducts-triple-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Price</label>
                  <input
                    type="number"
                    className="popup-form-input"
                    value={pPrice}
                    onChange={handleChange("pPrice")}
                  />
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Stock</label>
                  <input
                    type="number"
                    className="popup-form-input"
                    value={pStock}
                    onChange={handleChange("pStock")}
                  />
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Category</label>
                  <select
                    name="category"
                    id="category"
                    className="popup-form-value"
                    onChange={handleChange("pCategory")}
                  >
                    <option value="fruit">Select Category</option>
                    <option value="fruit">Fruit</option>
                    <option value="vegetable">Vegetable</option>
                  </select>
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Image</label>
                  <div className="popup-form-input-div adminDashPanel-addProducts-input-div">
                    <input
                      type="file"
                      name="pImg"
                      accept="image/*"
                      className="popup-form-input"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <button className="popup-form-btn" type="submit">
                    Edit Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* {error && errorMessage()} */}
    </section>
  );
};

export default EditProduct;
