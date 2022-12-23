import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryService = createApi({
  reducerPath: "category",
  tagType: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/category/",
    prepareHeaders: (headers, { getState }) => {
      // getState() ayay hai state key under se? state.getState()
      const reducers = getState();
      const token = reducers?.authReducer?.adminToken;
      headers.set("authorization", token ? `Bearer${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      createCategory: builder.mutation({
        query: (name) => {
          return {
            url: "category-create",
            method: "POST",
            body: name,
          };
        },
        invalidatesTags: ["categories"],
      }),
      updateCategory: builder.mutation({
        query: (data) => {
          return {
            url: `update-category/${data.id}`,
            method: "PUT",
            body: { name: data.name },
          };
        },
        invalidatesTags: ["categories"],
      }),
      deleteCategory: builder.mutation({
        query: (id) => {
          return {
            url: `/delete-category/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["categories"],
      }),
      get: builder.query({
        query: (page) => {
          return {
            url: `categories/${page}`,
            method: `GET`,
          };
        },
        provideTags: ["categories"],
      }),
      fetchCategory: builder.query({
        query: (id) => {
          return {
            url: `fetch-category/${id}`,
            method: "GET",
          };
        },
        provideTags: ["categories"],
      }),

      allCategory: builder.query({
        query: ()=>{
          return{
            url:'allCategories',
            method:"GET"
          }
        }
      })
    };
  },
});

export const {
  useCreateCategoryMutation,
  useGetQuery,
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAllCategoryQuery
} = categoryService;
export default categoryService;
