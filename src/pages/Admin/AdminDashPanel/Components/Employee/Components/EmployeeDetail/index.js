import React from "react";
import CrossIcon from "assets/svg/cross-black.svg";
import moment from "moment";

const EmployeeDetail = ({ employee, setEmployeeDetail }) => {
  return (
    <section className="employee-section">
      <div className="black-background">
        <div className="popup-big-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header"># {employee._id}</h1>
              <div
                className="cross-sec"
                onClick={() => setEmployeeDetail(null)}
              >
                <img src={CrossIcon} alt="" className="cross-img" />
              </div>
            </div>

            <div className="popup-form">
              <div className="popup-form-group adminDashPanel-employeeDetails-form-group">
                <div className="popup-form-single-group">
                  <div className="popup-form-group ">
                    <label className="popup-form-label">Name</label>
                    <p className="popup-form-value adminDashPanel-employeeDetails-value">
                      {employee.Euser.name}
                    </p>
                  </div>
                </div>
                <div className="popup-form-double-group">
                  <div className="popup-form-group">
                    <label className="popup-form-label">Email</label>
                    <p className="popup-form-value adminDashPanel-employeeDetails-value">
                      {employee.Euser.email}
                    </p>
                  </div>
                  <div className="popup-form-group">
                    <label className="popup-form-label">Phone</label>
                    <p className="popup-form-value adminDashPanel-employeeDetails-value">
                      {employee.Euser.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
              <div className="popup-form-group adminDashPanel-employeeDetails-form-group">
                <div className="popup-form-single-group">
                  <h1 className="popup-subHeader">Address</h1>
                </div>
                <div className="popup-form-double-group">
                  <div className="popup-form-group">
                    <label className="popup-form-label">House Name</label>
                    <p className="popup-form-value adminDashPanel-employeeDetails-value">
                      {employee.Euser.address.houseName}
                    </p>
                  </div>
                  <div className="popup-form-group">
                    <label className="popup-form-label">Street</label>
                    <p className="popup-form-value adminDashPanel-employeeDetails-value">
                      {employee.Euser.address.streetName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="popup-form-group adminDashPanel-employeeDetails-form-group">
                <div className="popup-form-single-group">
                  <h1 className="popup-subHeader">Deliveries</h1>
                </div>
                <div className="popup-form-group ">
                  <label className="popup-form-label">Total Deliveries</label>
                  <p className="popup-form-value adminDashPanel-employeeDetails-value">
                    {employee.Eorders.length}
                  </p>
                </div>
              </div>
              <table className="popup-table">
                <thead className="popup-table-head-sec">
                  <tr>
                    <th className="popup-table-head-value">Order ID</th>
                    <th className="popup-table-head-value">Total</th>
                    <th className="popup-table-head-value">Address</th>
                    <th className="popup-table-head-value">Created At</th>
                  </tr>
                </thead>
                <tbody className="popup-table-body-sec">
                  {employee.Eorders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td className="popup-table-body-value">
                          {order.Eorders.EorderId}
                        </td>
                        <td className="popup-table-body-value">
                          {order.Eorders.EorderTotal}
                        </td>
                        <td className="popup-table-body-value">
                          {order.Eorders.EorderAddress.houseName}
                          <br />
                          {order.Eorders.EorderAddress.streetName}
                        </td>
                        <td className="popup-table-body-value">
                          {moment(order.createdAt).format("DD-MMM-yyyy")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* {error && errorMessage()} */}
    </section>
  );
};

export default EmployeeDetail;
