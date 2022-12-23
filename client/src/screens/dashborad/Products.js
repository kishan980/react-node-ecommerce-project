import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../store/reducer/globalReducer";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Wrapper from "./Wrapper";
import { useGetProductsQuery ,useDeleteProductMutation } from "../../store/service/productService";
import ScreenHeader from "./../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Pagination from "./../../components/Pagination";

const Products = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { data = [], isFetching } = useGetProductsQuery(page);

  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    return () => {
      dispatch(clearMessage);
    };
  }, []);
  const [deleteProductData, response] =useDeleteProductMutation()
  const deleteProduct =(id)=>{
    if(window.confirm("Are you sure delete a records")){
        deleteProductData(id)
    }
  }
  return (
    <>
      <Wrapper>
        <ScreenHeader>
          <Link to="/dashboard/create-product" className="btn-dark">
            <i className="bi bi-plus"></i>Create Products
          </Link>
          <Toaster position="top-right" reverseOrder={true} />
        </ScreenHeader>
        {!isFetching ? (
          data?.products?.length > 0 ? (
            <div>
              <table className="w-full bg-gray-900 rounded-md ">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-3 capitalize text-sm font-normal text-gray-400">
                      Name
                    </th>
                    <th className="p-3 capitalize text-sm font-normal text-gray-400">
                      Price
                    </th>
                    <th className="p-3 capitalize text-sm font-normal text-gray-400">
                      Stock
                    </th>
                    <th className="p-3 capitalize text-sm font-normal text-gray-400">
                      Image
                    </th>
          
                    <th className="p-3 capitalize text-sm font-normal text-gray-400">
                      Edit
                    </th>
                    <th className="p-3 capitalize text-sm font-normal text-gray-400">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products?.map((product) => (
                    <tr key={product._id} className="odd:bg-gray-800">
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {product.title}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {product.price}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {product.stock}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <img
                          src={`/images/${product.image1}`}
                          alt="not found imag"
                          className="w-20 h-20 rounded-md object-cover"
                        />
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <Link
                          to={`/dashboard/edit-product/${product._id}`}
                          className="btn btn-warring"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <button className="btn btn-danger"><span className="bant btn-danger cursor-pointer" onClick={() => deleteProduct(product._id)} >Delete</span></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                page={parseInt(page)}
                parPage={data.parPage}
                count={data.count}
                path="dashboard/products"
              />
            </div>
          ) : (
            "no products"
          )
        ) : (
          <Spinner />
        )}
      </Wrapper>
    </>
  );
};

export default Products;
