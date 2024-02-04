import React from "react";
import { API } from "setup/backend-manager";
import CrossIcon from "assets/svg/cross-black.svg";
import moment from "moment";

const ProductDetail = ({ product, setProductDetail }) => {
  console.log(product.pCategory);
  return (
    <section className="productDetail-section">
      <div className="black-background">
        <div className="popup-big-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header">{product.pName}</h1>
              <div className="cross-sec" onClick={() => setProductDetail(null)}>
                <img src={CrossIcon} alt="" className="cross-img" />
              </div>
            </div>

            <div className="popup-form">
              <div className="popup-form-double-group adminDashPanel-profileDetails-double-group">
                <div className="popup-form-group adminDashPanel-productDetails-img-div">
                  <img
                    className="adminDashPanel-productDetails-img"
                    src={product.pImg.url}
                    alt=""
                  />
                </div>
                <div className="popup-form-group">
                  <div className="popup-form-group adminDashPanel-profileDetails-group">
                    <label className="popup-form-label">Product Name</label>
                    <p className="popup-form-value adminDashPanel-productDetails-value">
                      {product.pName}
                    </p>
                  </div>
                  <div className="popup-form-group adminDashPanel-profileDetails-group">
                    <label className="popup-form-label">
                      Product Description
                    </label>
                    <p className="popup-form-value adminDashPanel-productDetails-value">
                      {product.pDescription}
                    </p>
                  </div>
                </div>
              </div>
              <div className="popup-form-triple-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Price</label>
                  <p className="popup-form-value adminDashPanel-productDetails-value">
                    {product.pPrice}
                  </p>
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Stock</label>
                  <p className="popup-form-value adminDashPanel-productDetails-value">
                    {product.pStock}
                  </p>
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Category</label>
                  <p className="popup-form-value adminDashPanel-productDetails-value">
                    {product.pCategory}
                  </p>
                </div>
              </div>
              <div className="popup-form-double-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Created On</label>
                  <p className="popup-form-value adminDashPanel-productDetails-value">
                    {moment(product.createdAt).format("DD-MMM-yyyy")}
                  </p>
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Updated On</label>
                  <p className="popup-form-value adminDashPanel-productDetails-value">
                    {moment(product.updatedAt).format("DD-MMM-yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {error && errorMessage()} */}
    </section>
  );
};

export default ProductDetail;
