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
import Home from '../screens/home/Home';
import Login from '../screens/home/auth/Login';
import Register from './../screens/home/auth/Register';
import Dashboard from './../screens/users/Dashboard';
import UserRouter from './UserRoutes';
import UserAuthRouter from './UserAuthRoutes';
import CatProduct from './../screens/home/CatProduct';
import Product from './../screens/home/Product';
import SearchProduct from '../screens/home/SearchProduct';
import Cart from '../screens/home/Cart';
import Orders from '../screens/dashborad/Orders';
import OrderDetail from './../screens/dashborad/OrderDetail';

const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="cat-products/:name" element={<CatProduct/>} />
                <Route path="cat-products/:name/:page" element={<CatProduct/>} />
                <Route path="search-products/:keyword/:page" element={<SearchProduct/>} />
                <Route path="cart" element={<Cart/>}/>
                <Route path="product/:name"  element={<Product/>} />
                <Route element={<UserAuthRouter/>}>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                </Route>
                <Route element={<UserRouter/>} >
                <Route path="user" element={<Dashboard/>}/>
                </Route>
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
                      <Route path="orders" element={<Orders/>} />
                      <Route path="orders/:page" element={<Orders/>} />
                      <Route path="order-details/:id" element={<OrderDetail/>} />
                    </Route>

        </Routes>
    </BrowserRouter>
  )
}

export default Routing