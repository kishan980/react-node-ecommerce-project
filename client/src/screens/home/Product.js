import React from "react";
import { Link } from "react-router-dom";
import Nav from "./../../components/home/Nav";
import { FiChevronRight } from "react-icons/fi";
import { useGetProductQuery } from "../../store/service/productService";
import { useParams } from "react-router-dom";
import Details from "../../components/home/Details";
const Product = () => {
  const { name } = useParams();
  console.log("🚀 ~ file: Product.js:9 ~ Product ~ name", name);
  const { data, isFetching } = useGetProductQuery(name);
  console.log("🚀 ~ file: Product.js:10 ~ Product ~ data", data);
  return (
    <>
      <Nav />

      <div className="my-container mt-[20px]">
        {isFetching ? (
          "loading"
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
       <div className="flex flex-wrap">
       {
        data.length > 0 && <Details product={data}/>
       }
       </div>
         </>
        )}
      </div>
    </>
  );
};

export default Product;
