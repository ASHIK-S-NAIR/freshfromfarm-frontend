import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "api/auth";
import { getUserOrders } from "api/user";
import ViewIcon from "assets/svg/view.svg";
import moment from "moment";
import OrderDetails from "pages/Common/OrderDetails";

const Orders = () => {
  const { userId } = useParams();

  const [orders, setOrders] = useState([]);
  const [orderActive, setOrderActive] = useState(null);
  const [order, setOrder] = useState();

  const { user, token } = isAuthenticated();

  const getUserOrderDetails = async (userId, token) => {
    try {
      const data = await getUserOrders(userId, token);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setOrders(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUserOrderDetails(userId, token);
  }, []);

  const handlePreview = async (order) => {
    return setOrderActive("orderDetails"), setOrder(order);
  };

  return (
    <section className="userBoard-right-section accounts-section">
      <h1 className="userBoard-right-header">Orders</h1>
      <div className="userBoard-right-subSec">
        <table className="userBoard-right-customer-order-table">
          <thead className="userBoard-right-customer-order-table-head-sec">
            <tr>
              <th className="userBoard-right-customer-order-table-head-value">
                Order ID
              </th>
              <th className="userBoard-right-customer-order-table-head-value">
                Status
              </th>
              <th className="userBoard-right-customer-order-table-head-value">
                Total
              </th>
              <th className="userBoard-right-customer-order-table-head-value">
                Ordered On
              </th>
              <th className="userBoard-right-customer-order-table-head-value">
                Payment Mode
              </th>
              <th className="userBoard-right-customer-order-table-head-value">
                Delivery Boy
              </th>
              <th className="userBoard-right-customer-order-table-head-value">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="userBoard-right-customer-order-table-body-sec">
            {orders &&
              orders.map((order, index) => {
                return (
                  <tr
                    key={index}
                    className="userBoard-right-customer-order-table-body-tr"
                  >
                    <td className="userBoard-right-customer-order-table-body-value">
                      {order._id}
                    </td>
                    <td className="userBoard-right-customer-order-table-body-value">
                      <div
                        className={`userBoard-right-customer-order-table-body-div ${order.Ostatus}`}
                      >
                        {order.Ostatus}
                      </div>
                    </td>
                    <td className="userBoard-right-customer-order-table-body-value">
                      {order.OtotalPrice}
                    </td>
                    <td className="userBoard-right-customer-order-table-body-value">
                      {moment(order.createdAt).format("DD-MMM-yyyy")}
                    </td>
                    <td className="userBoard-right-customer-order-table-body-value">
                      {order.OpaymentMode}
                    </td>
                    <td className="userBoard-right-customer-order-table-body-value">
                      {order.OemployeeId ? order.OemployeeId : "Not Assigned"}
                    </td>
                    <td className="userBoard-right-customer-order-table-head-value">
                      <button onClick={() => handlePreview(order)}>
                      <img
                          src={ViewIcon}
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
    </section>
  );
};

export default Orders;
