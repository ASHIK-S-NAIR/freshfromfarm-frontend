import { API } from "setup/backend-manager";

// getUser
export const getUser = async (userId, token) => {
  try {
    const result = await fetch(`${API}/user/${userId}`, {
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

// updateUser
export const updateUser = async (body, userId, token) => {
  try {
    const result = await fetch(`${API}/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// changePassword
export const changePassword = async (userId, token, body) => {
  try {
    const result = await fetch(`${API}/user/password/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// getUserCart
export const getUserCart = async (userId, token) => {
  try {
    const result = await fetch(`${API}/user/cart/${userId}`, {
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

// addToCart
export const addToUserCart = (userId, token, body) => {
  try {
    const result = fetch(`${API}/user/addtocart/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// updateFromCart
export const updateFromUserCart = (userId, token, { productId, quantity }) => {
  try {
    const result = fetch(`${API}/user/updatecart/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// deleteFromCart
export const deleteFromCart = (userId, token, productId) => {
  try {
    const result = fetch(`${API}/user/deletecart/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// getUserOrders
export const getUserOrders = async (userId, token) => {
  try {
    const result = await fetch(`${API}/user/orders/${userId}`, {
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

// countCustomers
export const getCountCustomers = async (userId, token) => {
  try {
    const result = await fetch(`${API}/users/countcustomers/${userId}`, {
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

// getCustomers
export const getCustomers = async (userId, token) => {
  try {
    const result = await fetch(`${API}/user/customers/${userId}`, {
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

// deleteCustomer
export const deleteCustomer = async (userId, token, customerId) => {
  try {
    const result = await fetch(`${API}/user/${customerId}/${userId}`, {
      method: "DELETE",
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
