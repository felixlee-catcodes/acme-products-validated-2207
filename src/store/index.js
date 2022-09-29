import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import axios from "axios";

const products = (state = [], action) => {
  if (action.type === "SET_PRODUCTS") {
    return action.products;
  }
  if (action.type === "UPDATE_PRODUCT") {
    return state.map((product) =>
      product.id === action.product.id ? action.product : product
    );
  }
  if (action.type === "CREATE_PRODUCT") {
    return [...state, action.product];
  }
  if (action.type === "DELETE_PRODUCT") {
    return state.filter((product) => product.id !== action.product.id);
  }
  return state;
};

const orders = (state = [], action) => {
  if (action.type === "SET_ORDERS") {
    return action.orders;
  }
  if (action.type === "CREATE_ORDER") {
    return [...state, action.order];
  }
  return state;
};

//action creators
const setProducts = (products) => {
  return {
    type: "SET_PRODUCTS",
    products,
  };
};

const setOrders = (orders) => {
  return {
    type: "SET_ORDERS",
    orders,
  };
};

const _updateProduct = (product) => {
  return {
    type: "UPDATE_PRODUCT",
    product,
  };
};

const _createProduct = (product) => {
  return {
    type: "CREATE_PRODUCT",
    product,
  };
};

const _createOrder = (order) => {
  return {
    type: "CREATE_ORDER",
    order,
  };
};

const _deleteProduct = (product) => {
  console.log(product);
  return {
    type: "DELETE_PRODUCT",
    product,
  };
};
export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/products");
    dispatch(setProducts(response.data));
  };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/orders");
    dispatch(setOrders(response.data));
  };
};

export const updateProduct = (product, navigate) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/products/${product.id}`, product);
    navigate("/products");
    dispatch(_updateProduct(response.data));
  };
};

export const createProduct = (product, navigate) => {
  return async (dispatch) => {
    const response = await axios.post("/api/products/create", product);
    navigate("/products");
    dispatch(_createProduct(response.data));
  };
};

export const createOrder = (order, navigate) => {
  return async (dispatch) => {
    const response = await axios.post("/api/orders/create", order);
    navigate("/orders");
    dispatch(_createOrder(response.data));
  };
};

export const deleteProduct = (product) => {
  return async (dispatch) => {
    console.log(product.id);
    console.log(product);
    const response = await axios.delete(`/api/product/${product.id}`);
    dispatch(_deleteProduct(response.data));
  };
};

const reducer = combineReducers({
  products,
  orders,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
