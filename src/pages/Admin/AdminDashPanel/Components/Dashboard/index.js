import React, { useState, useEffect } from "react";
import moment from "moment";
import CartIcon from "assets/svg/cart.svg";
import ProductIcon from "assets/svg/product.svg";
import EmployerIcon from "assets/svg/employer.svg";
import CustomerIcon from "assets/svg/customer.svg";
import ViewIcon from "assets/svg/view.svg";
import EditIcon from "assets/svg/Edit.svg";
import { isAuthenticated } from "api/auth";
import OrderDetails from "pages/Common/OrderDetails";
import OrderUpdate from "pages/Common/OrderUpdate";
import EmployeeUpdate from "../Employee/Components/EmployeeUpdate";
import PaymentStatusUpdate from "pages/Common/PaymentStatusUpdate";
import { UserData } from "pages/Core/data";
import { getAllOrders, getCountOrders } from "api/order";
import { getAllProducts, getCountProducts } from "api/product";
import { getCountEmployers, getEmployees } from "api/employee";
import { getCountCustomers } from "api/user";

const Dashboard = () => {
  const [statusValues, setStatusValues] = useState({
    orderStatus: "",
    productStatus: "",
    employerStatus: "",
    customerStatus: "",
  });
  const [commentValues, setCommentValues] = useState({
    orderCommentValue: 0,
    productCommentValue: 0,
    employeeCommentValue: 0,
    customerCommentValue: 0,
  });
  const [pendingOrders, setPendingOrders] = useState();
  const [orderActive, setOrderActive] = useState("");
  const [order, setOrder] = useState({});
  const [orderUpdateActive, setOrderUpdateActive] = useState("");
  const [orderEmployeeAssignActive, setOrderEmployeeAssignActive] =
    useState("");
  const [orderUpdatePayment, setOrderUpdatePayment] = useState("");

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "User Gain",
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["#9db8d1"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const { user, token } = isAuthenticated();

  const { orderStatus, productStatus, employerStatus, customerStatus } =
    statusValues;

  const {
    orderCommentValue,
    productCommentValue,
    employeeCommentValue,
    customerCommentValue,
  } = commentValues;

  const loadStatusValues = async (userId, token) => {
    try {
      const orderStatus = await getCountOrders(userId, token);
      const productStatus = await getCountProducts(userId, token);
      const employerStatus = await getCountEmployers(userId, token);
      const customerStatus = await getCountCustomers(userId, token);

      if (
        orderStatus.error ||
        productStatus.error ||
        employerStatus.error ||
        customerStatus.error
      ) {
        return console.log("status update error occured");
      } else {
        return setStatusValues({
          ...statusValues,
          orderStatus: orderStatus,
          productStatus: productStatus,
          employerStatus: employerStatus,
          customerStatus: customerStatus,
        });
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const loadCommentValues = async (userId, token) => {
    try {
      const orderCommentArray = await getAllOrders(userId, token, "all");
      const productCommentArray = await getAllProducts("all");
      const emploeeCommentArray = await getEmployees(userId, token, "all");
      const customerCommentArray = await getAllOrders(userId, token, "all");

      if (
        orderCommentArray.error ||
        productCommentArray.error ||
        emploeeCommentArray.error ||
        customerCommentArray.error
      ) {
        return console.log("comment values update error occured");
      } else {
        return setCommentValues({
          ...commentValues,
          orderCommentValue: orderCommentArray.filter(
            (orderComment) =>
              orderComment.Ostatus === "Not-Confirmed" ||
              orderComment.Ostatus === "Ordered" ||
              orderComment.Ostatus === "Processing" ||
              orderComment.Ostatus === "Picking-Up" ||
              orderComment.Ostatus === "Out-For-Delivery"
          ).length,
          productCommentValue: productCommentArray.filter(
            (productComment) => productComment.pStock === 0
          ).length,
          employeeCommentValue: emploeeCommentArray.filter(
            (employeeComment) => employeeComment.Estatus === "Available"
          ).length,
          customerCommentValue: customerCommentArray.filter(
            (customerComment) =>
              customerComment.Ostatus === "Not-Confirmed" ||
              customerComment.Ostatus === "Ordered"
          ).length,
        });
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const loadPendingOrders = async (userId, token) => {
    try {
      const data = await getAllOrders(userId, token, "pending");
      if (data.error) {
        return console.log(data.error);
      } else {
        return setPendingOrders(data);
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

  useEffect(() => {
    loadStatusValues(user._id, token);
  }, [orderActive, orderUpdateActive, orderEmployeeAssignActive]);

  useEffect(() => {
    loadCommentValues(user._id, token);
  }, [orderActive, orderUpdateActive, orderEmployeeAssignActive]);

  useEffect(() => {
    loadPendingOrders(user._id, token);
  }, [orderActive, orderUpdateActive, orderEmployeeAssignActive]);
  return (
    <section className="adminDashPanel-right-section dashboard-section">
      <div className="adminDashPanel-right-subsection dashboard-subSection">
        <div className="adminDashPanel-dashboard-status-sec dashboard-status-sec-orders">
          <div className="adminDashPanel-dashboard-status-left">
            <p className="dashboard-status-tag">Orders</p>
            <h1 className="dashboard-status-value">{orderStatus}</h1>
            <p className="dashboard-status-comment dashboard-status-comment-orders">
              {orderCommentValue} orders not delivered
            </p>
          </div>
          <div className="adminDashPanel-dashboard-status-right">
            <div className="dashboard-status-img-sec">
              <img src={CartIcon} alt="" className="dashboard-status-img" />
            </div>
          </div>
        </div>

        <div className="adminDashPanel-dashboard-status-sec dashboard-status-sec-products">
          <div className="adminDashPanel-dashboard-status-left">
            <p className="dashboard-status-tag">Products</p>
            <h1 className="dashboard-status-value">{productStatus}</h1>
            <p className="dashboard-status-comment dashboard-status-comment-products">
              {productCommentValue} products out of Stock
            </p>
          </div>
          <div className="adminDashPanel-dashboard-status-right">
            <div className="dashboard-status-img-sec">
              <img src={ProductIcon} alt="" className="dashboard-status-img" />
            </div>
          </div>
        </div>

        <div className="adminDashPanel-dashboard-status-sec dashboard-status-sec-employers">
          <div className="adminDashPanel-dashboard-status-left">
            <p className="dashboard-status-tag">Employers</p>
            <h1 className="dashboard-status-value">{employerStatus}</h1>
            <p className="dashboard-status-comment dashboard-status-comment-employers">
              {employeeCommentValue} Employees available
            </p>
          </div>
          <div className="adminDashPanel-dashboard-status-right">
            <div className="dashboard-status-img-sec">
              <img src={EmployerIcon} alt="" className="dashboard-status-img" />
            </div>
          </div>
        </div>

        <div className="adminDashPanel-dashboard-status-sec dashboard-status-sec-customers">
          <div className="adminDashPanel-dashboard-status-left">
            <p className="dashboard-status-tag">Customers</p>

            <h1 className="dashboard-status-value">{customerStatus}</h1>
            <p className="dashboard-status-comment dashboard-status-comment-customers">
              {customerCommentValue} Customer order pending
            </p>
          </div>
          <div className="adminDashPanel-dashboard-status-right">
            <div className="dashboard-status-img-sec">
              <img src={CustomerIcon} alt="" className="dashboard-status-img" />
            </div>
          </div>
        </div>
      </div>

      <h1 className="adminDashPanel-right-header">Pending Orders</h1>
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
            {pendingOrders &&
              pendingOrders.map((order, index) => {
                return (
                  <tr
                    key={index}
                    className="adminDashPanel-right-table-body-tr "
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
                          className="adminDashPanel-right-table-icon vie"
                        />
                      </button>
                      <button onClick={() => handleEdit(order)}>
                        <img
                          src={EditIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon vie"
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

export default Dashboard;
