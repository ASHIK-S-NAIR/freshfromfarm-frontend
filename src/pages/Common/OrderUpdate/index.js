import React, { useState } from "react";
import { isAuthenticated } from "api/auth";
import Cross from "assets/svg/cross-black.svg";
import { adminUpdateOrderStatus, employeeUpdateOrderStatus } from "api/order";

const OrderUpdate = ({ setOrderUpdateActive, order }) => {
  const [status, setStatus] = useState(order.Ostatus);

  const { user, token } = isAuthenticated();

  const loadOptions = (orderStatus) => {
    if (orderStatus === "Not-Confirmed") {
      return (
        <>
          <option value="Not-Confirmed">Not-Confirmed</option>
          <option value="Ordered">Ordered</option>
          <option value="Cancelled">Cancelled</option>
        </>
      );
    }

    if (orderStatus === "Ordered") {
      return (
        <>
          <option value="Ordered">Ordered</option>
          <option value="Cancelled">Cancelled</option>
        </>
      );
    }

    if (orderStatus === "Processing") {
      return (
        <>
          <option value="Processing">Processing</option>
          <option value="Picking-Up">Picking-Up</option>
          <option value="Cancelled">Cancelled</option>
        </>
      );
    }

    if (orderStatus === "Picking-Up") {
      return (
        <>
          <option value="Picking-Up">Picking-Up</option>
          <option value="Out-For-Delivery">Out-For-Delivery</option>
          <option value="Cancelled">Cancelled</option>
        </>
      );
    }

    if (orderStatus === "Out-For-Delivery") {
      return (
        <>
          <option value="Out-For-Delivery">Out-For-Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </>
      );
    }

    if (orderStatus === "Delivered") {
      return (
        <>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </>
      );
    }
  };

  const handleUpdate = async (userId, token, orderId, status) => {
    try {
      const updateOrderStatus =
        user.role === 2
          ? adminUpdateOrderStatus(userId, token, orderId, status)
          : employeeUpdateOrderStatus(userId, token, orderId, status);

      let data = await updateOrderStatus;
      if (data.error) {
        return console.log(data.error);
      } else {
        return setOrderUpdateActive("");
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
                Update Order Status
              </h1>
              <div
                className="cross-sec"
                onClick={() => setOrderUpdateActive(null)}
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
                    {loadOptions(order.Ostatus)}
                  </select>
                </div>
              </div>
              <button
                className={`popup-form-btn ${
                  status === order.Ostatus ? "button-unclickable" : ""
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

export default OrderUpdate;
