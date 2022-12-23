import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productService = createApi({
  reducerPath: "products",
  tagTypes: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/product/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.adminToken;
      headers.set("authorization", token ? `Bearer${token}` : "");
      return headers;
    },
  }),

  endpoints: (builder) => {
    return {
      createProduct: builder.mutation({
        query: (data) => {
          return {
            url: "create-product",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),

      getProducts: builder.query({
        query: (page) => {
          return {
            url: `products/${page}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      getProduct: builder.query({
        query: id => {
          return {
            url: `pro/${id}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      updateProduct: builder.mutation({
        query:(data)=>{
          return{
            url:"update-product",
            method:"PUT",
            body:data
          }
        },
        invalidatesTags: ["products"],
      }),
      deleteProduct: builder.mutation({
        query: (id)=>{
          return {
            url:`delete-product/${id}`,
            method:"DELETE"
          }
        },
        invalidatesTags: ["products"],
      })
    };
  },
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productService;
export default productService;
