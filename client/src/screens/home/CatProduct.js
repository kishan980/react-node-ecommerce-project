import React from "react";
import Nav from "../../components/home/Nav";
import { useParams } from "react-router-dom";
import Header from "./../../components/home/Header";
import { useCategoryProductsQuery } from "../../store/service/homeProducts";
import Skeleton from "./../../components/home/skeleton/Skeleton";
import Thumbnail from "./../../components/home/skeleton/Thumbnail";
import Text from "../../components/home/skeleton/Text";
import ProductCart from "./../../components/home/ProductCart";
import Pagination from "../../components/Pagination";

const CatProduct = () => {
  const { name, page = 1 } = useParams();
  const { data, isFetching } = useCategoryProductsQuery({
    name,
    page: parseInt(page),
  });
  return (
    <>
      <Nav />
      <div className="mt-[0px]">
        <Header>#{name}</Header>
      </div>

      <div className="my-container my-10">
        {isFetching ? (
          <div className="flex flex-wrap -mx-4 mb-10">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                className="w-6/12 sm:w-4/12 md:w-3/12 lg:w-[20%]  xl:w-2/12 p-4 "
                key={item}
              >
                <Skeleton>
                  <Thumbnail height="320px" />
                  <Text mt="10px" />
                  <Text mt="10px" />
                </Skeleton>
              </div>
            ))}
          </div>
        ) : data.count > 0 ? (
          <>
            <p className="text-base font-medium text-gray-700">
              {data.count} product found in #{name} category
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
              path={`cat-products/${name}`}
              theme="light"
            />
             
          </>
        ) : (
          <div className="alert-danger">
            No product found is ${name} category
          </div>
        )}
      </div>
    </>
  );
};

export default CatProduct;
