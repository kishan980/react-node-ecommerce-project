import React from "react";
import { useParams } from "react-router-dom";
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { useGetOrdersQuery } from "../../store/service/orderService";
import Spinner from "./../../components/Spinner";
import Pagination from "./../../components/Pagination";
import { Link } from "react-router-dom";

const Orders = () => {
  let { page } = useParams();
  page = page ? page : 1;
  const { data, isFetching } = useGetOrdersQuery(page);

  return (
    <Wrapper>
      <ScreenHeader>order</ScreenHeader>
      {!isFetching ? (
        data?.orders?.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="dashboard-table ">
                <thead>
                  <tr className="dashboard-tr">
                    <th className="dashboard-th">title</th>
                    <th className="dashboard-th">quantity</th>
                    <th className="dashboard-th">image</th>
                    <th className="dashboard-th">received</th>
                    <th className="dashboard-th">delivered</th>
                    <th className="dashboard-th">details</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orders?.map((order) => (
                    <tr key={order._id} className="dashboard-tbody">
                      <td className="dashboard-td">
                        {order?.productId?.title}
                      </td>
                      <td className="dashboard-td">{order?.quantity}</td>
                      <td className="dashboard-td">
                        <img
                          src={`/images/${order.productId.image1}`}
                          alt={order.productId.image1}
                          className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-full object-cover"
                        />
                      </td>
                     
                      <td className="dashboard-td">
                        {order?.received ? "Yes" : "No"}
                      </td>
                      <td className="dashboard-td">
                      {order?.status ? "yes" : "no"}
                    </td>
                      <td className="dashboard-td">
                        <Link
                          to={`/dashboard/order-details/${order._id}`}
                          className="btn btn-warning bg-indigo-600 text-xs font-bold"
                        >
                          details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={parseInt(page)}
              parPage={data.parPage}
              count={data.count}
              path="dashboard/orders"
            />
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Orders;
