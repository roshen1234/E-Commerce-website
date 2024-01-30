import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createOrderAsync
} from './orderSlice';

const Order = () => {
  const count = useSelector();
  const dispatch = useDispatch();
  return (
    <div>
      
    </div>
  )
}

export default Order
