import React, { useState, useEffect } from "react";
import { API } from "setup/backend-manager";
import Trash from "assets/svg/Trash.svg";
import { getProduct } from "api/product";
import { useSelector } from "react-redux";

import "./style.css";

const CartItem = ({
  cartItemProductId,
  cartItemQuantity,
  updateQuantity,
  deleteProduct,
}) => {
  const cart = useSelector((state) => state.allCart.cart);

  const [product, setProduct] = useState({
    _id: "",
    pName: "",
    pPrice: "",
    pCategory: "",
    pImg: "",
  });
  const [quantity, setQuantity] = useState(cartItemQuantity);

  const { _id, pName, pPrice, pCategory, pImg } = product;

  const getProductDetails = async (productId) => {
    try {
      const data = await getProduct(productId);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setProduct({
          ...product,
          _id: data._id,
          pName: data.pName,
          pPrice: data.pPrice,
          pCategory: data.pCategory,
          pImg: data.pImg,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails(cartItemProductId);
  }, [cart]);

  useEffect(() => {
    updateQuantity(product._id, quantity);
  }, [quantity]);

  return (
    <div className="cartItem-item">
      {pImg !== "" && (
        <>
          <div className="cartItem-item-left">
            <div className="cartItem-item-img-sec">
              <img src={pImg.url} alt="" className="cartItem-item-img" />
            </div>
            <div className="cartItem-item-info">
              <h2 className="cartItem-item-productName">{pName}</h2>
              <div
                className={`cartItem-item-category-sec ${
                  pCategory === "vegetable" ? "color-green" : "color-orange"
                }`}
              >
                <p className="cartItem-item-category">
                  {pCategory === "vegetable" ? "Veg" : "Fruit"}
                </p>
              </div>
            </div>
            <div className="cartItem-item-action">
              <div className="cartItem-item-quantity-sec">
                <h4 className="cartItem-item-quantity-h3">QTY:</h4>
                <input
                  type="text"
                  className="cartItem-item-quantity-input"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                />
                <h4 className="cartItem-item-quantity-h3">Kg</h4>
              </div>
              <img
                src={Trash}
                alt=""
                className="cartItem-item-delete-icon"
                onClick={() => deleteProduct(_id)}
              />
            </div>
          </div>
          <div className="cartItem-item-right">
            <h2 className="cartItem-item-price">{`${pPrice}/Kg`}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
