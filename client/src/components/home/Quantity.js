import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Quantity = ({quantity,inCrement ,deCerement}) => {
  console.log("🚀 ~ file: Quantity.js:4 ~ Quantity ~ inCrement", quantity)
  return (
    <div className="flex last:border-r last:rounded-tr-lg last:rounded-br-lg first:rounded-tl-lg first:rounded-bl-lg overflow-hidden" >
      <span className="flex border p-4 border-r-0 cursor-pointer hover:bg-indigo-500 hover:text-white transition-all" onClick={deCerement}>
        <AiOutlineMinus />{" "}
      </span>
      <span className="flex-1 border flex items-center justify-center font-medium border-r-0">
        {" "}
       {quantity}
      </span>
      <span className="flex border p-4 border-r-0 cursor-pointer hover:bg-indigo-500 hover:text-white transition-all" onClick={inCrement}>
        <AiOutlinePlus />{" "}
      </span>
    </div>
  );
};

export default Quantity;
