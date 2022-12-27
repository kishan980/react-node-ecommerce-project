import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authService = createApi({

    reducerPath:'auth',
    tagType: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:4000/api/user/'
    }),
    endpoints:(builder)=>{
        return {
            authLogin: builder.mutation({
                query:(loginData)=>{
                    return {
                        url:'login',
                        method:'POST',
                        body:loginData
                    }
                }
            }),
            userRegister: builder.mutation({
                query:(data) =>{
                    return {
                        url:"register/",
                        method:"POST",
                        body:data
                    }
                },
                invalidatesTags: ["auth"],
            }),
            userLogin: builder.mutation({
                query:(data) =>{
                    return {
                        url:"login",
                        method:"POST",
                        body:data
                    }
                }
            })
        }
    }
})

export const {useAuthLoginMutation, useUserRegisterMutation,useUserLoginMutation} = authService
export default authService;