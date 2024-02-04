import React, { useState } from "react";
import { isAuthenticated } from "api/auth";
import { deleteProduct } from "api/product";
import CrossIcon from "assets/svg/cross-black.svg";

const DeleteProduct = ({ setDeleteProductActive, product }) => {
  const [value, setValue] = useState("");

  const { user, token } = isAuthenticated();

  const onSubmit = async () => {
    try {
      const data = await deleteProduct(user._id, token, product._id);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setDeleteProductActive(null);
      }
    } catch (error) {
      return console.log(error);
    }
  };
  return (
    <section className="deleteProduct-section">
      <div className="black-background">
        <div className="popup-small-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header">Delete Product</h1>
              <div
                className="cross-sec"
                onClick={() => setDeleteProductActive(null)}
              >
                <img src={CrossIcon} alt="" className="cross-img" />
              </div>
            </div>
            <form className="popup-form" onSubmit={onSubmit}>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <p className="popup-form-p-light">
                    This action <b>cannot</b> be undone. This will permanently
                    delete the <b>{product.pName}</b> product from your
                    database.
                  </p>
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <p className="popup-form-p-light">
                    Please type <b>{product._id}</b>  to confirm.
                  </p>
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <input
                    type="text"
                    className="popup-form-input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <button className={`popup-form-btn ${product._id == value ? "" :" button-unclickable" }`} type="submit">
                    Delete Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteProduct;
