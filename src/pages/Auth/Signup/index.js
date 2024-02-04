import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, login, authenticate } from "api/auth";

import "./style.css";
import bgBackground from "assets/images/pattern.svg";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    houseName: "",
    streetName: "",
    error: "",
    loading: "",
    success: false,
  });

  const {
    name,
    email,
    phoneNumber,
    password,
    confirmPassword,
    houseName,
    streetName,
    error,
    loading,
    success,
  } = values;

  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: "loading" });

    if (
      !(
        name &&
        email &&
        phoneNumber &&
        password &&
        confirmPassword &&
        houseName &&
        streetName
      )
    ) {
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

    if (phoneNumber.length !== 10) {
      console.log("Please enter a valid phone Number");
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Enter valid phone Number",
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

    if (!(password === confirmPassword)) {
      console.log("Password confirmation does not match");
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Password confirmation does not match",
      });
    }

    const address = {
      houseName,
      streetName,
    };

    try {
      var data = await signup({ name, email, phoneNumber, password, address });

      if (data.error) {
        console.log(data.error);
        return setValues({
          ...values,
          loading: "",
          success: false,
          error: data.error,
        });
      }
      data = await login({ email, password });
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
      return navigate("/");
    } catch (error) {
      console.log(error);
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
    <section className="signup-section">
      <div className="signup-bg-background">
      </div>
      <div className="wrap signup-wrap">
        <div className="popup-small-sec signup-popup">
          <div className="popup-group">
            <div className="popup-head-sec signup-head-sec">
              <h1 className="popup-header">Sign Up</h1>
              <p className="popup-header-p">
                Already a member ?{" "}
                <Link to="/login" className="popup-header-link">
                  Log In
                </Link>
              </p>
            </div>

            <div className="popup-form">
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Name</label>
                  <input
                    type="text"
                    className="popup-form-input"
                    value={name}
                    onChange={handleChange("name")}
                  />
                </div>
              </div>
              <div className="popup-form-double-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Email</label>
                  <input
                    type="email"
                    className="popup-form-input"
                    value={email}
                    onChange={handleChange("email")}
                  />
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Phone</label>
                  <input
                    type="number"
                    className="popup-form-input"
                    value={phoneNumber}
                    onChange={handleChange("phoneNumber")}
                  />
                </div>
              </div>
              <div className="popup-form-double-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Password</label>
                  <input
                    type="password"
                    className="popup-form-input"
                    value={password}
                    onChange={handleChange("password")}
                  />
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="popup-form-input"
                    value={confirmPassword}
                    onChange={handleChange("confirmPassword")}
                  />
                </div>
              </div>
              <div className="popup-form-sec-group">
                <h3 className="popup-form-sec-group-header">Address</h3>
                <div className="popup-form-double-group">
                  <div className="popup-form-group">
                    <label className="popup-form-label">House Name</label>
                    <input
                      type="text"
                      className="popup-form-input"
                      value={houseName}
                      onChange={handleChange("houseName")}
                    />
                  </div>
                  <div className="popup-form-group">
                    <label className="popup-form-label">Street Name</label>
                    <input
                      type="text"
                      className="popup-form-input"
                      value={streetName}
                      onChange={handleChange("streetName")}
                    />
                  </div>
                </div>
              </div>
              <button
                className="popup-form-btn signup-popup-btn"
                onClick={onSubmit}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        {error && errorMessage()}
      </div>
    </section>
  );
};

export default Signup;
