import { API } from "setup/backend-manager";

// getProduct
export const getProduct = async (productId) => {
  try {
    const result = await fetch(`${API}/product/${productId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then((res) => res.json());
    return result;
  } catch (error) {
    return error;
  }
};

// getAllProducts
export const getAllProducts = async (category) => {
  try {
    const result = await fetch(`${API}/products/${category}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// updateProduct
export const updateProduct = async (userId, token, productId, values) => {
  try {
    const result = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// updateProductWithImage
export const updateProductWithImage = async (
  userId,
  token,
  productId,
  formData
) => {
  try {
    const result = await fetch(
      `${API}/product/updateproductwithimage/${productId}/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// deleteProduct
export const deleteProduct = async (userId, token, productId) => {
  try {
    const result = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// productSearch
export const productSearch = async (page, limit, category, search, sort) => {
  try {
    const result = await fetch(
      `${API}/productsearch?page=${page}&limit=${limit}&category=${category}&search=${search}&sort=${sort}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

// countProducts
export const getCountProducts = async (userId, token) => {
  try {
    const result = await fetch(`${API}/products/countproducts/${userId}`, {
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

// createProduct
export const createProduct = async (userId, token, formData) => {
  try {
    const result = await fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};
