import AccountList from '../../components/home/AccountList'
import Header from '../../components/home/Header'
import Nav from '../../components/home/Nav'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import  { useGetOrdersQuery } from '../../store/service/userOrderService';
import Spinner from '../../components/Spinner';
import currency from "currency-formatter";
import { discountPrice } from "./../../utils/discountPrice";
import Pagination from './../../components/Pagination';
const UserOrder = () => {
    let {page} = useParams();
    page= page ? page:1
    const {user}= useSelector(state =>state.authReducer)
    const {data,isFetching } = useGetOrdersQuery({page, userId: user.id})
    console.log("🚀 ~ file: UserOrder.js:13 ~ UserOrder ~ data", data)
  return (
    <>
      <Nav/>
     
      <div className='mt-[70px]'>
        <Header>
          My orders
        </Header> 
        <div className='my-container mt-[40px]'>

            <div className='flex flex-wrap -mx-6'>

                <div className='w-full md:w-4/12 p-6'>
                    <AccountList/>
                </div>
              <div className='w-full md:w-8/12 p-6'>

                <h1 className='heading mb-6'>orders</h1>

              {!isFetching ? data?.orders?.length >0 ? 

                <>
                <div className="table-container">
                  <table className="w-full">
                    <thead>
                      <tr className="thead-tr">
                        <th className="th">image</th>
                        <th className="th">name</th>
                        <th className="th"> color</th>
                        <th className="th"> size</th>
                        <th className="th"> price</th>
                        <th className="th"> quantities</th>
                        <th className="th"> total</th>
                        <th className="th"> details</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {data?.orders?.map((item) => {
                        return (
                          <tr className="even:bg-gray-50" key={item._id}>
                            <td className="td">
                              <img
                                src={`/images/${item?.productId?.image1}`}
                                alt={item?.productId?.title}
                                className="w-12 h-12 object-cover rounded-full"
                              />
                            </td>
                            <td className="td font-medium">{item?.productId?.title}</td>
                            <td className="block w-[15px] h-[15px] rounded-full" style={{backgroundColor:item?.color}}><span></span></td>
                           <td  className="td font-bold"><span>{item?.size }</span></td>
                            <td className="td font-bold text-gray-900">
                              {currency.format(
                                discountPrice(item?.productId?.price, item?.productId?.discount),
                                { code: "USD" }
                              )}
                            </td>
      
                            <td className="td font-semibold">
                            { item?.quantity}
                            </td>
                            <td className="td font-bold">
                                  {currency.format(discountPrice(item?.productId?.price,item?.productId?.discount)* item?.quantity,{code:"USD"})}
                            </td>
                            <td className="td">
                                    <Link to={`/user-order-details/${item._id}`} className="btn btn-indigo">details</Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
               <Pagination
                      page={parseInt(page)}
                      parPage={data.parPage}
                      count={data.count}
                      path={`orders`}
                      theme="light"
               />
                </>
                
                :'not': <Spinner/>}
    
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default UserOrder