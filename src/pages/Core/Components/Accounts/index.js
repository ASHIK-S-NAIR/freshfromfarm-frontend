import React, { useState, useEffect } from "react";
import { AccountsContext } from "setup/context-manager/Context";
import EditIcon from "assets/svg/Edit.svg";
import EditPersonalInformation from "./Components/EditPersonalInformation";
import EditAddress from "./Components/EditAddress";
import { getUser } from "api/user";
import { isAuthenticated } from "api/auth";
import { useParams } from "react-router-dom";

const Accounts = () => {
  const { userId } = useParams();

  const [accountsActive, setAccountsActive] = useState(null);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    houseName: "",
    streetName: "",
  });

  const { name, email, phoneNumber, houseName, streetName } = values;

  const { user, token } = isAuthenticated();

  const preLoad = async (userId, token) => {
    try {
      const userDetails = await getUser(userId, token);

      return setValues({
        ...values,
        name: userDetails.name,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        houseName: userDetails.address.houseName,
        streetName: userDetails.address.streetName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad(userId, token);
  }, [accountsActive]);

  return (
    <section className="userBoard-right-section accounts-section">
      <AccountsContext.Provider value={{ accountsActive, setAccountsActive }}>
        <h1 className="userBoard-right-header">Account</h1>
        <div className="userBoard-right-subSec">
          <div className="userBoard-right-subSec-small">
            <div className="userBoard-right-subHead">
              <h2 className="userBoard-subHeader">Personal Information</h2>
              <img
                src={EditIcon}
                alt=""
                className="userBoard-icon"
                onClick={() => setAccountsActive("editpersonalinformation")}
              />
            </div>
            <div className="userBoard-right-subInner">
              <div className="userBoard-right-single-group">
                <div className="userBoard-right-group">
                  <label className="userBoard-right-label">Email</label>
                  <p className="userBoard-right-value">{email}</p>
                </div>
              </div>
              <div className="userBoard-right-double-group">
                <div className="userBoard-right-group">
                  <label className="userBoard-right-label">Name</label>
                  <p className="userBoard-right-value">{name}</p>
                </div>
                <div className="userBoard-right-group">
                  <label className="userBoard-right-label">Phone</label>
                  <p className="userBoard-right-value">{phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="userBoard-right-subSec">
          <div className="userBoard-right-subSec-small">
            <div className="userBoard-right-subHead">
              <div className="userBoard-subHeader">Address</div>
              <img
                src={EditIcon}
                alt=""
                className="userBoard-icon"
                onClick={() => setAccountsActive("editaddress")}
              />
            </div>
            <div className="userBoard-right-subInner">
              <div className="userBoard-right-double-group">
                <div className="userBoard-right-group">
                  <label className="userBoard-right-label">House Name</label>
                  <p className="userBoard-right-value">{houseName}</p>
                </div>
                <div className="userBoard-right-group">
                  <label className="userBoard-right-label">Street</label>
                  <p className="userBoard-right-value">{streetName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {accountsActive === "editpersonalinformation" && (
          <EditPersonalInformation />
        )}
        {accountsActive === "editaddress" && <EditAddress />}
      </AccountsContext.Provider>
    </section>
  );
};

export default Accounts;
