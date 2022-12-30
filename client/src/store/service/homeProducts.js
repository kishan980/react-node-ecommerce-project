import { createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const homeProductsService = createApi({
    reducerPath:"homeProducts",
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:4000/api/product/',
        }),
        endpoints: (builder) =>{
            return {
                categoryProducts:builder.query({
                    query:(params)=>{
                        return {
                            url:`cat-products/${params.name}/${params.page}`,
                            method:"GET"
                        }
                    }
                }),
                searchProduct:builder.query({
                    query:(params)=>{
                        return {
                            url:`search-products/${params.keyword}/${params.page}`,
                            method:"GET"
                        }
                    }
                })
            }
        }
})

export const {useCategoryProductsQuery, useSearchProductQuery} = homeProductsService
export default homeProductsService