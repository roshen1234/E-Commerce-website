import React from 'react'
import UserOrder from '../features/user/components/UserOrder'
import Navbar from '../features/navbar/Navbar'

const UserOrderPage = () => {
  return (
    <Navbar>
        <h1 className='mx-auto text-2xl'>My Orders</h1>
    <UserOrder></UserOrder>
    </Navbar>
  )
}

export default UserOrderPage
