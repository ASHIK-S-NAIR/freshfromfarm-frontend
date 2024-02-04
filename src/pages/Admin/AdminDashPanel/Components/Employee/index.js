import React, { useState, useEffect } from "react";
import ViewIcon from "assets/svg/view.svg";
import TrashIcon from "assets/svg/Trash.svg";
import AddIcon from "assets/svg/add.svg";
import { isAuthenticated } from "api/auth";
import moment from "moment";
import AddEmployee from "./Components/AddEmployee";
import EmployeeDetail from "./Components/EmployeeDetail";
import DeleteEmployee from "./Components/DeleteEmployee";
import { getEmployees } from "api/employee";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState("all");
  const [employee, setEmployee] = useState();
  const [addEmployeeActive, setAddEmployeeActive] = useState("");
  const [deleteEmployeeActive, setDeleteEmployeeActive] = useState("");
  const [employeeDetail, setEmployeeDetail] = useState("");
  const [countValues, setCountValues] = useState({
    all: 0,
    Available: 0,
    NotAvailable: 0,
    OnDuty: 0,
  });

  const { user, token } = isAuthenticated();

  const { all, Available, NotAvailable, OnDuty } = countValues;

  const loadEmployees = async (userId, token, status) => {
    try {
      const data = await getEmployees(userId, token, status);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setEmployees(data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const filterBtn = (statusState, statusValue, statusBtnValue) => {
    return (
      <button
        className={`orders-filter-btn ${
          status === statusState ? "active" : ""
        }`}
        onClick={() => setStatus(statusState)}
      >
        {statusBtnValue} <span className="filter-btn-value">{statusValue}</span>
      </button>
    );
  };

  const loadCountValues = async (userId, token) => {
    var employees = [];
    try {
      const data = await getEmployees(userId, token, "all");
      if (data.error) {
        return console.log(data.error);
      } else {
        employees = data;
      }
    } catch (error) {
      return console.log(error);
    }

    setCountValues({
      ...countValues,
      all: employees.length,
      Available: employees.filter(
        (employee) => employee.Estatus === "Available"
      ).length,
      NotAvailable: employees.filter(
        (employee) => employee.Estatus === "NotAvailable"
      ).length,
      OnDuty: employees.filter((employee) => employee.Estatus === "OnDuty")
        .length,
    });
  };

  const handlePreview = (employee) => {
    return setEmployeeDetail("employeeDetail"), setEmployee(employee);
  };

  const handleDelete = async (employee) => {
    return setDeleteEmployeeActive("deleteEmployee"), setEmployee(employee);
  };

  useEffect(() => {
    loadEmployees(user._id, token, status);
  }, [status, addEmployeeActive]);

  useEffect(() => {
    loadCountValues(user._id, token);
  }, [status, addEmployeeActive]);

  return (
    <section className="adminDashPanel-section employee-section">
      <h1 className="adminDashPanel-right-header">Employees</h1>
      <div className="adminDashPanel-right-subsection adminDashPanel-product-add-btn-subSection">
        <button
          className="adminDashPanel-product-add-btn"
          onClick={() => setAddEmployeeActive("addEmployee")}
        >
          <img
            src={AddIcon}
            className="adminDashPanel-product-add-btn-icon"
            alt=""
          />
          ADD EMPLOYEE
        </button>
      </div>
      <div className="adminDashPanel-right-subsection adminDashPanel-product-filter-subSection">
        {filterBtn("all", all, "All")}
        {filterBtn("Available", Available, "Available")}
        {filterBtn("NotAvailable", NotAvailable, "NotAvailable")}
        {filterBtn("OnDuty", OnDuty, "On-Duty")}
      </div>
      <div className="adminDashPanel-right-subsection">
        <table className="adminDashPanel-right-table">
          <thead className="adminDashPanel-right-table-head-sec">
            <tr>
              <th className="adminDashPanel-right-table-head-value">Name</th>
              <th className="adminDashPanel-right-table-head-value">
                Employee ID
              </th>
              <th className="adminDashPanel-right-table-head-value">Email</th>
              <th className="adminDashPanel-right-table-head-value">Status</th>
              <th className="adminDashPanel-right-table-head-value">
                Phone Number
              </th>
              <th className="adminDashPanel-right-table-head-value">Address</th>
              <th className="adminDashPanel-right-table-head-value">
                Created At
              </th>
              <th className="adminDashPanel-right-table-head-value">Action</th>
            </tr>
          </thead>
          <tbody className="adminDashPanel-right-table-body-sec">
            {employees &&
              employees.map((employee, index) => {
                return (
                  <tr
                    key={index}
                    className="adminDashPanel-right-table-body-tr"
                  >
                    <td className="adminDashPanel-right-table-body-value">
                      {employee.Euser.name}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {employee._id}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {employee.Euser.email}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {employee.Estatus}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {employee.Euser.phoneNumber}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {employee.Euser.address.houseName}
                      <br />
                      {employee.Euser.address.streetName}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {moment(employee.createdAt).format("DD-MMM-yyyy")}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      <button onClick={() => handlePreview(employee)}>
                        <img
                          src={ViewIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                      <button onClick={() => handleDelete(employee)}>
                        <img
                          src={TrashIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {addEmployeeActive === "addEmployee" && (
        <AddEmployee setAddEmployeeActive={setAddEmployeeActive} />
      )}
      {deleteEmployeeActive === "deleteEmployee" && (
        <DeleteEmployee
          setDeleteEmployeeActive={setDeleteEmployeeActive}
          employee={employee}
        />
      )}
      {employeeDetail === "employeeDetail" && (
        <EmployeeDetail
          employee={employee}
          setEmployeeDetail={setEmployeeDetail}
        />
      )}
    </section>
  );
};

export default Employee;
