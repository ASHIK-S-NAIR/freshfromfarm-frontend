import React from "react";
import { Link, useParams } from "react-router-dom";
import Approve from "assets/svg/Approve.svg";
import "./style.css";
import { isAuthenticated } from "api/auth";

const ThankYou = () => {
  const { orderId } = useParams();

  const {user} = isAuthenticated();

  return (
    <section className="thankYou-section">
      <div className="wrap thankYou-wrap">
        <img src={Approve} alt="" className="thankYou-img" />
        <h2 className="thankYou-header">THANK YOU FOR YOUR ORDER</h2>
        <p className="thankYou-p">
          Your Order Number is : 
          <span className="thankYou-p-span">{orderId}</span>
        </p>
        <p className="thankYou-p">
          Checkout the <Link to={`/customerboard/orders/${user._id}`}><span className="thankYou-p-span underline">Order</span></Link> section
          for further order status updates
        </p>
        <Link to="/"><button className="thankYou-btn">Continue Shopping</button></Link>
      </div>
    </section>
  );
};

export default ThankYou;
