import React from "react";

const UserPanel = () => {
  return (
    <section className="userPanel-section">
      <div className="userPanel-left">
        <div className="userPanel-user-detail"></div>
        <ul className="userPanel-left-ul">
          <li className="userPanel-left-li">ORDERS</li>
          <li className="userPanel-left-li">ACCOUNT</li>
          <li className="userPanel-left-li">SETTINGS</li>
        </ul>
      </div>
      <div className="userPanel-right">
        <h1 className="userPanel-right-header">Account</h1>
        <div className="userPanel-right-subSec">
          <div className="userPanel-right-subHead">
            <div className="userPanel-header">Personal Information</div>
            <img src="" alt="" className="userPanel-icon" />
          </div>
          <div className="userPanel-right-subDetail">
            <div className="userPanel-right-single-group">
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPanel;
