import React,{useEffect} from 'react'
import {useSearchParams, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import AccountList from '../../components/home/AccountList'
import Header from '../../components/home/Header'
import Nav from '../../components/home/Nav'
import { useVerifyPaymentQuery } from '../../store/service/paymentService';
import { setSuccess } from '../../store/reducer/globalReducer';
import toast, { Toaster } from 'react-hot-toast';
import { emptyCart } from '../../store/reducer/cartReducer';
const Dashboard = () => {
  const dispatch =useDispatch();
  const {success} = useSelector(state => state.globalReducer)
  const {user}= useSelector(state => state.authReducer)
  const [params] = useSearchParams()
  const id = params.get('session_id');
  const {data, isSuccess} = useVerifyPaymentQuery(id, {skip:id ? false:true })
  console.log("🚀 ~ file: Dashboard.js:17 ~ Dashboard ~ data", data)
  const navigate = useNavigate()
  useEffect(() =>{
    if(isSuccess){
      localStorage.removeItem('cart')
      dispatch(emptyCart())
      dispatch(setSuccess(data.msg))
      toast.success(data.msg);
      navigate("/user")
    }
  },[isSuccess,success])
  return (
    <>
      <Nav/>
      <Toaster position='top-right'  reverseOrder={false}/>
      <div className='mt-[70px]'>
        <Header>
          My account
        </Header> 
        <div className='my-container mt-[40px]'>

            <div className='flex flex-wrap -mx-6'>

                <div className='w-full md:w-4/12 p-6'>
                    <AccountList/>
                </div>
              <div className='w-full md:w-8/12 p-6'>

                <h1 className='heading'>name</h1>

                <span className='block mt-3 capitalize font-medium text-sm'>{user?.name}</span>

              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard