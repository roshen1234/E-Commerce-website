import React from 'react';

import './App.css';
import Homes from './pages/Homes';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PageNotFound from './pages/404';
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

import {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import OrderSuccessPage from './pages/orderSuccessPage';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminHomes from './pages/AdminHomes';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import StripeCheckout from './pages/StripeCheckout';
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected><Homes/></Protected>),
  },
  {
    path: "/admin",
    element: (<ProtectedAdmin><AdminHomes/></ProtectedAdmin>),
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
  {
    path: "/admin/product-detail/:id",
    element:(<ProtectedAdmin><AdminProductDetailPage/></ProtectedAdmin>),
  },
  {
    path: "/admin/product-form",
    element:(<ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>),
  },
  {
    path: "/admin/orders",
    element:(<ProtectedAdmin><AdminOrdersPage/></ProtectedAdmin>),
  },
  {
    path: "/admin/product-form/edit/:id",
    element:(<ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>),
  },
  {
    path: "/order-success/:id",
    element:(<OrderSuccessPage></OrderSuccessPage>),
  },
  {
    path: "/orders",
    element:(<UserOrderPage></UserOrderPage>),
  },
  {
    path: "/profile",
    element:(<UserProfilePage></UserProfilePage>),
  },
  {
    path: "/stripe-checkout/",
    element:(<Protected><StripeCheckout/></Protected>),
  },
  {
    path: "/logout",
    element:(<Logout></Logout>),
  },
  {
    path: "/forgot-password",
    element:(<ForgotPasswordPage></ForgotPasswordPage>),
  },
  {
    path: "*",
    element:(<PageNotFound></PageNotFound>),
  },
  
]);


function App() {

  const dispatch=useDispatch()
  const user=useSelector(selectLoggedInUser);
  const userChecked=useSelector(selectUserChecked)

  useEffect(()=>{
   dispatch(checkAuthAsync())
  },[])
  useEffect(()=>{
    if(user)
    {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync())
    }
},[dispatch,user])
  
  return (

    <div className="">
      {userChecked && <Provider template={AlertTemplate} {...options}>
       <RouterProvider router={router} />
       </Provider>}
    </div>
  );
}

export default App;
