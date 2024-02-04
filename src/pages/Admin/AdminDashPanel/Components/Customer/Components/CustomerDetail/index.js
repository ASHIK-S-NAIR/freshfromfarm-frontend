import React from "react";
import CrossIcon from "assets/svg/cross-black.svg";
import moment from "moment";

const CustomerDetail = ({ customer, setCustomerDetail }) => {
  // console.log("Customer", customer)
  return (
    <section className="customer-section">
      <div className="black-background">
        <div className="popup-big-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header"># {customer._id}</h1>
              <div
                className="cross-sec"
                onClick={() => setCustomerDetail(null)}
              >
                <img src={CrossIcon} alt="" className="cross-img" />
              </div>
            </div>

            <div className="popup-form">
              <div className="popup-form-group adminDashPanel-customerDetails-form-group">
                <div className="popup-form-single-group">
                  <div className="popup-form-group ">
                    <label className="popup-form-label">Name</label>
                    <p className="popup-form-value adminDashPanel-customerDetails-value">
                      {customer.name}
                    </p>
                  </div>
                </div>
                <div className="popup-form-double-group">
                  <div className="popup-form-group">
                    <label className="popup-form-label">Email</label>
                    <p className="popup-form-value adminDashPanel-customerDetails-value">
                      {customer.email}
                    </p>
                  </div>
                  <div className="popup-form-group">
                    <label className="popup-form-label">Phone</label>
                    <p className="popup-form-value adminDashPanel-customerDetails-value">
                      {customer.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
              <div className="popup-form-group adminDashPanel-customerDetails-form-group">
                <div className="popup-form-single-group">
                  <h1 className="popup-subHeader">Address</h1>
                </div>
                <div className="popup-form-double-group">
                  <div className="popup-form-group">
                    <label className="popup-form-label">House Name</label>
                    <p className="popup-form-value adminDashPanel-customerDetails-value">
                      {customer.address.houseName}
                    </p>
                  </div>
                  <div className="popup-form-group">
                    <label className="popup-form-label">Street</label>
                    <p className="popup-form-value adminDashPanel-customerDetails-value">
                      {customer.address.streetName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="popup-form-group adminDashPanel-customerDetails-form-group">
                <div className="popup-form-single-group">
                  <h1 className="popup-subHeader">Orders</h1>
                </div>
                <div className="popup-form-group ">
                  <label className="popup-form-label">Total Orders</label>
                  <p className="popup-form-value adminDashPanel-customerDetails-value">
                    {customer.orders.length}
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
                  {customer.orders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td className="popup-table-body-value">{order._id}</td>
                        <td className="popup-table-body-value">
                          {order.OtotalPrice}
                        </td>
                        <td className="popup-table-body-value">
                          {order.Oaddress.houseName}
                          <br />
                          {order.Oaddress.streetName}
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

export default CustomerDetail;
