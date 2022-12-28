import React from 'react'
import Nav from "../../components/home/Nav";
import {useParams} from 'react-router-dom'
import Header from './../../components/home/Header';
import {useCategoryProductsQuery} from "../../store/service/homeProducts"
import Skeleton from './../../components/home/skeleton/Skeleton';
import Thumbnail from './../../components/home/skeleton/Thumbnail';
import Text from '../../components/home/skeleton/Text';
const CatProduct = () => {
  const {name, page=1} = useParams()
  const {data, isFetching} = useCategoryProductsQuery({name, page:parseInt(page)})
  return (
    <>
      <Nav/>
      <div className='mt-[70px]'>
        <Header>
        #{name}
        </Header>
      </div>

      <div className='my-container my-10'>
      {
        isFetching ?(
          <div className="flex flex-wrap -mx-4 mb-10">
          {[1,2,3,4,5,6].map(item=>(
              <div className="w-6/12 sm:w-4/12 md:w-3/12 lg:w-[20%]  xl:w-2/12 p-4 " key={item}>
                      <Skeleton>
                          <Thumbnail />
                          <Text mt="10px"/>
                          <Text mt="10px"/>
                      </Skeleton>
              </div>
          ))}
      </div>):"" 
      }
      </div>
    </>
  )
}

export default CatProduct