import React, { useState } from "react";
import { forgotPassword } from "api/auth";

import "./style.css";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    loading: "",
    error: "",
    success: false,
  });

  const { email, error, loading, success } = values;


  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setValues({ ...values, loading: "loading" });

    if (!email) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Fill all the fields",
      });
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      console.log("Please enter a valid email address");
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Enter valid email",
      });
    }
    try {
      const data = await forgotPassword(email);

      if (data.error) {
        console.log(data.error);
        return setValues({
          ...values,
          loading: "",
          success: false,
          error: data.error,
        });
      }
      return setValues({
        ...values,
        loading: "",
        success: true,
        error: "",
      });
    } catch (error) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: error,
      });
    }
  };

  const errorMessage = () => {
    return (
      <div className="errorMessage-sec">
        <div
          className="errorMessage-cross-sec"
          onClick={() => setValues({ ...values, error: "" })}
        >
          <div className="errorMessage-cross-one"></div>
          <div className="errorMessage-cross-two"></div>
        </div>
        <div className="errorMessage-msg-sec">
          <p className="errorMessage-msg">{error}</p>
        </div>
      </div>
    );
  };
  return (
    <section className="login-section">
      <div className="login-bg-background"></div>
      <div className="wrap login-wrap">
        <div className="popup-small-sec login-popup">
          <div className="popup-group">
            <div className="popup-head-sec login-head-sec">
              <h1 className="popup-header">Forgot Password</h1>
              <p className="popup-header-p">
                Please enter your email address to search for your account.
              </p>
            </div>

            <div className="popup-form">
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Email</label>
                  <input
                    type="email"
                    className="popup-form-input"
                    onChange={handleChange("email")}
                    value={email}
                  />
                </div>
              </div>
              <p className="popup-header-p">
                {success && (
                  <p className="popup-header-p">
                    A one time password reset link has being send to your email,
                    You may go through the link and reset the password.{" "}
                    <b>Note: The link is valid only for 15minutes</b>
                  </p>
                )}
              </p>
              <button
                className="popup-form-btn login-popup-btn"
                onClick={onSubmit}
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
        {error && errorMessage()}
      </div>
    </section>
  );
};

export default ForgotPassword;
