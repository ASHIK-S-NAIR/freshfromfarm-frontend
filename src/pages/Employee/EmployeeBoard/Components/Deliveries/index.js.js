import React, { useState, useEffect } from "react";
import { isAuthenticated } from "api/auth";
import { getAllDeliveries } from "api/employee";
import ViewIcon from "assets/svg/view.svg";
import EditIcon from "assets/svg/Edit.svg";
import OrderDetails from "pages/Common/OrderDetails";
import OrderUpdate from "pages/Common/OrderUpdate";
import PaymentStatusUpdate from "pages/Common/PaymentStatusUpdate";

const Deliveries = () => {
  const [deliveries, setDeliveires] = useState([]);
  const [order, setOrder] = useState({});
  const [orderActive, setOrderActive] = useState("");
  const [orderUpdateActive, setOrderUpdateActive] = useState("");
  const [orderUpdatePayment, setOrderUpdatePayment] = useState("");

  const { user, token } = isAuthenticated();

  const loadDelivery = async (userId, token) => {
    try {
      const data = await getAllDeliveries(userId, token, "all");

      if (data.error) {
        return console.log(data.error);
      } else {
        return setDeliveires(data.Eorders);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handlePreview = (order) => {
    return setOrderActive("orderDetails"), setOrder(order);
  };

  const handleEdit = (order) => {
    return setOrderUpdateActive("orderUpdateActive"), setOrder(order);
  };

  const handlePaymentStatus = (order) => {
    return setOrderUpdatePayment("orderUpdatePayment"), setOrder(order);
  };

  useEffect(() => {
    loadDelivery(user._id, token);
  }, []);

  return (
    <section className="employeeBoard-section">
      <h1 className="employeeBoard-right-header">Deliveries</h1>

      <div className="employeeBoard-right-subsection">
        <table className="employeeBoard-right-table">
          <thead className="employeeBoard-right-table-head-sec">
            <tr>
              <th className="employeeBoard-right-table-head-value">Order ID</th>
              <th className="employeeBoard-right-table-head-value">Status</th>
              <th className="employeeBoard-right-table-head-value">Total</th>
              <th className="employeeBoard-right-table-head-value">
                Payment Mode
              </th>
              <th className="employeeBoard-right-table-head-value">
                Payment Status
              </th>
              <th className="employeeBoard-right-table-head-value">Address</th>
              <th className="employeeBoard-right-table-head-value">Action</th>
            </tr>
          </thead>
          <tbody className="employeeBoard-right-table-body-sec">
            {deliveries &&
              deliveries.map((order, index) => {
                return (
                  <tr
                    key={index}
                    className="employeeBoard-right-table-body-tr "
                  >
                    <td className="employeeBoard-right-table-body-value">
                      {order.EorderId._id}
                    </td>
                    <td className="employeeBoard-right-table-body-value">
                      <div
                        className={`employeeBoard-right-table-body-div ${order.EorderId.Ostatus}`}
                      >
                        {order.EorderId.Ostatus}
                      </div>
                    </td>
                    <td className="employeeBoard-right-table-body-value">
                      {order.EorderId.OtotalPrice}
                    </td>
                    <td className="employeeBoard-right-table-body-value">
                      {order.EorderId.OpaymentMode}
                    </td>
                    <td className="employeeBoard-right-table-body-value">
                        {order.EorderId.OpaymentStatus === "Paid" ? (
                          order.EorderId.OpaymentStatus
                        ) : (
                          <button
                            className="adminDashPanel-right-table-body-value-btn"
                            onClick={() => handlePaymentStatus(order.EorderId)}
                          >
                            Pending
                          </button>
                        )}
                      </td>
                    <td className="employeeBoard-right-table-body-value">
                      {order.EorderAddress.houseName}
                      <br />
                      {order.EorderAddress.streetName}
                    </td>
                    <td className="employeeBoard-right-table-body-value">
                      <button onClick={() => handlePreview(order)}>
                        <img
                          src={ViewIcon}
                          alt=""
                          className="employeeBoard-right-table-icon vie"
                        />
                      </button>
                      <button onClick={() => handleEdit(order.EorderId)}>
                        <img
                          src={EditIcon}
                          alt=""
                          className="employeeBoard-right-table-icon vie"
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
      {orderUpdatePayment === "orderUpdatePayment" && (
        <PaymentStatusUpdate
          setOrderUpdatePayment={setOrderUpdatePayment}
          order={order}
        />
      )}
    </section>
  );
};

export default Deliveries;
