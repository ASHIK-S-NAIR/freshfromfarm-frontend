import React, { useState, useEffect } from "react";
import { isAuthenticated } from "api/auth";
import Cross from "assets/svg/cross-black.svg";
import { getUser } from "api/user";

import "./style.css";

const OrderDetails = ({ setOrderActive, order }) => {
  const [userDetails, setUserDetails] = useState();
  const { user, token } = isAuthenticated();

  const loadUserDetails = async (userId, token) => {
    try {
      const data = await getUser(userId, token);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setUserDetails(data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    loadUserDetails(user._id, token);
  }, []);
  return (
    <section className="orderDetails-section">
      <div className="black-background">
        <div className="popup-big-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header orderDetails-popup-header">
                Order #{order._id}
              </h1>
              <div className="cross-sec" onClick={() => setOrderActive(null)}>
                <img src={Cross} alt="" className="cross-img" />
              </div>
            </div>
            <table className="popup-table">
              <thead className="popup-table-head-sec">
                <tr>
                  <th className="popup-table-head-value">Products</th>
                  <th className="popup-table-head-value">Category</th>
                  <th className="popup-table-head-value">Quantity</th>
                  <th className="popup-table-head-value">Price</th>
                  <th className="popup-table-head-value popup-table-head-value-amount">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="popup-table-body-sec">
                {order.Oproducts.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td className="popup-table-body-value popup-table-body-value-name">
                        {product.pName}
                        <br />
                        <span>{product.pDescription}</span>
                      </td>
                      <td className="popup-table-body-value">
                        {product.pCategory}
                      </td>
                      <td className="popup-table-body-value">
                        {product.pQuantity} Kg
                      </td>
                      <td className="popup-table-body-value">
                        {product.pPrice}
                      </td>
                      <td className="popup-table-body-value popup-table-body-value-amount">
                        {product.pAmount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="popup-form-single-group orderDetails-total-sec">
              <p className="popup-form-label">
                <span> Total :</span> {order.OtotalPrice}
              </p>
            </div>
            {userDetails && (
              <div className="popup-form-double-group orderDetails-info-sec">
                <div className="orderDetails-info-left">
                  <div className="orderDetails-info-subsec">
                    <p className="popup-form-label orderDetails-info-label">
                      Order ID
                    </p>
                    <p className="orderDetails-info-value">{order._id}</p>
                  </div>
                  <div className="orderDetails-info-subsec">
                    <p className="popup-form-label orderDetails-info-label">
                      Order Status
                    </p>
                    <p className="orderDetails-info-value"> {order.Ostatus}</p>
                  </div>
                  <div className="orderDetails-info-subsec">
                    <p className="popup-form-label orderDetails-info-label">
                      Payment Mode
                    </p>
                    <p className="orderDetails-info-value">
                      {" "}
                      {order.OpaymentMode}
                    </p>
                  </div>
                  <div className="orderDetails-info-subsec">
                    <p className="popup-form-label orderDetails-info-label">
                      Delivery By
                    </p>
                    <p className="orderDetails-info-value">
                      {" "}
                      {order.OEmployeeId || "Not Assigned"}
                    </p>
                  </div>
                </div>
                <div className="orderDetails-info-right">
                  <div className="orderDetails-info-subsec">
                    <p className="popup-form-label orderDetails-info-label">
                      Ordered By
                    </p>
                    <p className="orderDetails-info-value">
                      {" "}
                      {order.Ouser.name}
                    </p>

                    <p className="orderDetails-info-value">
                      {" "}
                      {order.Ouser.phoneNumber}
                    </p>

                    <p className="orderDetails-info-value">
                      {" "}
                      {order.Ouser.email}
                    </p>
                  </div>
                  <div className="orderDetails-info-subsec">
                    <p className="popup-form-label orderDetails-info-label">
                      Delivery Address
                    </p>
                    <p className="orderDetails-info-value">
                      {" "}
                      {order.Oaddress.houseName}
                    </p>
                    <p className="orderDetails-info-value">
                      {" "}
                      {order.Oaddress.streetName}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;