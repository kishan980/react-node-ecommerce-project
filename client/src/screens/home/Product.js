import React from "react";
import { Link } from "react-router-dom";
import Nav from "./../../components/home/Nav";
import { FiChevronRight } from "react-icons/fi";
import { useGetProductQuery } from "../../store/service/productService";
import { useParams } from "react-router-dom";
import Details from "../../components/home/Details";
import ProductLoader from './../../components/home/ProductLoader';
const Product = () => {
  const { name } = useParams();
  const { data, isFetching } = useGetProductQuery(name);
  return (
    <>
      <Nav />

      <div className="my-container mt-[20px]">
        {isFetching ? (
          <ProductLoader/>
        ) : (
         <>
         <ul className="flex items-center">
         <li className="capitalize text-gray-600">
           <Link to="/">Home</Link>
         </li>
         <FiChevronRight className="block mx-2" />
         <li className="capitalize text-gray-600">
           <Link to={`/cat-products/${data.category}`}>{data.category}</Link>
         </li>
         <li className="capitalize text-gray-600">
           <Link to={`/product/${data.title}`}>{data.title}</Link>
         </li>
         <FiChevronRight  className="block mx-2"/>
       </ul>
       <Details product={data}/>
         </>
        )}
      </div>
    </>
  );
};

export default Product;
