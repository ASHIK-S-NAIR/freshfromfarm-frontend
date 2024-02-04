import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "api/auth";
import { getUser } from "api/user";
import DashboardIcon from "assets/svg/dashboard.svg";
import DashboardActiveIcon from "assets/svg/dashboardActive.svg";
import CartIcon from "assets/svg/cart.svg";
import CartActiveIcon from "assets/svg/cart-active.svg";
import ProductIcon from "assets/svg/product.svg";
import ProductActiveIcon from "assets/svg/productActive.svg";
import EmployerIcon from "assets/svg/employer.svg";
import EmployerActiveIcon from "assets/svg/employerActive.svg";
import CustomerIcon from "assets/svg/customer.svg";
import CustomerActiveIcon from "assets/svg/customerActive.svg";
import Dashboard from "./Components/Dashboard";
import Order from "./Components/Order";
import Product from "./Components/Product";
import Employee from "./Components/Employee";
import Customer from "./Components/Customer";

const AdminDashPanel = () => {
  const { currentTab, userId } = useParams();
  const [tabActive, setTabActive] = useState(currentTab);
  const [name, setName] = useState("");

  const { user, token } = isAuthenticated();

  const preload = async (userId, token) => {
    try {
      const data = await getUser(userId, token);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setName(data.name);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    setTabActive(currentTab);
    preload(userId, token);
  }, [currentTab]);

  return (
    <section className="adminDashPanel-section">
      <div className="wrap adminDashPanel-wrap">
        <div className="adminDashPanel-left">
          <ul className="adminDashPanel-left-ul">
            <li className="adminDashPanel-left-li">
              <Link
                to={`/admindashpanel/dashboard/${user._id}`}
                className="adminDashPanel-left-link"
              >
                <div
                  className={`adminDashPanel-left-tag ${
                    tabActive === "dashboard" ? "active" : ""
                  }`}
                >
                  {" "}
                  <img
                    src={
                      tabActive === "dashboard" ? DashboardActiveIcon : DashboardIcon
                    }
                    alt=""
                    className="adminDashPanel-left-img"
                  />
                  DASHBOARD
                </div>
              </Link>
            </li>
            <li className="adminDashPanel-left-li">
              <Link
                to={`/admindashpanel/order/${user._id}`}
                className="adminDashPanel-left-link "
              >
                <div
                  className={`adminDashPanel-left-tag ${
                    tabActive === "order" ? "active" : ""
                  }`}
                >
                  <img
                    src={tabActive === "order" ? CartActiveIcon : CartIcon}
                    alt=""
                    className="adminDashPanel-left-img"
                  />
                  ORDER
                </div>
              </Link>
            </li>
            <li className="adminDashPanel-left-li">
              <Link
                to={`/admindashpanel/product/${user._id}`}
                className="adminDashPanel-left-link"
              >
                <div
                  className={`adminDashPanel-left-tag ${
                    tabActive === "product" ? "active" : ""
                  }`}
                >
                  <img
                    src={tabActive === "product" ? ProductActiveIcon : ProductIcon}
                    alt=""
                    className="adminDashPanel-left-img"
                  />
                  PRODUCT
                </div>
              </Link>
            </li>
            <li className="adminDashPanel-left-li">
              <Link
                to={`/admindashpanel/employee/${user._id}`}
                className="adminDashPanel-left-link"
              >
                <div
                  className={`adminDashPanel-left-tag ${
                    tabActive === "employee" ? "active" : ""
                  }`}
                >
                  <img
                    src={tabActive === "employee" ? EmployerActiveIcon : EmployerIcon}
                    alt=""
                    className="adminDashPanel-left-img"
                  />
                  EMPLOYEE
                </div>
              </Link>
            </li>
            <li className="adminDashPanel-left-li">
              <Link
                to={`/admindashpanel/customer/${user._id}`}
                className="adminDashPanel-left-link"
              >
                <div
                  className={`adminDashPanel-left-tag ${
                    tabActive === "customer" ? "active" : ""
                  }`}
                >
                  <img
                    src={tabActive === "customer" ? CustomerActiveIcon : CustomerIcon}
                    alt=""
                    className="adminDashPanel-left-img"
                  />
                  CUSTOMER
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="adminDashPanel-right">
          {tabActive === 'dashboard' && <Dashboard />}
          {tabActive === 'order' && <Order />}
          {tabActive === 'product' && <Product />}
          {tabActive === 'employee' && <Employee />}
          {tabActive === 'customer' && <Customer />}
        </div>
      </div>
    </section>
  );
};

export default AdminDashPanel;
