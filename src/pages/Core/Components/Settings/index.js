import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "api/auth";
import { changePassword } from "api/user";

const Settings = () => {
  const { userId } = useParams();

  const { user, token } = isAuthenticated();

  const navigate = useNavigate();

  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: "",
    loading: "",
    success: false,
  });

  const { oldPassword, newPassword, confirmPassword, error, loading, success } =
    values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: "loading" });

    if (!(oldPassword && newPassword && confirmPassword)) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Fill all the fields",
      });
    }

    if (
      oldPassword.length < 6 ||
      newPassword.length < 6 ||
      confirmPassword < 6
    ) {
      console.log("Password must have atleast 6 characters");
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "password must be at least 6 characters",
      });
    }

    if (!(newPassword === confirmPassword)) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Password confirmation does not match",
      });
    }

    try {
      var data = await changePassword(userId, token, {
        oldPassword,
        newPassword,
      });

      if (data.error) {
        console.log(data.error);
        return setValues({
          ...values,
          loading: "",
          success: false,
          error: data.error,
        });
      }

      console.log("Success");
      setValues({ ...values, success: true, loading: "", error: "" });
      logout(() => navigate("/"));
    } catch (error) {
      console.log(error);
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
  const successMessage = () => {
    return (
      <div className="errorMessage-sec">
        <div
          className="errorMessage-cross-sec"
          onClick={() => setValues({ ...values, success: false })}
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
    <section className="userBoard-right-section settings-section">
      <h1 className="userBoard-right-header">Settings</h1>
      <div className="userBoard-right-subSec">
        <div className="userBoard-righ-subsec-small">
          <div className="userBoard-right-subHead">
            <h2 className="userBoard-subHeader">Change Password</h2>
          </div>
          <div className="userBoard-right-subInner">
            <div className="userBoard-right-single-group">
              <div className="userBoard-right-group">
                <label className="userBoard-right-label">Old Password</label>
                <input
                  type="password"
                  className="userBoard-right-input"
                  onChange={handleChange("oldPassword")}
                  value={oldPassword}
                />
              </div>
            </div>
            <div className="userBoard-right-single-group">
              <div className="userBoard-right-group">
                <label className="userBoard-right-label">New Password</label>
                <input
                  type="password"
                  className="userBoard-right-input"
                  onChange={handleChange("newPassword")}
                  value={newPassword}
                />
              </div>
            </div>
            <div className="userBoard-right-single-group">
              <div className="userBoard-right-group">
                <label className="userBoard-right-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="userBoard-right-input"
                  onChange={handleChange("confirmPassword")}
                  value={confirmPassword}
                />
              </div>
            </div>
            <button className="userBoard-right-btn" onClick={onSubmit}>
              Change
            </button>
          </div>
        </div>
      </div>
      {error && errorMessage()}
      {success && successMessage()}
    </section>
  );
};

export default Settings;
