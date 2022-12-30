import React from 'react'
import { Link } from 'react-router-dom';
import { useCategoryProductsQuery } from '../../store/service/homeProducts'
import ProductCart from './ProductCart';
import ProductSkeleton from './ProductSkeleton';
export const HomeProduct = ({category}) => {
    const { data, isFetching} = useCategoryProductsQuery({
        name:category.name,
        page:''
    })

   return (
        isFetching ? <ProductSkeleton/> : data?.products?.length >0 && (
            <>
                <div className='flex justify-between'>
                
                    <span className='text-lg font-medium capitalize'>{category.name}</span>
                    <span className='capitalize'><Link to={`/cat-products/${category.name}`}>see all </Link></span>
                </div>
                <div className='flex flex-wrap -mx-5'>
                
                    {
                        data?.products.map((item) =>(
                            <ProductCart product={item} key={item._id}/>
                        ))
                    }
                </div>
            </>
        )
  )
}
