import Nav from "./../../components/home/Nav";
import { useSelector, useDispatch } from "react-redux";
import currency from "currency-formatter";
import { discountPrice } from "./../../utils/discountPrice";
import Quantity from "../../components/home/Quantity";
import { BsTrash } from "react-icons/bs";
import { motion } from 'framer-motion';
import { inQuantity ,decQuantity,removeCart} from "../../store/reducer/cartReducer";
import { useNavigate } from "react-router-dom";
import {useSendPaymentMutation} from "../../store/service/paymentService";
import { useEffect } from "react";
const Cart = () => {
  const { cart, total } = useSelector((state) => state.cartReducer);
  const {userToken,user} = useSelector((state) => state.authReducer)
    const dispatch = useDispatch()

  const inCrement = (id) => {
    dispatch(inQuantity(id))
  };
  const deCerement = (id) => {
    dispatch(decQuantity(id))
  };
  const deleteCard = (id) =>{
    if(window.confirm("Are you sure you want to delete this items?")){
       dispatch(removeCart(id))
    }
  }
  const navigate = useNavigate();
  const [doPayment, response] = useSendPaymentMutation();
  const pay = ()=>{
    if(userToken){
        doPayment({cart, id: user.id})
    }else {
        navigate("/login")
    }
  }
  useEffect(() =>{
    if(response?.isSuccess){
        window.location.href =response?.data?.url;
    }
  },[response])
  return (
    <>
      <Nav />
      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="my-container mt-28">
        {cart.length > 0 ? (
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
                  <th className="th"> delete</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  return (
                    <tr className="even:bg-gray-50" key={item._id}>
                      <td className="td">
                        <img
                          src={`/images/${item.image1}`}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      </td>
                      <td className="td font-medium">{item.title}</td>
                      <td className="block w-[15px] h-[15px] rounded-full" style={{backgroundColor:item.color}}><span></span></td>
                     <td  className="td font-bold"><span>{item.size}</span></td>
                      <td className="td font-bold text-gray-900">
                        {currency.format(
                          discountPrice(item.price, item.discount),
                          { code: "USD" }
                        )}
                      </td>

                      <td className="td">
                        <Quantity
                          quantity={item.quantity}
                          inCrement={()=>inCrement(item._id)}
                          deCerement={()=>deCerement(item._id)}
                          theme="indigo"
                        />
                      </td>
                      <td className="td font-bold">
                            {currency.format(discountPrice(item.price,item.discount)* item.quantity,{code:"USD"})}
                      </td>
                      <td className="td">
                                <span> <BsTrash className="text-rose-600 cursor-pointer" size={20} onClick={()=>deleteCard(item._id)}/></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bg-indigo-50 p-4 flex justify-end mt-5 rounded-md">
                <div>
                    <span className="text-lg font-semibold text-indigo-800 mr-10" >{currency.format(total,{code:"USD"}) }</span>
                    <button to="/" className="btn bg-indigo-600 text-sm font-medium py-2.5" onClick={pay}>{response?.isLoading ? 'Loading...':'checkout'}</button>
                </div>
          </div>
          </>
        ) : (
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-md text-sm font-medium text-indigo-800 capitalize">empty  is card!</div>
        )}
      </motion.div>
    </>
  );
};

export default Cart;
