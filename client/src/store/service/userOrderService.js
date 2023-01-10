import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userOrderService = createApi({
  reducerPath: "userOderService",
  tagTypes: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/order/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.adminToken;
      headers.set("authorization", token ? `Bearer${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getOrders: builder.query({
        query: (data) => {
          return {
            url: `orders?page=${data.page}&userId=${data.userId}`,
            method: "GET",
          };
        },
        providesTags: ["orders"],
      }),
      getOrdersDetails: builder.query({
        query: (id) => {
          return {
            url: `orders-details/${id}`,
            method: "GET",
          };
        },
        providesTags: ["orders"],
      }),
      receivedOrder: builder.mutation({
        query: (id) => {
          return {
            url: `orders-deliver?id=${id}&status=received`,
            method: "PUT",
          };
        },
        invalidatesTags: ["orders"],
      }),
    };
  },
});

export const {
  useGetOrdersQuery,
  useGetOrdersDetailsQuery,
  useReceivedOrderMutation,
} = userOrderService;
export default userOrderService;
