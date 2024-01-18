import React from 'react';

import './App.css';
import Homes from './pages/Homes';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Homes/>),
  },
  {
    path: "/login",
    element: (<LoginPage/>),
  },
  {
    path: "/signup",
    element:(<SignupPage/>),
  },
  {
    path: "/cart",
    element:(<CartPage/>),
  },
  {
    path: "/Checkout",
    element:(<CheckoutPage/>),
  },
  {
    path: "/product-detail/:id",
    element:(<ProductDetailPage/>),
  },
  
]);


function App() {
  return (
    <div className="">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
