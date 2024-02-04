import React, { useState } from "react";
import { isAuthenticated } from "api/auth";
import Cross from "assets/svg/cross-black.svg";
import {
  adminUpdatePaymentStatus,
  employeeUpdatePaymentStatus,
} from "api/order";

const PaymentStatusUpdate = ({ setOrderUpdatePayment, order }) => {
  const [status, setStatus] = useState(order.OpaymentStatus);

  const { user, token } = isAuthenticated();

  const handleUpdate = async (userId, token, orderId, status) => {
    try {
      const updateOrderStatus =
        user.role === 2
          ? adminUpdatePaymentStatus(userId, token, orderId, status)
          : employeeUpdatePaymentStatus(userId, token, orderId, status);

      let data = await updateOrderStatus;
      if (data.error) {
        return console.log(data.error);
      } else {
        return setOrderUpdatePayment("");
      }
    } catch (error) {
      return console.log(error);
    }
  };
  return (
    <section className="orderUpdate-section">
      <div className="black-background">
        <div className="popup-small-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header orderUpdate-popup-header">
                Update Payment Status
              </h1>
              <div
                className="cross-sec"
                onClick={() => setOrderUpdatePayment(null)}
              >
                <img src={Cross} alt="" className="cross-img" />
              </div>
            </div>
            <div className="popup-form">
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Order ID</label>
                  <p className="popup-form-value">{order._id}</p>
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Order Status</label>
                  <select
                    name="orderStatus"
                    id="orderStatus"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="popup-form-value"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>
              <button
                className={`popup-form-btn ${
                  status === order.OpaymentStatus ? "button-unclickable" : ""
                }`}
                onClick={() => handleUpdate(user._id, token, order._id, status)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentStatusUpdate;
