import { API } from "../../setup/backend-manager";

export const signup = async ({
  name,
  email,
  phoneNumber,
  password,
  address,
}) => {
  try {
    const result = await fetch(`${API}/signup`, {
      method: "POST",
      body: JSON.stringify({ name, email, phoneNumber, password, address }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result.json();
  } catch (error) {
    return error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const result = await fetch(`${API}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result.json();
  } catch (error) {
    return error;
  }
};

export const logout = async (next) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
    next();

    const result = await fetch(`${API}/logout`, {
      method: "GET",
    });

    return result.json();
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const result = await fetch(`${API}/forgotpassword`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result.json();
  } catch (error) {
    return error;
  }
};

export const resetPassword = async (userId, token, password) => {
  try {
    const result = await fetch(`${API}/resetpassword/${userId}/${token}`, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result.json();
  } catch (error) {
    return error;
  }
};

export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
