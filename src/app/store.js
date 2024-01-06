import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/productListSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    counter: counterReducer
  },
});
