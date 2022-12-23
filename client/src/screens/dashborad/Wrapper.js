import React,{useState} from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import Sidebar from '../../components/Sidebar'
const Wrapper = ({children}) => {
  const [side, setSide]= useState('-left-64');
  const openSidebar = ()=>{
    setSide("left-0")
  }
  const closeSideBar = ()=>{
    setSide("-left-64")
  }
  return (
   
    <>
    <Sidebar side={side} closeSideBar={closeSideBar}/>
    <AdminNavbar openSidebar={openSidebar} />
    <section className='ml-0 sm:ml-64 bg-gray-900 min-h-screen pt-28 px-4'>

    <div className='bg-gray-800 text-white px-4 py-6'>
      {children}
    </div>
    </section>
    </>
  )
}

export default Wrapper