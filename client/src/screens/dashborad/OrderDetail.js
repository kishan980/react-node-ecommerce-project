import React from "react";
import { Link, useParams } from "react-router-dom";
import Wrapper from "./Wrapper";
import currency from "currency-formatter";
import ScreenHeader from "./../../components/ScreenHeader";
import { MdOutlineArrowBack } from "react-icons/md";
import { useGetOrdersDetailsQuery } from "../../store/service/orderService";
import { discountPrice } from "./../../utils/discountPrice";
import Spinner from "./../../components/Spinner";
const OrderDetail = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetOrdersDetailsQuery(id);
  const total =
    discountPrice(
      data?.details?.productId?.price,
      data?.details?.productId?.discount
    ) * data?.details?.quantity;

  return (
    <Wrapper>
      {!isFetching ? (
        <>
          <ScreenHeader>
            <div className="flex items-center">
              <Link to="/dashboard/orders">
                <MdOutlineArrowBack />
              </Link>
              <span className="ml-4">Order Details</span>
            </div>
          </ScreenHeader>

          <h3 className="capitalize text-gray-400">
            Order number{" "}
            <span className="text-lg text-gray-300 ml-4">
              #{data?.details?._id}
            </span>
          </h3>
          <div className="flex flex-wrap">
            <div className="w-full md:w-8/12 p-5">
              <div className="">
                <table className="dashboard-table">
                  <thead className="">
                    <tr className="dashboard-tr">
                      <th className="dashboard-th">image</th>
                      <th className="dashboard-th">quantity</th>
                      <th className="dashboard-th">price</th>
                      <th className="dashboard-th">total</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="dashboard-td">
                        <img
                          src={`/images/${data?.details?.productId?.image1}`}
                          alt={`/images/${data?.details?.productId?.image1}`}
                          className="w-[50xp] h-[50px] rounded-full object-cover"
                        />
                      </td>
                      <td className="dashboard-td">
                        {data?.details?.quantity}
                      </td>
                      <td className="dashboard-td">
                        {" "}
                        {currency.format(
                          discountPrice(
                            data?.details?.productId?.price,
                            data?.details?.productId?.discount
                          ),
                          { code: "USD" }
                        )}
                      </td>

                      <td className="dashboard-td">
                        {" "}
                        {currency.format(total, { code: "USD" })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full md:w-4/12 p-5">
              <div className="bg-gray-900 p-4 rounded-md">
                <div className="border-b pb-3 border-b-gray-600">
                  <h4 className="capitalize text-base text-gray-500">
                    customer name
                  </h4>
                  <span className="text-gray-400 text-base font-medium capitalize mt-2">
                    {data?.details?.userId?.name}
                  </span>
                </div>
              </div>
              <div>
                <h4 className="capitalize text-base text-gray-500">
                  Order date
                </h4>
                <span> {}</span>
              </div>
              <div>
                <h4 className="capitalize text-base text-gray-500 mt-2">
                  {" "}
                  shipping address
                </h4>
                <div className="mt-2">
                  <span className="capitalize text-gray-400 block">
                    {data?.details?.address?.city}
                  </span>
                  <span className="capitalize text-gray-400 block">
                    {data?.details?.address?.line1}
                  </span>

                  <span className="capitalize text-gray-400 block">
                    {data?.details?.address?.line2}
                  </span>

                  <span className="capitalize text-gray-400 block">
                    {data?.details?.address?.postal_code}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default OrderDetail;
