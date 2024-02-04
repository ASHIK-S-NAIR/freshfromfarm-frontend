import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "api/auth";
import { AccountsContext } from "setup/context-manager/Context";
import { updateUser, getUser } from "api/user";
import Cross from "assets/svg/cross-black.svg";

const EditPersonalInformation = () => {
  const { userId } = useParams();

  const { setAccountsActive } = useContext(AccountsContext);

  const [values, setValues] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    error: "",
    loading: "",
    success: false,
  });

  var preLoadValues = {
    name: "",
    phoneNumber: "",
  };

  const { email, name, phoneNumber, error, loading, success } = values;

  const { user, token } = isAuthenticated();

  const preLoad = async (userId, token) => {
    try {
      const userDetails = await getUser(userId, token);

      preLoadValues = {
        name: userDetails.name,
        phoneNumber: userDetails.phoneNumber,
      };

      return setValues({
        ...values,
        name: userDetails.name,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad(userId, token);
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: "loading" });

    if (!(name && phoneNumber)) {
      console.log("Please fill all the fields");
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Fill all the fields",
      });
    }

    if (
      name === preLoadValues.name &&
      phoneNumber === preLoadValues.phoneNumber
    ) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "No Change",
      });
    }

    if (phoneNumber.length !== 10) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Enter valid phone Number",
      });
    }

    try {
      var data = await updateUser({ name, phoneNumber }, userId, token);

      if (data.error) {
        console.log(data.error);
        return setValues({
          ...values,
          loading: "",
          success: false,
          error: data.error,
        });
      }

      return setAccountsActive(null);
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
      <div className="black-background">
        <div className="popup-big-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header">Edit Personal Information</h1>
              <div
                className="cross-sec"
                onClick={() => setAccountsActive(null)}
              >
                <img src={Cross} alt="" className="cross-img" />
              </div>
            </div>

            <div className="popup-form">
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Email</label>
                  <p className="popup-form-value">{email}</p>
                </div>
              </div>
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
              <div className="popup-form-single-group">
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
              <button className="popup-form-btn" onClick={onSubmit}>
                Update
              </button>
            </div>
          </div>
        </div>
        {error && errorMessage()}
      </div>
    </section>
  );
};

export default EditPersonalInformation;
