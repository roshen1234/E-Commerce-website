import React from 'react'
import ProductDetail from '../features/product-list/components/ProductDetail'
import Navbar from '../features/navbar/Navbar'
import Footer from '../features/common/Footer'

const ProductDetailPage = () => {
  return (
    <div>
    <Navbar>
    <ProductDetail/>
    </Navbar>
    <Footer></Footer>
    </div>
  )
}

export default ProductDetailPage
