import { createSlice } from "@reduxjs/toolkit";
import { discountPrice } from './../../utils/discountPrice';
const cartData = localStorage.getItem("cart")
const cartArray = cartData ? JSON.parse(cartData):[]
function allItems(data){
        let items =0;
        for(let i=0; i< data.length;i++){
                items+= data[i].quantity;
        }
        return items
}
function calculateTotal(data){
    let total =0;
    for(let i=0; i<data.length; i++){
        total+= discountPrice(data[i].price, data[i].discount)* data[i].quantity
    }
    return total
}
const cartReducer = createSlice({
    name:"cart",
    initialState:{
        cart:cartArray? cartArray:[],
        items: cartArray.length>0 ? allItems(cartArray):0,
        total : cartArray.length>0 ? calculateTotal(cartArray):0
    },
    reducers:{
        addCart:(state, {payload}) =>{
            state.cart.push(payload)
            state.items += payload.quantity;
            state.total +=discountPrice(payload.price, payload.discount)* payload.quantity
        },
        inQuantity:(state, {payload}) =>{
            const find = state.cart.find((item) => item._id === payload)
            if(find){
                find.quantity+=1;
                state.items+=1;
                state.total+= discountPrice(find.price, find.discount)
                const index = state.cart.indexOf(find)
                state.cart[index] = find;
                localStorage.setItem('cart', JSON.stringify(state.cart))
            }
        },
        decQuantity:(state, {payload}) =>{
            const find = state.cart.find((item) => item._id === payload)
            if(find && find.quantity >1){
                find.quantity-=1;
                state.items-=1;
                state.total-= discountPrice(find.price, find.discount)
                const index = state.cart.indexOf(find)
                state.cart[index] = find;
                localStorage.setItem('cart', JSON.stringify(state.cart))
            }
        },
        removeCart:(state, {payload}) =>{
            const find = state.cart.find(item=> item._id === payload)
            if(find){
                    const index = state.cart.indexOf(find)
                    state.items-=find.quantity;
                    state.total-=discountPrice(find.price, find.discount)*find.quantity;
                    state.cart.splice(index,1)
                    localStorage.setItem("cart", JSON.stringify(state.cart))
            }
        },
        emptyCart: (state) =>{
            state.cart=[];
            state.items =0
            state.total=0
        }
    }
})

export  const  {addCart,inQuantity,decQuantity,removeCart,emptyCart} = cartReducer.actions;
export default cartReducer.reducer