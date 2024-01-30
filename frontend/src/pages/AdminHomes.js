import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductList from '../features/admin/components/AdminProductList'

const AdminHomes = () => {
  return (
    <div>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  )
}

export default AdminHomes
