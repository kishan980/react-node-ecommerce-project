import React from 'react'
import { NavLink } from 'react-router-dom'
import { BsPersonCircle } from 'react-icons/bs'
import {AiOutlineLogout, AiOutlineShoppingCart} from "react-icons/ai"
import { useDispatch } from 'react-redux';
import {logout} from "../../store/reducer/authReducer";
const AccountList = () => {
  const dispatch = useDispatch();

  return (
    <>
        <NavLink to="/user" className="account-list">
            <BsPersonCircle size={22}/>
            <span className='account-list-title'>my Account</span>
        </NavLink>

        <NavLink to="/orders" className="account-list">
        <AiOutlineShoppingCart size={22}/>
        <span className='account-list-title'>orders</span>
         </NavLink>

         <span  className="account-list cursor-pointer" onClick={()=> dispatch(logout("user-token"))}>
         <AiOutlineLogout size={22}/>
         <span className='account-list-title'>logout</span>
        </span>
    </>
  )
}

export default AccountList