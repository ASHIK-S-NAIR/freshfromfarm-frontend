import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { isAuthenticated } from "api/auth";
import { getUser } from "api/user";
import Profile from "assets/svg/profile.svg";
import Accounts from "pages/Core/Components/Accounts";
import Orders from "./Components/Order";
import Settings from "pages/Core/Components/Settings";

const CustomerBoard = () => {
  const { currentTab, userId } = useParams();
  const [tabActive, setTabActive] = useState(currentTab);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    houseName: "",
    streetName: "",
  });

  const { name } = values;
  const { token, user } = isAuthenticated();

  const preLoad = async (userId, token) => {
    try {
      const userDetails = await getUser(userId, token);

      return setValues({
        ...values,
        name: userDetails.name,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        houseName: userDetails.address.houseName,
        streetName: userDetails.address.streetName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTabActive(currentTab);
    preLoad(userId, token);
  }, [currentTab]);

  return (
    <section className="userBoard-section">
      <div className="wrap userBoard-wrap">
        <div className="userBoard-left">
          <div className="userBoard-user-detail">
            <img className="userBoard-user-detail-image" src={Profile} alt="" />
            <div className="userBoard-user-detail-info">
              <p className="userBoard-user-detail-greetings">Hello</p>
              <div className="userBoard-user-detail-sec">
                <h3 className="userBoard-user-detail-name">
                  {name.length > 6 ? name.substring(0, 6) : name}
                </h3>
              </div>
            </div>
          </div>
          <ul className="userBoard-left-ul">
            <li className="userBoard-left-li">
              <Link
                to={`/customerboard/orders/${user._id}`}
                className="userBoard-left-link"
              >
                {" "}
                <div
                  className={`userBoard-left-tag ${
                    tabActive === "orders" ? "active" : ""
                  }`}
                >
                  ORDERS
                </div>{" "}
              </Link>
            </li>
            <li className="userBoard-left-li">
              <Link
                to={`/customerboard/accounts/${user._id}`}
                className="userBoard-left-link"
              >
                <div
                  className={`userBoard-left-tag ${
                    tabActive === "accounts" ? "active" : ""
                  }`}
                >
                  ACCOUNT
                </div>
              </Link>
            </li>
            <li className="userBoard-left-li">
              <Link
                to={`/customerboard/settings/${user._id}`}
                className="userBoard-left-link"
              >
                <div
                  className={`userBoard-left-tag ${
                    tabActive === "settings" ? "active" : ""
                  }`}
                >
                  SETTINGS
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="userBoard-right">
          {tabActive === "accounts" && <Accounts userValues={values} />}
          {tabActive === "orders" && <Orders userValues={values} />}
          {tabActive === "settings" && <Settings userValues={values} />}
        </div>
      </div>
    </section>
  );
};

export default CustomerBoard;
