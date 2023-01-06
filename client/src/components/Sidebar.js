import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = ({side,closeSideBar}) => {
  return (
    <div  className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-gray-800 z-10 transition-all`}>
    <i className='bi bi-x-lg absolute top-4 right-4 sm:hidden block cursor-pointer text-lg' onClick={closeSideBar}></i>
        <div className='bg-white p-4'>
            <img src="/logo.png" alt="logo"/>
        </div>
        <ul className='mt-4'>
            <li className='px-4 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600'>
                <i className='bi bi-card-list mr-2 inline-block text-lg'></i><Link to="/dashboard/products" className='text-base capitalize'>products</Link>
            </li>
            <li className='px-4 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600'>
            <i className='bi bi-bag-check mr-2 inline-block text-lg'></i><Link to="/dashboard/orders" className='text-base capitalize'>Orders</Link>
        </li>
        <li className='px-4 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600'>
        <i className='bi bi-people-fill mr-2 inline-block text-lg'></i><Link to="/dashboard/products" className='text-base capitalize'>customer</Link>
         </li>
         <li className='px-4 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600'>
        <i className='bi bi-bar-chart mr-2 inline-block text-lg'></i><Link to="/dashboard/categories" className='text-base capitalize'>category</Link>
         </li>
        </ul>
    </div>
  )
}

export default Sidebar