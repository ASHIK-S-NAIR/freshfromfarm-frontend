import { ActionTypes } from "../constants/action-types";
const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_CART:
      return { ...state, cart: payload };

    default:
      return state;
  }
};

export const selectedCartReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.REMOVE_FROM_CART:
      return {};
    default:
      return state;
  }
};
