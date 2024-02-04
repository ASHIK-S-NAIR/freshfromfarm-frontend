import { combineReducers } from "redux";
import { cartReducer, selectedCartReducer } from "./cartReducer";
import { productReducer, selectedProductReducer } from "./productReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  product: selectedProductReducer,
  allCart: cartReducer,
  cart: selectedCartReducer
});

export default reducers;
