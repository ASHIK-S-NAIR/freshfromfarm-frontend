export const API = process.env.REACT_APP_BACKEND;

// countEmployers
export const getCountEmployers = async (userId, token) => {
  try {
    const result = await fetch(`${API}/employers/countemployers/${userId}`, {
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

// getEmployees
export const getEmployees = async (userId, token, status) => {
  try {
    const result = await fetch(`${API}/employees/${status}/${userId}`, {
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

// createEmployee
export const createEmployee = async (userId, token, email) => {
  try {
    const result = await fetch(`${API}/employee/create/${email}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// deleteEmployee
export const deleteEmployee = async (userId, token, employeeId) => {
  try {
    const result = await fetch(`${API}/employee/${userId}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// getAllDeleveries
export const getAllDeliveries = async (userId, token) => {
  try {
    const result = await fetch(
      `${API}/employee/alldeliveries/${userId}/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// getCountDeliveries
export const getCountDeliveries = async (userId, token) => {
  try {
    const result = await fetch(
      `${API}/employee/countdeliveries/${userId}/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// getCountNewDeliveries
export const getCountNewDeliveries = async (userId, token) => {
  try {
    const result = await fetch(
      `${API}/employee/countnewdeliveries/${userId}/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// getEmployeeStatus
export const getEmployeeStatus = async (userId, token) => {
  try {
    const result = await fetch(`${API}/employee/status/${userId}/${userId}`, {
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

// addEmployeeOrder
export const addEmployeeOrder = async (userId, token, orderId, employeeId) => {
  try {
    const result = await fetch(
      `${API}/employee/addemployeeorder/${employeeId}/${orderId}/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// updateEmployeeStatus
export const updateEmployeeStatus = (userId, token, Estatus) => {
  try {
    const result = fetch(
      `${API}/employee/updateemployeestatus/${userId}/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Estatus }),
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};
