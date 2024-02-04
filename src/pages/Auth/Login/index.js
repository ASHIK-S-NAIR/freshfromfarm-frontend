import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, authenticate } from "api/auth";

import "./style.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: "",
    success: false,
  });

  const { email, password, error, loading, success } = values;

  const naviagte = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setValues({ ...values, loading: "loading" });

    if (!(email && password)) {
      console.log("Please fill all the fields");
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

    if (password.length < 6) {
      console.log("Password must have atleast 6 characters");
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "password must be at least 6 characters",
      });
    }

    try {
      const data = await login({ email, password });

      if (data.error) {
        console.log(data.error);
        return setValues({
          ...values,
          loading: "",
          success: false,
          error: data.error,
        });
      }
      authenticate(data);

      return naviagte("/");
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
              <h1 className="popup-header">Log In</h1>
              <p className="popup-header-p">
                Don't have an account ?{" "}
                <Link to="/signup" className="popup-header-link">
                  Signup
                </Link>
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
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Password</label>
                  <input
                    type="password"
                    className="popup-form-input"
                    onChange={handleChange("password")}
                    value={password}
                  />
                </div>
              </div>
              <p className="popup-header-p">
                <Link to="/forgotpassword" className="popup-header-link">
                 Forgot password ?
                </Link>
              </p>
              <button
                className="popup-form-btn login-popup-btn"
                onClick={onSubmit}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
        {error && errorMessage()}
      </div>
    </section>
  );
};

export default Login;
