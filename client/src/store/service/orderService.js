import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const orderService = createApi({

    reducerPath:'orders',
    tagTypes:"orders",
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:4000/api/order/',
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            headers.set("authorization", token ? `Bearer${token}` : "");
            return headers;
          },
    }),
    endpoints:(builder)=>{
        return {
         
                getOrders: builder.query({
                    query: page =>{
                        return {
                            url:`orders?page=${page}`,
                            method:"GET"
                        }
                    },
                    providesTags:['orders']
                }),
                getOrdersDetails: builder.query({
                    query: id =>{
                        return {
                            url:`orders-details/${id}`,
                            method:"GET"
                        }
                    },
                    providesTags:['orders']
                }),
                deliverOrder: builder.mutation({
                    query: id =>{
                        return {
                            url:`orders-deliver?id=${id}&status=delivered`,
                            method:"PUT"
                        }
                    },
                    invalidatesTags:['orders']
                }),
                postReview: builder.mutation({
                    query: (data)=>{
                        return {
                            url:`/add-review`,
                            method:"POST",
                            body:data
                        }
                    },
                    invalidatesTags:['orders']
                })
        }
    }
})

export const {useGetOrdersQuery, useGetOrdersDetailsQuery, useDeliverOrderMutation, usePostReviewMutation } = orderService
export default orderService;