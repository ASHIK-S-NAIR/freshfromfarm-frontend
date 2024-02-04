import React, { useState, useEffect } from "react";
import { isAuthenticated } from "api/auth";
import Cross from "assets/svg/cross-black.svg";
import { addEmployeeOrder, getEmployees } from "api/employee";

const EmployeeUpdate = ({ order, setOrderEmployeeAssignActive }) => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

  const { user, token } = isAuthenticated();

  const preload = async (userId, token) => {
    try {
      const data = await getEmployees(userId, token, "Available");
      console.log(data);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setEmployees(data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handleEmployeeAssign = async (userId, token, orderId, employeeId) => {
    try {
      const data = await addEmployeeOrder(userId, token, orderId, employeeId);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setOrderEmployeeAssignActive(null);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    preload(user._id, token);
  }, []);
  return (
    <section className="employeeUpdate-section">
      <div className="black-background">
        <div className="popup-small-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header employeeUpdate-popup-header">
                Assign Employee
              </h1>
              <div
                className="cross-sec"
                onClick={() => setOrderEmployeeAssignActive(null)}
              >
                <img src={Cross} alt="" className="cross-img" />
              </div>
            </div>
            <div className="popup-form">
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Order ID</label>
                  <p className="popup-form-value">{order._id}</p>
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Employee Name</label>
                  <select
                    name="employeeName"
                    id="employeeName"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="popup-form-value"
                  >
                    <option value="">Select an Employee</option>

                    {employees &&
                      employees.map((employee, index) => {
                        return (
                          <option key={index} value={employee._id}>
                            {employee.Euser.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <button
                className={`popup-form-btn ${
                  employeeId === "" ? "button-unclickable" : ""
                }`}
                onClick={() =>
                  handleEmployeeAssign(user._id, token, order._id, employeeId)
                }
              >
                Assign Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeUpdate;
