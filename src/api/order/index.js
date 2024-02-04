import { API } from "setup/backend-manager";

// createOrder
export const createOrder = (
  userId,
  token,
  { shippingAddress, paymentMode }
) => {
  try {
    const result = fetch(`${API}/order/create/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ shippingAddress, paymentMode }),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// razorPayOrder
export const razorPayOrder = async (body) => {
  try {
    const result = await fetch(`${API}/order/razorpayorder`, {
      method: "POST",
      // mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// paymentVerify
export const paymentVerify = async (body) => {
  try {
    const result = await fetch(`${API}/order/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// updateOrderConfirmation
export const updateOrderConfirmation = async (userId, token, orderId, body) => {
  try {
    const result = await fetch(
      `${API}/order/orderconfirmation/${orderId}/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// countOrders
export const getCountOrders = async (userId, token) => {
  try {
    const result = await fetch(`${API}/order/orders/countorders/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// getAllOrders
export const getAllOrders = async (userId, token, status) => {
  try {
    const result = await fetch(`${API}/orders/${status}/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// AdminUpdateOrderStatus
export const adminUpdateOrderStatus = async (
  userId,
  token,
  orderId,
  status
) => {
  try {
    const result = await fetch(
      `${API}/order/adminupdateorderstatus/${orderId}/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ status: status }),
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// AdminUpdatePaymentStatus
export const adminUpdatePaymentStatus = async (
  userId,
  token,
  orderId,
  status
) => {
  try {
    const result = await fetch(
      `${API}/order/adminupdatepaymentstatus/${orderId}/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ status: status }),
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// employeeUpdateOrderStatus
export const employeeUpdateOrderStatus = async (
  userId,
  token,
  orderId,
  status
) => {
  try {
    const result = await fetch(
      `${API}/order/employeeupdateorderstatus/${orderId}/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ status: status }),
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// employeeUpdatePaymentStatus
export const employeeUpdatePaymentStatus = async (
  userId,
  token,
  orderId,
  status
) => {
  try {
    const result = await fetch(
      `${API}/order/employeeupdatepaymentstatus/${orderId}/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ status: status }),
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};
