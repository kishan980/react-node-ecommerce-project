import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AdminLogin from '../screens/auth/AdminLogin';
import Products from '../screens/dashborad/Products';
import Private from './Private';
import Public from "./Public";
import Category from './../screens/dashborad/Category';
import CreateCategory from './../screens/dashborad/CreateCategory';
import UpdateCategory from '../screens/dashborad/UpdateCategory';
import CreateProduct from '../screens/dashborad/CreateProduct';
import EditProduct from './../screens/dashborad/EditProduct';
const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
                <Route path="auth">
                    <Route path="admin-login" element={<Public><AdminLogin/></Public>}/>
                    </Route>

                    <Route path="dashboard">
                      <Route path="products" element={<Private><Products/></Private>}/>
                      <Route path="products/:page" element={<Private><Products/></Private>}/>
                      <Route path="edit-product/:id" element={<Private><EditProduct/></Private>}/>
                      <Route path="categories" element={<Private><Category/></Private>}/>
                      <Route path="categories/:page" element={<Private><Category/></Private>}/>
                      <Route path="create-category" element={<Private><CreateCategory/></Private>}/>
                      <Route path="update-category/:id" element={<Private><UpdateCategory/></Private>}/>
                      <Route path="create-product" element={<Private><CreateProduct/></Private>}/>
                    </Route>

        </Routes>
    </BrowserRouter>
  )
}

export default Routing