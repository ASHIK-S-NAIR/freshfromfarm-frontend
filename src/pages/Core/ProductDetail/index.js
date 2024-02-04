import React, { useState, useEffect } from "react";
import { API } from "setup/backend-manager";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct, getAllProducts } from "api/product";
import { isAuthenticated } from "api/auth/index";
import { addToUserCart } from "api/user";
import { useDispatch } from "react-redux";
import { fetchCart } from "setup/redux-manager/actions/cartActions";
import "./style.css";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("1");

  const { user, token } = isAuthenticated();

  const { productId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loadProduct = async (productId) => {
    try {
      const data = await getProduct(productId);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setProduct(data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await getAllProducts(product.pCategory);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setProducts(data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      if (isAuthenticated() && user.role === 0) {
        var data = await addToUserCart(user._id, token, {
          productId,
          quantity,
        });
        if (data.error) {
          console.log(data.error);
        } else {
          dispatch(fetchCart());
          return navigate(`/cart/${user._id}`);
        }
      } else if (isAuthenticated()) {
        return "";
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProduct(productId);
  }, [productId]);

  useEffect(() => {
    loadProducts(productId);
  }, [product]);

  return (
    <section className="productDetail productDetail-section">
      {product && (
        <div className="wrap productDetail-wrap">
          <div className="productDetail-img-sec">
            <div className="productDetail-img-container">
              <div
                className={`productDetail-category-sec ${
                  product.pCategory === "vegetable"
                    ? "color-green"
                    : "color-orange"
                }`}
              >
                <p className="productDetail-category">
                  {product.pCategory === "vegetable" ? "Veg" : "Fruit"}
                </p>
              </div>
              <img
                className="productDetail-img"
                src={product.pImg.url}
                alt=""
              />
            </div>
          </div>
          <div className="productDetail-info">
            <h1 className="productDetail-name">{product.pName}</h1>
            <h2 className="productDetail-price">
              ₹<span>{product.pPrice + "/Kg"}</span>
            </h2>
            <p className="productDetail-description">{product.pDescription}</p>
            <h3 className="productDetail-stock">{product.pStock}kg in stock</h3>
            <div className="productDetail-quantity-sec">
              <p className="productDetail-quantity-p">QTY:</p>{" "}
              <input
                type="text"
                className="productDetail-quantity"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
              <p className="productDetail-quantity-p">Kg</p>
            </div>
            <button
              className={`productDetail-btn ${
                product.pStock === 0 ? "button-unclickable" : ""
              }`}
              onClick={() => handleAddToCart(product._id, quantity)}
            >
              Add to Cart
            </button>
            {product.pStock === 0 && (
              <p className="productDetail-OOS">Currently Out of Stock</p>
            )}
          </div>
        </div>
      )}

      {products && (
        <div className="wrap products-wrap">
          {products.map((product, index) => {
            return (
              <Link to={`/product/${product._id}`} key={index}>
                <div className="product-sec">
                  {product.pStock === 0 && (
                    <div className="outOfStock">
                      <div className="outOfStock-div">
                        <p className="outOfStock-p">Out Of Stock</p>
                      </div>
                    </div>
                  )}
                  {product && (
                    <img
                      className="product-img"
                      src={product.pImg.url}
                      alt=""
                      loading="lazy"
                    />
                  )}

                  <div className="product-info">
                    <h2 className="product-name">{product.pName}</h2>
                    <h3 className="product-stock">
                      {product.pStock} Kg in stock
                    </h3>
                    <h1 className="product-price">{product.pPrice}/Kg</h1>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
