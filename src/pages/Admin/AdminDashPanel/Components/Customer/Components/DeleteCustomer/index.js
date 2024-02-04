import React, { useState } from "react";
import { isAuthenticated } from "api/auth";
import CrossIcon from "assets/svg/cross-black.svg";
import { deleteCustomer } from "api/user";

const DeleteCustomer = ({ setDeleteCustomerActive, customer }) => {
  const [value, setValue] = useState("");

  const { user, token } = isAuthenticated();

  const onSubmit = async () => {
    try {
      const data = await deleteCustomer(user._id, token, customer._id);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setDeleteCustomerActive(null);
      } 
    } catch (error) {
      return console.log(error);
    }
  };
  return (
    <section className="deleteCustomer-section">
      <div className="black-background">
        <div className="popup-small-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header">Delete Customer</h1>
              <div
                className="cross-sec"
                onClick={() => setDeleteCustomerActive(null)}
              >
                <img src={CrossIcon} alt="" className="cross-img" />
              </div>
            </div>
            <form className="popup-form" onSubmit={onSubmit}>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <p className="popup-form-p-light">
                    This action <b>cannot</b> be undone. This will permanently
                    delete the <b>{customer.name}</b> customer from your
                    database.
                  </p>
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <p className="popup-form-p-light">
                    Please type <b>{customer._id}</b>  to confirm.
                  </p>
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <input
                    type="text"
                    className="popup-form-input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <button className={`popup-form-btn ${customer._id == value ? "" :" button-unclickable" }`} type="submit">
                    Delete Customer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteCustomer;
