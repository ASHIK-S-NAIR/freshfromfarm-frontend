import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "api/auth";

import "./style.css"

const Footer = () => {
  return (
    <section className="footer-section">
      <div className="wrap footer-wrap">
        <div className="footer-info-sec">
          <div className="footer--sec">
            <h3 className="footer-sub-sec-heading">LOCATION</h3>
            <p className="footer-sub-sec-p">Berangler, Ladkhan</p>
            <p className="footer-sub-sec-p">Noufino, 671541</p>
          </div>
          <div className="footer-sub-sec">
            <h3 className="footer-sub-sec-heading">INFORMATION</h3>
            <Link className="footer-sub-sec-link" to="/">
              About Us
            </Link>
            <Link className="footer-sub-sec-link" to="/">
              Contact
            </Link>
          </div>
          <div className="footer-sub-sec">
            <h3 className="footer-sub-sec-heading">MY ACCOUNT</h3>

            {!isAuthenticated() && (
              <>
                <Link className="footer-sub-sec-link" to="/login">
                  My Account
                </Link>
                <Link className="footer-sub-sec-link" to="/login">
                  My Orders
                </Link>
                <Link className="footer-sub-sec-link" to="/login">
                  My Settings
                </Link>
                <Link className="footer-sub-sec-link" to="/login">
                  My Cart
                </Link>
              </>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <>
                <Link
                  className="footer-sub-sec-link"
                  to={`/customerboard/accounts/${isAuthenticated().user._id}`}
                >
                  My Account
                </Link>
                <Link
                  className="footer-sub-sec-link"
                  to={`/customerboard/orders/${isAuthenticated().user._id}`}
                >
                  My Orders
                </Link>
                <Link
                  className="footer-sub-sec-link"
                  to={`/customerboard/settings/${isAuthenticated().user._id}`}
                >
                  My Settings
                </Link>
                <Link
                  className="footer-sub-sec-link"
                  to={`/cart/${isAuthenticated().user._id}`}
                >
                  My Cart
                </Link>
              </>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <>
                <Link
                  className="footer-sub-sec-link"
                  to={`/employeeboard/accounts/${isAuthenticated().user._id}`}
                >
                  Account
                </Link>
                <Link
                  className="footer-sub-sec-link"
                  to={`/employeeboard/dashboard/${isAuthenticated().user._id}`}
                >
                  DashBoard
                </Link>
                <Link
                  className="footer-sub-sec-link"
                  to={`/employeeboard/deliveries/${isAuthenticated().user._id}`}
                >
                  Deliveries
                </Link>
                <Link
                  className="footer-sub-sec-link"
                  to={`/employeeboard/settings/${isAuthenticated().user._id}`}
                >
                  My Settings
                </Link>
              </>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 2 && (
              <>
                <Link
                  className="footer-sub-sec-link"
                  to={`/adminboard/accounts/${isAuthenticated().user._id}`}
                >
                  Account
                </Link>
                <Link
                  className="footer-sub-sec-link"
                  to={`/admindashpanel/dashboard/${isAuthenticated().user._id}`}
                >
                  Admin Panel
                </Link>
                <Link
                  className="footer-sub-sec-link"
                  to={`/adminboard/settings/${isAuthenticated().user._id}`}
                >
                  Settings
                </Link>
              </>
            )}
          </div>
          <div className="footer-sub-sec">
            <h3 className="footer-sub-sec-heading">CATEGORIES</h3>
            <p className="footer-sub-sec-p">Vegetables</p>
            <p className="footer-sub-sec-p">Fruits</p>
          </div>
          <div className="footer-sub-sec">
            <h3 className="footer-sub-sec-heading">PAYMENT</h3>
            <p className="footer-sub-sec-p">Cash On Delivery</p>
            <p className="footer-sub-sec-p">RazorPay</p>
          </div>
        </div>
        <div className="footer-copyRight-sec">
          <p className="footer-copyRight-p">
            Copyright © 2022{" "}
            <Link className="footer-copyRight-link" to="/">
              fresh from farm
            </Link>{" "}
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
