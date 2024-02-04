import React, { useState, useEffect } from "react";
import moment from "moment";
import { getAllOrders } from "api/order";
import { isAuthenticated } from "api/auth";
import ViewIcon from "assets/svg/view.svg";
import EditIcon from "assets/svg/Edit.svg";
import OrderDetails from "pages/Common/OrderDetails";
import OrderUpdate from "pages/Common/OrderUpdate";
import EmployeeUpdate from "../Employee/Components/EmployeeUpdate";
import PaymentStatusUpdate from "pages/Common/PaymentStatusUpdate";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [orderActive, setOrderActive] = useState("");
  const [orderUpdateActive, setOrderUpdateActive] = useState("");
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("all");
  const [orderEmployeeAssignActive, setOrderEmployeeAssignActive] =
    useState("");
  const [orderUpdatePayment, setOrderUpdatePayment] = useState("");
  const [countValues, setCountValues] = useState({
    all: 0,
    NotConfirmed: 0,
    Ordered: 0,
    Processing: 0,
    PickingUp: 0,
    OutForDelivery: 0,
    Delivered: 0,
    Cancelled: 0,
  });

  const { user, token } = isAuthenticated();

  const {
    all,
    NotConfirmed,
    Ordered,
    Processing,
    PickingUp,
    OutForDelivery,
    Delivered,
    Cancelled,
  } = countValues;

  const loadOrders = async (userId, token, status) => {
    try {
      const data = await getAllOrders(userId, token, status);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setOrders(data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handlePreview = async (order) => {
    return setOrderActive("orderDetails"), setOrder(order);
  };

  const handleEdit = async (order) => {
    return setOrderUpdateActive("orderUpdateActive"), setOrder(order);
  };

  const handleEmployeeAssign = async (order) => {
    return (
      setOrderEmployeeAssignActive("orderEmployeeAssignActive"), setOrder(order)
    );
  };

  const handlePaymentStatus = (order) => {
    return setOrderUpdatePayment("orderUpdatePayment"), setOrder(order);
  };

  const filterBtn = (statusState, statusValue, statusBtnValue) => {
    return (
      <button
        className={`orders-filter-btn ${
          status === statusState ? "active" : ""
        }`}
        onClick={() => setStatus(statusState)}
      >
        {statusBtnValue} <span className="filter-btn-value">{statusValue}</span>
      </button>
    );
  };

  const loadCountValues = async (userId, token) => {
    var orders = [];
    try {
      const data = await getAllOrders(userId, token, "all");
      if (data.error) {
        return console.log(data.error);
      } else {
        orders = data;
      }
    } catch (error) {
      return console.log(error);
    }

    setCountValues({
      ...countValues,
      all: orders.length,
      NotConfirmed: orders.filter((order) => order.Ostatus === "Not-Confirmed")
        .length,
      Ordered: orders.filter((order) => order.Ostatus === "Ordered").length,
      Processing: orders.filter((order) => order.Ostatus === "Processing")
        .length,
      PickingUp: orders.filter((order) => order.Ostatus === "Picking-Up")
        .length,
      OutForDelivery: orders.filter(
        (order) => order.Ostatus === "Out-For-Delivery"
      ).length,
      Delivered: orders.filter((order) => order.Ostatus === "Delivered").length,
      Cancelled: orders.filter((order) => order.Ostatus === "Cancelled").length,
    });
  };

  useEffect(() => {
    loadOrders(user._id, token, status);
  }, [orderActive, orderUpdateActive, status, orderEmployeeAssignActive]);

  useEffect(() => {
    loadCountValues(user._id, token);
  }, [orderActive, orderUpdateActive, status, orderEmployeeAssignActive]);

  return (
    <section className="adminDashPanel-right-section order-section">
      <h1 className="adminDashPanel-right-header">Orders</h1>
      <div className="adminDashPanel-right-subsection orders-filter-subSection">
        {filterBtn("all", all, "All")}
        {filterBtn("Not-Confirmed", NotConfirmed, "Not-Confirmed")}
        {filterBtn("Ordered", Ordered, "Ordered")}
        {filterBtn("Processing", Processing, "Processing")}
        {filterBtn("Picking-Up", PickingUp, "Picking-Up")}
        {filterBtn("Out-For-Delivery", OutForDelivery, "Out-For-Delivery")}
        {filterBtn("Delivered", Delivered, "Delivered")}
        {filterBtn("Cancelled", Cancelled, "Cancelled")}
      </div>
      <div className="adminDashPanel-right-subsection">
        <table className="adminDashPanel-right-table">
          <thead className="adminDashPanel-right-table-head-sec">
            <tr>
              <th className="adminDashPanel-right-table-head-value">
                Order ID
              </th>
              <th className="adminDashPanel-right-table-head-value">Status</th>
              <th className="adminDashPanel-right-table-head-value">Total</th>
              <th className="adminDashPanel-right-table-head-value">
                Ordered On
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Payment Mode
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Payment Status
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Delivery Boy
              </th>
              <th className="adminDashPanel-right-table-head-value">Action</th>
            </tr>
          </thead>
          <tbody className="adminDashPanel-right-table-body-sec">
            {orders &&
              orders.map((order, index) => {
                return (
                  <tr
                    key={index}
                    className="adminDashPanel-right-table-body-tr"
                  >
                    <td className="adminDashPanel-right-table-body-value">
                      {order._id}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      <div
                        className={`adminDashPanel-right-table-body-div ${order.Ostatus}`}
                      >
                        {order.Ostatus}
                      </div>
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {order.OtotalPrice}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {moment(order.createdAt).format("DD-MMM-yyyy")}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {order.OpaymentMode}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {order.OpaymentStatus === "Paid" ? (
                        order.OpaymentStatus
                      ) : (
                        <button
                          className="adminDashPanel-right-table-body-value-btn"
                          onClick={() => handlePaymentStatus(order)}
                        >
                          Pending
                        </button>
                      )}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                    {order.Ostatus === "Not-Confirmed" ? (
                        " "
                      ) : order.OemployeeName ? (
                        order.OemployeeName
                      ) : (
                        <button
                          className="adminDashPanel-right-table-body-value-btn"
                          onClick={() => handleEmployeeAssign(order)}
                        >
                          Not Assigned
                        </button>
                      )}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      <button onClick={() => handlePreview(order)}>
                        <img
                          src={ViewIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                      <button onClick={() => handleEdit(order)}>
                        <img
                          src={EditIcon}
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
      {orderActive === "orderDetails" && (
        <OrderDetails setOrderActive={setOrderActive} order={order} />
      )}
      {orderUpdateActive === "orderUpdateActive" && (
        <OrderUpdate
          setOrderUpdateActive={setOrderUpdateActive}
          order={order}
        />
      )}
      {orderEmployeeAssignActive === "orderEmployeeAssignActive" && (
        <EmployeeUpdate
          setOrderEmployeeAssignActive={setOrderEmployeeAssignActive}
          order={order}
        />
      )}
      {orderUpdatePayment === "orderUpdatePayment" && (
        <PaymentStatusUpdate
          setOrderUpdatePayment={setOrderUpdatePayment}
          order={order}
        />
      )}
    </section>
  );
};

export default Order;
