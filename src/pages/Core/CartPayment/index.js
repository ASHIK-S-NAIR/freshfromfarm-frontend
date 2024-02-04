import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { isAuthenticated } from "api/auth";
import { getUser, getUserCart } from "api/user";
import {
  createOrder,
  paymentVerify,
  razorPayOrder,
  updateOrderConfirmation,
} from "api/order";
import "./style.css";

export const CartPayment = () => {
  const { userId } = useParams();

  const naviagte = useNavigate();
  const location = useLocation();
  const shippingAddress = location.state;
  const [values, setValues] = useState({
    paymentMode: "RazorPay",
    total: 10,
    userDetails: {},
  });

  var cart = [];
  var order = "";

  const { paymentMode, total, userDetails } = values;

  const { user, token } = isAuthenticated();

  const isRadioSelected = (value) => {
    if (paymentMode === value) {
      return true;
    } else {
      return false;
    }
  };

  const preLoadCart = async (userId, token) => {
    try {
      const data = await getUserCart(userId, token);
      if (data.error) {
        console.log(data.error);
      } else {
        cart = data.cart;
        var tempTotal = 0;
        cart.map(
          (cartItem) =>
            (tempTotal =
              tempTotal + cartItem.product.pPrice * cartItem.quantity)
        );
        setValues((prevState) => ({ ...prevState, total: tempTotal }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const preLoadUser = async (userId, token) => {
    try {
      const data = await getUser(userId, token);
      if (data.error) {
        console.log(data.error);
      } else {
        return setValues({ ...values, userDetails: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = async (userId, token) => {
    try {
      const data = await createOrder(userId, token, {
        shippingAddress,
        paymentMode,
      });
      if (data.error) {
        console.log(data.error);
      } else {
        order = data.order;
        if (paymentMode === "RazorPay") {
          await handlePayment(total);
        } else {
          try {
            const data = await updateOrderConfirmation(
              userId,
              token,
              order._id,
              {
                Ostatus: "Ordered",
              }
            );
            if (data.error) {
              return console.log(data.error);
            } else {
              naviagte(`/thankyou/${order._id}`);
            }
          } catch (error) {}
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async (total) => {
    try {
      const data = await razorPayOrder({ total });
      if (data.error) {
        return console.log(data.error);
      } else {
        initPayment(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initPayment = (data) => {
    const options = {
      key: process.env.RAZORPAY_KEY_SECRET,
      amount: data.amount,
      currency: data.currency,
      name: "Fruits and Veggies",
      order_id: data.id,
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phoneNumber,
      },
      handler: async (response) => {
        try {
          const data = await paymentVerify({ response, order });
          if (data.error) {
            return console.log(data.error);
          }
          naviagte(`/thankyou/${order._id}`);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    preLoadCart(userId, token);
  }, []);

  useEffect(() => {
    preLoadUser(userId, token);
  }, []);

  return (
    <section className="cardPayment-section">
      <div className="wrap cardPayment-wrap">
        <div className="cardPayment-info-sec">
          {userDetails.address !== undefined && (
            <div className="cardPayment-delivery-details-sec">
              <h2 className="cardpayment-delivery-details-header">
                Delivery Details
              </h2>
              <div className="cardPayment-delivery-details">
                <div className="cardPayment-delivery-details-single-group">
                  <div className="cardPayment-delivery-details-group">
                    <label className="cardPayment-delivery-details-label">
                      Name
                    </label>
                    <p className="cardPayment-delivery-details-value">
                      {userDetails.name}
                    </p>
                  </div>
                </div>
                <div className="cardPayment-delivery-details-double-group">
                  <div className="cardPayment-delivery-details-group">
                    <label className="cardPayment-delivery-details-label">
                      Email
                    </label>
                    <p className="cardPayment-delivery-details-value">
                      {userDetails.email}
                    </p>
                  </div>
                  <div className="cardPayment-delivery-details-group">
                    <label className="cardPayment-delivery-details-label">
                      Phone
                    </label>
                    <p className="cardPayment-delivery-details-value">
                      {userDetails.phoneNumber}
                    </p>
                  </div>
                </div>
                <h3 className="cardPayment-delivery-details-subheader">
                  Shipping Address
                </h3>
                <div className="cardPayment-delivery-details-double-group">
                  <div className="cardPayment-delivery-details-group">
                    <label className="cardPayment-delivery-details-label">
                      House Name
                    </label>
                    <p className="cardPayment-delivery-details-value">
                      {userDetails.address.houseName}
                    </p>
                  </div>
                  <div className="cardPayment-delivery-details-group">
                    <label className="cardPayment-delivery-details-label">
                      Street Name
                    </label>
                    <p className="cardPayment-delivery-details-value">
                      {userDetails.address.streetName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="cardPayment-payment-details-sec">
            <h2 className="cardPayment-payment-details-header">Payment Mode</h2>
            <div className="cardPayment-payment-details-form">
              <div className="cardPayment-payment-details-group">
                <input
                  type="radio"
                  name="payment_mode"
                  id="RazorPay"
                  value="RazorPay"
                  checked={isRadioSelected("RazorPay")}
                  onChange={(e) =>
                    setValues({ ...values, paymentMode: e.target.value })
                  }
                />
                <label
                  htmlFor="RazorPay"
                  className="cardPayment-payment-details-label"
                >
                  Make Payment Online (RazorPay)
                </label>
              </div>

              <div className="cardPayment-payment-details-group">
                <input
                  type="radio"
                  name="payment_mode"
                  id="CashOnDelivery"
                  value="CashOnDelivery"
                  checked={isRadioSelected("CashOnDelivery")}
                  onChange={(e) =>
                    setValues({ ...values, paymentMode: e.target.value })
                  }
                />
                <label
                  htmlFor="CashOnDelivery"
                  className="cardPayment-payment-details-label"
                >
                  Cash On Delivery
                </label>
              </div>
              <button
                className="cardPayment-payment-details-btn"
                onClick={() => handleOrder(userId, token)}
              >
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
