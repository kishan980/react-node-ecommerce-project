import AccountList from "../../components/home/AccountList";
import { useNavigate } from "react-router-dom";
import Header from "../../components/home/Header";
import Nav from "../../components/home/Nav";
import { useParams } from "react-router-dom";
import { useGetOrdersDetailsQuery } from "../../store/service/userOrderService";
import Spinner from "./../../components/Spinner";
import { discountPrice } from "./../../utils/discountPrice";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import currency from "currency-formatter";
import moment from "moment";
import ReviewForm from "./../../components/ReviewForm";
import { useState } from "react";
const UserOrderDetails = () => {
  const [stateData, setState] = useState(false);
  const toggledReview = () => {
    setState(!stateData);
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching } = useGetOrdersDetailsQuery(id);
  return (
    <>
      <Nav />
      <ReviewForm stateData={stateData} data={data} toggledReview={toggledReview} />
      <div className="mt-[70px]">
        <Header>Order details</Header>
        <div className="my-container mt-[40px]">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full md:w-4/12 p-6">
              <AccountList />
            </div>
            <div className="w-full md:w-8/12 p-6">
              <h1 className="heading flex items-center">
                <MdOutlineKeyboardBackspace
                  onClick={() => navigate(-1)}
                  className="cursor-pointer text-gray-500"
                />
                <span className="ml-5 text-gray-500">details</span>
              </h1>
              {!isFetching ? (
                <div className="flex flex-col md:flex-row flex-wrap mt-2">
                  <div className="w-[130px] md:w-[160px] h-[130px] md:h-[160px] overflow-hidden">
                    <img
                      src={`/images/${data?.details?.productId?.image1}`}
                      alt=""
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1  my-4 md:ml-4">
                    <div className="flex">
                      <h4 className="capitalize text-base font-normal">
                        order number
                      </h4>

                      <span className="ml-2 font-medium text-gray-900">
                        {data?.details?._id}
                      </span>
                    </div>

                    <div className="flex">
                      <h4 className="capitalize text-base font-normal">
                        product name
                      </h4>

                      <span className="ml-2 font-medium text-gray-900 capitalize">
                        {data?.details?.productId?.title}
                      </span>
                    </div>
                    <div className="flex">
                      <h4 className="capitalize text-base font-normal">
                        received
                      </h4>

                      <span className="ml-2 font-medium text-gray-900 capitalize">
                        {data?.details?.received ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <h4 className="capitalize text-base font-normal">
                        Order Date
                      </h4>

                      <span className="ml-2 font-medium text-gray-900 capitalize">
                        {moment(data?.details?.createdAt).format(
                          "MMMM Do YYYY"
                        )}
                      </span>
                    </div>
                    {data?.details?.received && (
                      <div className="flex">
                        <h4 className="capitalize text-base font-normal">
                          received Date
                        </h4>

                        <span className="ml-2 font-medium text-gray-900 capitalize">
                          {moment(data?.details?.updatedAt).format(
                            "MMMM Do YYYY"
                          )}
                        </span>
                      </div>
                    )}
                    {data?.details?.received && !data?.details.review && (
                      <div className="flex items-center">
                        <h4 className="capitalize text-base font-normal text-gray-600 mr-5">
                          add review
                        </h4>

                        <button
                          className="btn-indigo rounded py-2 px-5"
                          onClick={() => toggledReview()}
                        >
                          Add review
                        </button>
                      </div>
                    )}

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="thead-tr">
                            <th className="th">color</th>
                            <th className="th">size</th>
                            <th className="th">price</th>
                            <th className="th">quantity</th>
                            <th className="th">total</th>
                            <th className="th">deliver</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className="even:bg-gray-50">
                            <td className="td">
                              <span
                                className="block w-[15px] h-[15px] rounded-full"
                                style={{
                                  backgroundColor: data?.details?.color,
                                }}
                              ></span>
                            </td>
                            <td className="td">{data?.details?.size}</td>
                            <td className="td">{data?.details?.size}</td>
                            <td className="td">
                              {currency.format(
                                discountPrice(
                                  data?.details?.productId?.price,
                                  data?.details?.productId?.discount
                                ),
                                { code: "USD" }
                              )}
                            </td>
                            <td className="td">
                              {currency.format(
                                discountPrice(
                                  data?.details.productId?.price,
                                  data?.details?.productId?.discount
                                ) * data?.details?.quantity,
                                { code: "USD" }
                              )}
                            </td>
                            <td className="td">
                              {data?.details?.status ? "Yes" : "No"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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

export default UserOrderDetails;
