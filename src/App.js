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
import Protected from './features/auth/components/Protected';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected><Homes/></Protected>),
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
    element:(<Protected><CartPage/></Protected>),
  },
  {
    path: "/Checkout",
    element:(<Protected><CheckoutPage/></Protected>),
  },
  {
    path: "/product-detail/:id",
    element:(<Protected><ProductDetailPage/></Protected>),
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
