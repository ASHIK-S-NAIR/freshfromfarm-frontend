import { isAuthenticated } from "../../../api/auth";
import { ActionTypes } from "../constants/action-types";

export const fetchProducts = () => async (dispatch) => {
  const response = await fetch("https://fakestoreapi.com/products", {
    method: "GET",
  }).then((res) => res.json());

  dispatch({ type: ActionTypes.FETCH_PRODUCTS, payload: response });
};

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};

export const fetchProduct = (id) => async (dispatch) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "GET",
    }).then((res) => res.json());
  
    dispatch({ type: ActionTypes.SELECTED_PRODUCT, payload: response });
  };

export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
  };
};


/////////////////////////////////////////////////////


