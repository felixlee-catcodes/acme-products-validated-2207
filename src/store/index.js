import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

const products = (state = [], action)=> {
  if(action.type === 'SET_PRODUCTS'){
    return action.products;
  }
  if(action.type === 'UPDATE_PRODUCT'){
    return state.map(product => product.id === action.product.id ? action.product : product);
  }
  if(action.type === 'CREATE_PRODUCT'){
    return [...state, action.product]
  }
  return state;
}

const orders = (state = [], action)=> {
  if(action.type === 'SET_ORDERS'){
    return action.orders;
  }
  return state;
}

//action creators
const setProducts = products => {
  return {
    type: 'SET_PRODUCTS',
    products
  };
};

const _updateProduct = product => {
  return {
    type: 'UPDATE_PRODUCT',
    product
  };
};

const _createProduct = product => {
  return {
    type: 'CREATE_PRODUCT',
    product
  };
};

export const fetchProducts = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/products');
    dispatch(setProducts(response.data));
  };
};

export const updateProduct = (product, navigate)=> {
  return async(dispatch)=> {
    const response = await axios.put(`/api/products/${product.id}`, product);
    navigate('/products');
    dispatch(_updateProduct(response.data));
  };
};

export const createProduct = (product, navigate)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/products/create', product);
    navigate('/products');
    dispatch(_createProduct(response.data));
  };
};

const reducer = combineReducers({
  products,
  orders
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
