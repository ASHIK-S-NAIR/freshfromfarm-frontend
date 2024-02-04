import React, { useState, useEffect } from "react";
import { isAuthenticated } from "api/auth";
import { getCustomers } from "api/user";
import moment from "moment";
import ViewIcon from "assets/svg/view.svg";
import TrashIcon from "assets/svg/Trash.svg";
import CustomerDetail from "./Components/CustomerDetail";
import DeleteCustomer from "./Components/DeleteCustomer";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [customerDetail, setCustomerDetail] = useState("");
  const [deleteCustomerActive, setDeleteCustomerActive] = useState("");
  const [customer, setCustomer] = useState("");

  const { user, token } = isAuthenticated();

  const loadCustomers = async (userId, token) => {
    try {
      const data = await getCustomers(userId, token);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setCustomers(data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handlePreview = (customer) => {
    return setCustomerDetail("customerDetail"), setCustomer(customer);
  };

  const handleDelete = async (customer) => {
    return setDeleteCustomerActive("deleteCustomer"), setCustomer(customer);
  };

  useEffect(() => {
    loadCustomers(user._id, token);
  }, []);

  return (
    <section className="adminDashPanel-section customer-section">
      <h1 className="adminDashPanel-right-header">Customers</h1>
      <div className="adminDashPanel-right-subsection">
        <table className="adminDashPanel-right-table">
          <thead className="adminDashPanel-right-table-head-sec">
            <tr>
              <th className="adminDashPanel-right-table-head-value">Name</th>
              <th className="adminDashPanel-right-table-head-value">
                Customer ID
              </th>
              <th className="adminDashPanel-right-table-head-value">Email</th>
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
            {customers &&
              customers.map((customer, index) => {
                return (
                  <tr
                    key={index}
                    className="adminDashPanel-right-table-body-tr"
                  >
                    <td className="adminDashPanel-right-table-body-value">
                      {customer.name}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {customer._id}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {customer.email}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {customer.phoneNumber}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {customer.address.houseName}
                      <br />
                      {customer.address.streetName}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {moment(customer.createdAt).format("DD-MMM-yyyy")}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      <button onClick={() => handlePreview(customer)}>
                        <img
                          src={ViewIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                      <button onClick={() => handleDelete(customer)}>
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
      {customerDetail === "customerDetail" && (
        <CustomerDetail
          customer={customer}
          setCustomerDetail={setCustomerDetail}
        />
      )}
      {deleteCustomerActive === "deleteCustomer" && (
        <DeleteCustomer
          customer={customer}
          setDeleteCustomerActive={setDeleteCustomerActive}
        />
      )}
    </section>
  );
};

export default Customer;
