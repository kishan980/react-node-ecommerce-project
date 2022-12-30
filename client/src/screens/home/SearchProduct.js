import React from "react";
import Nav from "../../components/home/Nav";
import { useParams } from "react-router-dom";
import Header from "./../../components/home/Header";
import { useSearchProductQuery } from "../../store/service/homeProducts";
import ProductCart from "./../../components/home/ProductCart";
import Pagination from "../../components/Pagination";
import ProductSkeleton from "../../components/home/ProductSkeleton";

const SearchProduct = () => {
  const { keyword, page = 1 } = useParams();
  const { data, isFetching } = useSearchProductQuery({
    keyword,
    page: parseInt(page),
  });
  return (
    <>
      <Nav />
      <div className="mt-[0px]">
        <Header>#{keyword}</Header>
      </div>

      <div className="my-container my-10">
        {isFetching ? (
          <ProductSkeleton/>
        ) : data.count > 0 ? (
          <>
            <p className="text-base font-medium text-gray-700">
              {data.count} product found in #{keyword} category
            </p>
            <div className="flex flex-wrap -mx-5">
              {data.products.map((product) => {
                return <ProductCart product={product} key={product._id}  />;
              })}
              </div>
            
              <Pagination
              page={parseInt(page)}
              parPage={data.parPage}
              count={data.count}
              path={`cat-products/${keyword}`}
              theme="light"
            />
             
          </>
        ) : (
          <div className="alert-danger">
            No product found is ${keyword} category
          </div>
        )}
      </div>
    </>
  );
};

export default SearchProduct;
