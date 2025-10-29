import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import AdminLayout from '../layouts/AdminLayout'
import Home from '../pages/destination/home'
import ProductOutlet from '../pages/destination/productMaster/ProductOutlet'
import ProductList from '../pages/destination/productMaster/ProductList'
import ProductVarient from '../pages/destination/productMaster/ProductVarient'
import ProductSupplierMapping from '../pages/destination/productMaster/ProductSupplierMapping'

const DestinationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Home />} />
        <Route path="product-master/" element={<ProductOutlet />}>
          <Route path="product-list" element={<ProductList />} />
          <Route path="product-varient/:id?" element={<ProductVarient />} />
          <Route path = "product-supplier" element={<ProductSupplierMapping />} />

          {/* Catch-all inside configuration */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
        {/* Catch-all inside admin */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

export default DestinationRoutes
