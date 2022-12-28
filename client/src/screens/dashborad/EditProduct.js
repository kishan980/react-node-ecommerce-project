import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TwitterPicker } from "react-color";
import ReactQuill from "react-quill";
import toast, { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import Wrapper from "./Wrapper";
import ScreenHeader from "./../../components/ScreenHeader";
import { useAllCategoryQuery } from "../../store/service/categoryService";
import Spinner from "./../../components/Spinner";
import { v4 as uuidv4 } from "uuid";
import Colors from "./../../components/Colors";
import SizeList from "./../../components/SizeList";
import parser from "html-react-parser";
import {
  useGetProductQuery,
  useUpdateProductMutation
} from "../../store/service/productService";
import { setSuccess } from "../../store/reducer/globalReducer";
const EditProduct = () => {
  const { id } = useParams();
  const { data: product, isFetching: fetching } = useGetProductQuery(id);
  const { data = [], isFetching } = useAllCategoryQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [state, setState] = useState({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    category: "",
    colors: [],
  });

  const [sizes] = useState([
    { name: "xsm" },
    { name: "sm" },
    { name: "md" },
    { name: "lg" },
    { name: "xl" },
    { name: "1 year" },
    { name: "2 year" },
    { name: "3 year" },
    { name: "4 year" },
    { name: "5 year" },
  ]);

  const [sizeList, setSizeList] = useState([]);
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const saveColors = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.hex);
    setState({
      ...state,
      colors: [...filtered, { color: color.hex, id: uuidv4() }],
    });
  };
  const deleteColor = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.color);
    setState({ ...state, colors: filtered });
  };

  const chooseSize = (ObjName) => {
    const sizeFilter = sizeList.filter((size) => size.name !== ObjName.name);
    setSizeList([...sizeFilter, ObjName]);
  };

  const deleteSize = (name) => {
    const deleteData = sizeList.filter((size) => size.name !== name);
    setSizeList(deleteData);
  };

  const [updateProduct, response] = useUpdateProductMutation();
  const createProduct = (e) => {
    e.preventDefault();
   updateProduct(state);
  };

  useEffect(() => {
    if (!response?.isSuccess) {
      response?.error?.data?.errors?.map((err) => {
        toast.error(err.msg);
      });
    }
  }, [response?.error?.data?.errors]);

  useEffect(() => {
   
    if (response?.error?.status === 500) {
      toast.error(response?.error?.data?.msg);
    }
  }, [response?.error?.status]);

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
      navigate("/dashboard/products");
    }
  });

useEffect(() =>{
    setState({...state, description:value})
},[value])

  useEffect(() => {
    if (!fetching) {
      setState(product);
      setSizeList(product.sizes);
      setValue(parser(product.description))
    }
  }, [product]);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/products" className="btn btn-dark">
          <i className="bi bi-arrow-left-short"></i>Product List
        </Link>
        <Toaster position="top=right" reverseOrder={true} />
      </ScreenHeader>

      {!fetching ?<div className="flex flex-wrap -mx-3">
      <form className="w-full xl:w-8/12 p-3" onSubmit={createProduct}>
      <h3 className="pl-3 capitalize text-lg font-medium text-gray-400 ">edit product</h3>
        <div className="flex flex-wrap">
          <div className="w-full md:w-6/12 p-3">
            <label htmlFor="title" className="label">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              placeholder="title..."
              onChange={handleInput}
              value={state.title}
            />
          </div>

          <div className="w-full md:w-6/12 p-3">
            <label htmlFor="price" className="label">
              Price
            </label>
            <input
              type="number"
              name="price"
              className="form-control"
              id="price"
              placeholder="price..."
              onChange={handleInput}
              value={state.price}
            />
          </div>

          <div className="w-full md:w-6/12 p-3">
            <label htmlFor="discount" className="label">
              Discount
            </label>
            <input
              type="discount"
              name="discount"
              className="form-control"
              id="discount"
              placeholder="discount..."
              onChange={handleInput}
              value={state.discount}
            />
          </div>
          <div className="w-full md:w-6/12 p-3">
            <label htmlFor="stock" className="label">
              Stock
            </label>
            <input
              type="stock"
              name="stock"
              className="form-control"
              id="stock"
              placeholder="stock..."
              onChange={handleInput}
              value={state.stock}
            />
          </div>
          <div className="w-full md:w-6/12 p-3">
            <label htmlFor="categories" className="label">
              categories
            </label>
            {!isFetching ? (
              data?.categories.length > 0 && (
                <select
                  name="category"
                  id="categories"
                  className="form-control"
                  onChange={handleInput}
                >
                  <option value="">Choose categories</option>

                  {data?.categories?.map((category) => (
                    <option value={category.name} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )
            ) : (
              <Spinner />
            )}
          </div>

          <div className="w-full md:w-6/12 p-3">
            <label htmlFor="colors" className="label">
              Choose Color
            </label>
            <TwitterPicker onChangeComplete={saveColors} />
          </div>
          <div className="w-full  p-3">
            <label htmlFor="sizes" className="label">
              choose size
            </label>
            {sizes.length > 0 && (
              <div className="flex flex-wrap -mx-3">
                {sizes.map((size) => (
                  <div
                    key={size.name}
                    className="size"
                    onClick={() => chooseSize(size)}
                  >
                    {size.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full p-3">
            <label htmlFor="description" className="label">
              Description
            </label>
            <ReactQuill
              theme="snow"
              id="description"
              value={value}
              onChange={setValue}
              placeholder="Description..."
              className="placeholder:text-white"
            />
          </div>
          <div className="w-full p-3">
            <input
              type="submit"
              value={response.isLoading ? "loading..." : "update product"}
              disabled={response.isLoading ? true : false}
              className="btn btn-indigo"
            />
          </div>
        </div>
      </form>

      <div className="w-full xl:w-4/12 p-3">
        <Colors colors={state.colors} deleteColor={deleteColor} />
        <SizeList list={sizeList} deleteSize={deleteSize} />
      </div>
    </div>:<Spinner/>}
    </Wrapper>
  );
};

export default EditProduct;
