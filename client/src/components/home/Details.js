import React, { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import currency from "currency-formatter";
import h2p from "html2plaintext";
import htmlToFormattedText from "html-to-formatted-text";
import DetailsCard from "./DetailsCard";
import parse from "html-react-parser";
import Quantity from "./Quantity";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { addCart } from "../../store/reducer/cartReducer";
import  {discountPrice}  from './../../utils/discountPrice';

const Details = ({ product }) => {
  const [sizeState, setSizeState] = useState(
    product?.sizes?.length > 0 && product.sizes[0].name
  );
  const [colorState, setColorState] = useState(
    product?.colors?.length > 0 && product.colors[0].color
  );

  const [quantity, setQuantity] = useState(1);
  // const percentage = product.discount / 100;
  // const discountPrice = product.price - product.price * percentage;
 
  let desc = h2p(product.description);
  desc = parse(desc);
  const dispatch = useDispatch()
  const inCrement = () => {
    setQuantity(quantity + 1);
  };
  const deCerement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const discountPriceData = discountPrice(product.price, product.discount)
  
  const addToCart = () => {
    const {
      ["colors"]: colors,
      ["sizes"]: sizes,
      ["createdAt"]: createdAt,
      ["updatedAt"]: updatedAt,
      ...newProduct
    } = product;
    
    
    newProduct['size'] = sizeState;
    newProduct['color']=colorState;
    newProduct["quantity"]=quantity
    const cart = localStorage.getItem("cart")
    const cartItem = cart ? JSON.parse(cart) :[];
    const checkItem =  cartItem.find(items => items._id === newProduct._id)
    if(!checkItem){
      dispatch(addCart(newProduct))
      cartItem.push(newProduct)
      localStorage.setItem('cart', JSON.stringify(cartItem))
    }else {
      toast.error(`${newProduct.title} is already in cart`);
       return
    }

  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap -mx-5"
    >
    <Toaster/>
      <div className="w-full order-2 md:order-1 md:w-6/12">
        <div className="flex flex-wrap -mx-1">
          <DetailsCard image={product.image1} />
          <DetailsCard image={product.image2} />
          <DetailsCard image={product.image3} />
        </div>
      </div>
      <div className="w-full order-1  md:order-2 md:w-6/12 p-5">
        <h1 className="text-2xl font-bold text-gray-900 capitalize ">
          {product.title}
        </h1>
        <div className="flex justify-between my-5">
          <span className="text-2xl font-bold text-gray-900">
            {currency.format(discountPriceData, { code: "USD" })}
          </span>
          <span className="text-xl line-through text-gray-900">
            {currency.format(product.price, { code: "USD" })}
          </span>
        </div>

        {product.sizes.length > 0 && (
          <>
            <h3 className="text-base font-medium capitalize text-gray-600 mb-3">
              sizes
            </h3>
            <div className="flex flex-wrap -mx-1">
              {product.sizes.map((size) => (
                <div
                  className={`p-2 border m-1 border-gray-300 rounded cursor-pointer ${
                    sizeState === size.name && "bg-indigo-600"
                  }`}
                  key={size.name}
                  onClick={() => setSizeState(size.name)}
                >
                  <span
                    className={`text-sm font-semibold uppercase text-gray-900 ${
                      sizeState === size.name ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {size.name}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {product.colors.length > 0 && (
          <>
            <h3 className="text-base font-medium text-gray-600 mb-2 mt-3 capitalize">
              colors
            </h3>
            <div className="flex flex-wrap -mx-1">
              {product.colors.map((color) => (
                <div
                  key={color.color}
                  className="border border-gray-300 rounded m-1 p-1 cursor-pointer"
                  onClick={() => setColorState(color.color)}
                >
                  <span
                    className="min-w-[40px] min-h-[40px] rounded flex items-center justify-center"
                    style={{ backgroundColor: color.color }}
                  >
                    {colorState === color.color && (
                      <BsCheck2 className="text-white" size={40} />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex -mx-3 items-center">
          <div className="w-full sm:w-6/12 p-3">
            <Quantity
              quantity={quantity}
              inCrement={inCrement}
              deCerement={deCerement}
            />
          </div>
          <div className="flex sm:w-6/12 p-3">
            <button className="btn btn-indigo" onClick={addToCart}>
              add to cart
            </button>
          </div>
        </div>

        <h3 className="text-base font-medium text-gray-600 mb-2 mt-3 capitalize">
          description
        </h3>
        <p className="mt-4 leading-[27px] description">{desc}</p>
      </div>
    </motion.div>
  );
};

export default Details;
