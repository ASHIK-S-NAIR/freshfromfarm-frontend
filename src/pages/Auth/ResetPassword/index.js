import React, { useState } from "react";
import { resetPassword } from "api/auth";
import { useParams, useNavigate } from "react-router-dom";

import "./style.css";

const ResetPassword = () => {
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    loading: "",
    error: "",
    success: false,
  });

  const { password, confirmPassword, error, loading, success } = values;

  const { userId, token } = useParams();

  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setValues({ ...values, loading: "loading" });

    if (!password && !confirmPassword) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Fill all the fields",
      });
    }

    if (password.length < 6) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "password must be at least 6 characters",
      });
    }

    if (!(password === confirmPassword)) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Password confirmation does not match",
      });
    }
    try {
      const data = await resetPassword(userId, token, password);

      if (data.error) {
        console.log(data.error);
        return setValues({
          ...values,
          loading: "",
          success: false,
          error: data.error,
        });
      }
      return navigate("/login");
      
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
              <h1 className="popup-header">Reset Password</h1>
              <p className="popup-header-p">Please enter your new password</p>
            </div>

            <div className="popup-form">
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">New Password</label>
                  <input
                    type="password"
                    className="popup-form-input"
                    onChange={handleChange("password")}
                    value={password}
                  />
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Repeat Password</label>
                  <input
                    type="password"
                    className="popup-form-input"
                    onChange={handleChange("confirmPassword")}
                    value={confirmPassword}
                  />
                </div>
              </div>
              <p className="popup-header-p">
                {success && (
                  <p className="popup-header-p">Password reset succssfull</p>
                )}
              </p>
              <button
                className="popup-form-btn login-popup-btn"
                onClick={onSubmit}
              >
                Change
              </button>
            </div>
          </div>
        </div>
        {error && errorMessage()}
      </div>
    </section>
  );
};

export default ResetPassword;
