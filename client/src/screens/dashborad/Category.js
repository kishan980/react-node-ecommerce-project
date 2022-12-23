import React, { useEffect } from "react";
import Wrapper from "./Wrapper";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ScreenHeader from "./../../components/ScreenHeader";
import { clearMessage, setSuccess } from "../../store/reducer/globalReducer";
import { useGetQuery,useDeleteCategoryMutation } from "../../store/service/categoryService";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
const Category = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const { data = [], isFetching } = useGetQuery(page);
  const [removeCategory , response] = useDeleteCategoryMutation()
  const deleteCategory = (id)=>{
    if(window.confirm(`Are you really want to delete the category?`)){
      removeCategory(id)
    }
  }

  useEffect(() =>{
      if(response?.isSuccess){
        dispatch(setSuccess(response?.data?.deleteCategory))
      }
  }, [response?.data?.deleteCategory])

  useEffect(() => {
    return () => {
      dispatch(clearMessage);
    };
  }, []);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-category" className="btn-dark">
          add category<i className="bi bi-plus"></i>
        </Link>
      </ScreenHeader>
      {success && <div className="alert-success"> {success}</div>}
      {!isFetching ? (
        data?.categories?.length > 0 && (
          <>
            <div>
              <table className="w-full bg-gray-900 rounded-md ">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-3 capitalize text-sm font-normal text-gray-400">
                      Name
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
                  {data?.categories?.map((category) => (
                    <tr key={category._id} className="odd:bg-gray-800">
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {category.name}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <Link to={`/dashboard/update-category/${category._id}`} className="btn btn-warring">
                          Edit
                        </Link>
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <button className="btn btn-danger" onClick={()=> deleteCategory(category._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={parseInt(page)}
              parPage={data.parPage}
              count={data.count}
              path="dashboard/categories"
            />
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Category;
