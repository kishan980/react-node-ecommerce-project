import AccountList from "../../components/home/AccountList";
import Header from "../../components/home/Header";
import Nav from "../../components/home/Nav";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetOrdersQuery,
  useReceivedOrderMutation,
} from "../../store/service/userOrderService";
import Spinner from "../../components/Spinner";
import currency from "currency-formatter";
import { discountPrice } from "./../../utils/discountPrice";
import Pagination from "./../../components/Pagination";
import ReviewForm from './../../components/ReviewForm';
const UserOrder = () => {
  let { page } = useParams();
  page = page ? page : 1;
  const { user } = useSelector((state) => state.authReducer);
  const { data, isFetching } = useGetOrdersQuery({ page, userId: user.id });
  const [updateOrder] = useReceivedOrderMutation();
  const orderReceived = (id) => {
    updateOrder(id);
  };
  return (
    <>
      <Nav />
   
      <div className="mt-[70px]">
        <Header>My orders</Header>
        <div className="my-container mt-[40px]">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full md:w-4/12 p-6">
              <AccountList />
            </div>
            <div className="w-full md:w-8/12 p-6">
              <h1 className="heading mb-6">orders</h1>

              {!isFetching ? (
                data?.orders?.length > 0 ? (
                  <>
                    <div className="table-container">
                      <table className="w-full">
                        <thead>
                          <tr className="thead-tr">
                            <th className="th">image</th>
                            <th className="th">name</th>
                            <th className="th"> total</th>
                            <th className="th"> details</th>
                            <th className="th">received</th>
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
                                <td className="td font-medium">
                                  {item?.productId?.title}
                                </td>
                                <td className="td font-bold">
                                  {currency.format(
                                    discountPrice(
                                      item?.productId?.price,
                                      item?.productId?.discount
                                    ) * item?.quantity,
                                    { code: "USD" }
                                  )}
                                </td>
                                <td className="td">
                                  <Link
                                    to={`/user-order-details/${item._id}`}
                                    className="btn btn-indigo"
                                  >
                                    details
                                  </Link>
                                </td>
                                <td className="td">
                                {
                                  item.status ? (
                                  item?.received ? (
                                    <span className="capitalize font-medium text-emerald-600">
                                    received
                                    </span>
                                  )

                                  :(
                                    <button
                                    className="btn btn-indigo"
                                    disabled={item.received ? true : false}
                                    onClick={() => orderReceived(item._id)}
                                  >
                                    received
                                  </button>
                                  )
                                  )
                                  :
                                  (
                                    <span className="capitalize font-medium text-rose-600">
                                      under-process
                                    </span>
                                  )
                                }
                                 
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
                ) : (
                 <div className="bg-indigo-50 border border-indigo-100 rounded px-4 py-2.5 capitalize text-indigo-900 text-sm font-medium">
                 no orders
                 </div>
                )
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrder;
