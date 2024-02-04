import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "api/auth";
import { AccountsContext } from "setup/context-manager/Context";
import { updateUser, getUser } from "api/user";
import Cross from "assets/svg/cross-black.svg";

const EditAddress = () => {
  const { userId } = useParams();

  const { setAccountsActive } = useContext(AccountsContext);

  const [values, setValues] = useState({
    email: "",
    houseName: "",
    streetName: "",
    error: "",
    loading: "",
    success: false,
  });

  var preLoadValues = {
    houseName: "",
    streetName: "",
  };

  const { email, houseName, streetName, error, loading, success } = values;

  const { user, token } = isAuthenticated();

  const preLoad = async (userId, token) => {
    try {
      const userDetails = await getUser(userId, token);

      preLoadValues = {
        houseName: userDetails.address.houseName,
        streetName: userDetails.address.streetName
      }

      return setValues({
        ...values,
        houseName: userDetails.address.houseName,
        email: userDetails.email,
        streetName: userDetails.address.streetName
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

    if (!(houseName && streetName)) {
      console.log("Please fill all the fields");
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Fill all the fields",
      });
    }

    if (
      houseName === preLoadValues.houseName &&
      streetName === preLoadValues.streetName
    ) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "No Change",
      });
    }

    const address = {
      houseName: houseName,
      streetName: streetName
    }

    try {
      var data = await updateUser({address}, userId, token);

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
              <h1 className="popup-header">Edit Address</h1>
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
                  <label className="popup-form-label">House Name</label>
                  <input
                    type="text"
                    className="popup-form-input"
                    value={houseName}
                    onChange={handleChange("houseName")}
                  />
                </div>
              </div>
              <div className="popup-form-single-group">
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

export default EditAddress;
