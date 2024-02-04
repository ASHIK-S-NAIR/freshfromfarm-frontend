import { API } from "setup/backend-manager";

// getUser
// export const getUser = async (userId, token) => {
//   try {
//     const result = await fetch(`${API}/user/${userId}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// updateUser
// export const updateUser = async (body, userId, token) => {
//   try {
//     const result = await fetch(`${API}/user/${userId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(body),
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     return error;
//   }
// };

// changePssword
// export const changePassword = async (userId, token, body) => {
//   try {
//     const result = await fetch(`${API}/user/password/${userId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(body),
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     return error;
//   }
// };

// getUserCart
// export const getUserCart = async (userId, token) => {
//   try {
//     const result = await fetch(`${API}/user/cart/${userId}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     return error;
//   }
// };

// addToCart
// export const addToUserCart = (userId, token, body) => {
//   try {
//     const result = fetch(`${API}/user/addtocart/${userId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(body),
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     return error;
//   }
// };

// updateFromCart
// export const updateFromUserCart = (userId, token, { productId, quantity }) => {
//   try {
//     const result = fetch(`${API}/user/updatecart/${userId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ productId, quantity }),
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     return error;
//   }
// };

// deleteFromCart
// export const deleteFromCart = (userId, token, productId) => {
//   try {
//     const result = fetch(`${API}/user/deletecart/${userId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ productId }),
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     return error;
//   }
// };

// createOrder
// export const createOrder = (
//   userId,
//   token,
//   { shippingAddress, paymentMode }
// ) => {
//   console.log("Index shippingAddress", shippingAddress);
//   try {
//     const result = fetch(`${API}/order/create/${userId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ shippingAddress, paymentMode }),
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// razorPayOrder
// export const razorPayOrder = async (body) => {
//   try {
//     const result = await fetch(`${API}/order/razorpayorder`, {
//       method: "POST",
//       // mode: "no-cors",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// paymentVerify
// export const paymentVerify = async (body) => {
//   try {
//     const result = await fetch(`${API}/order/verify`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify(body),
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// updateOrderConfirmation
// export const updateOrderConfirmation = async (userId, token, orderId, body) => {
//   try {
//     const result = await fetch(
//       `${API}/order/orderconfirmation/${orderId}/${userId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       }
//     ).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// getUserOrders
// export const getUserOrders = async (userId, token) => {
//   try {
//     const result = await fetch(`${API}/user/orders/${userId}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// countOrders
// export const getCountOrders = async (userId, token) => {
//   try {
//     const result = await fetch(`${API}/order/orders/countorders/${userId}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// countProducts
// export const getCountProducts = async (userId, token) => {
//   try {
//     const result = await fetch(`${API}/products/countproducts/${userId}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// countEmployers
// export const getCountEmployers = async (userId, token) => {
//   try {
//     const result = await fetch(`${API}/employers/countemployers/${userId}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// countCustomers
// export const getCountCustomers = async (userId, token) => {
//   try {
//     const result = await fetch(`${API}/users/countcustomers/${userId}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// getAllOrders
// export const getAllOrders = async (userId, token, status) => {
//   try {
//     const result = await fetch(`${API}/orders/${status}/${userId}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// AdminUpdateOrderStatus
// export const adminUpdateOrderStatus = async (
//   userId,
//   token,
//   orderId,
//   status
// ) => {
//   try {
//     const result = await fetch(
//       `${API}/order/adminupdateorderstatus/${orderId}/${userId}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ status: status }),
//       }
//     ).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// AdminUpdatePaymentStatus
// export const adminUpdatePaymentStatus = async (
//   userId,
//   token,
//   orderId,
//   status
// ) => {
//   try {
//     const result = await fetch(
//       `${API}/order/adminupdatepaymentstatus/${orderId}/${userId}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ status: status }),
//       }
//     ).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// employeeUpdateOrderStatus
// export const employeeUpdateOrderStatus = async (
//   userId,
//   token,
//   orderId,
//   status
// ) => {
//   try {
//     const result = await fetch(
//       `${API}/order/employeeupdateorderstatus/${orderId}/${userId}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ status: status }),
//       }
//     ).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// employeeUpdatePaymentStatus
// export const employeeUpdatePaymentStatus = async (
//   userId,
//   token,
//   orderId,
//   status
// ) => {
//   console.log("userId", userId);
//   console.log("token", token);
//   console.log("orderId", orderId);
//   console.log("status", status);
//   try {
//     const result = await fetch(
//       `${API}/order/employeeupdatepaymentstatus/${orderId}/${userId}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ status: status }),
//       }
//     ).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// createProduct
// export const createProduct = async (userId, token, formData) => {
//   console.log("formData type", typeof formData);
//   try {
//     const result = await fetch(`${API}/product/create/${userId}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log("error", error.message);
//     return error;
//   }
// };

// getEmployees
// export const getEmployees = async (userId, token, status) => {
//   try {
//     const result = await fetch(`${API}/employees/${status}/${userId}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// createEmployee
// export const createEmployee = async (userId, token, email) => {
//   try {
//     const result = await fetch(`${API}/employee/create/${email}/${userId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log("error", error.message);
//     return error;
//   }
// };

// deleteEmployee
// export const deleteEmployee = async (userId, token, employeeId) => {
//   try {
//     const result = await fetch(`${API}/employee/${userId}/${userId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log("error", error.message);
//     return error;
//   }
// };

// getCustomers
// export const getCustomers = async (userId, token) => {
//   try {
//     const result = await fetch(`${API}/user/customers/${userId}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log("error", error.message);
//     return error;
//   }
// };

// deleteCustomer
// export const deleteCustomer = async (userId, token, customerId) => {
//   try {
//     const result = await fetch(`${API}/user/${customerId}/${userId}`, {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log("error", error.message);
//     return error;
//   }
// };

// getAllDeleveries
// export const getAllDeliveries = async (userId, token) => {
//   try {
//     const result = await fetch(
//       `${API}/employee/alldeliveries/${userId}/${userId}`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     ).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log("error", error.message);
//     return error;
//   }
// };

// getCountDeliveries
// export const getCountDeliveries = async (userId, token) => {
//   try {
//     const result = await fetch(
//       `${API}/employee/countdeliveries/${userId}/${userId}`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     ).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log("error", error.message);
//     return error;
//   }
// };

// getCountNewDeliveries
// export const getCountNewDeliveries = async (userId, token) => {
//   try {
//     const result = await fetch(
//       `${API}/employee/countnewdeliveries/${userId}/${userId}`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     ).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log("error", error.message);
//     return error;
//   }
// };

// getEmployeeStatus
// export const getEmployeeStatus = async (userId, token) => {
//   try {
//     const result = await fetch(`${API}/employee/status/${userId}/${userId}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log("error", error.message);
//     return error;
//   }
// };

// addEmployeeOrder
// export const addEmployeeOrder = async (userId, token, orderId, employeeId) => {
//   try {
//     const result = await fetch(
//       `${API}/employee/addemployeeorder/${employeeId}/${orderId}/${userId}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       }
//     ).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log("errorMessage", error);
//     return error;
//   }
// };

// updateEmployeeStatus
// export const updateEmployeeStatus = (userId, token, Estatus) => {
//   try {
//     const result = fetch(
//       `${API}/employee/updateemployeestatus/${userId}/${userId}`,
//       {
//         method: "PUT",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ Estatus }),
//       }
//     ).then((res) => res.json());

//     return result;
//   } catch (error) {
//     console.log("errorMessage", error);
//     return error;
//   }
// };
