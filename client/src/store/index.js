import { configureStore, } from "@reduxjs/toolkit";
import authService from "./service/authService";
import authReducer from "./reducer/authReducer";
import categoryService from "./service/categoryService";
import globalReducer from "./reducer/globalReducer";
import productService from "./service/productService";
import homeProductsService from "./service/homeProducts";
import cartReducer from "./reducer/cartReducer";
import paymentService from "./service/paymentService";
import orderService from "./service/orderService";
import userOrderService from "./service/userOrderService";



const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    [homeProductsService.reducerPath]:homeProductsService.reducer,
    [paymentService.reducerPath]:paymentService.reducer,
    [orderService.reducerPath]:orderService.reducer,
    [userOrderService.reducerPath]:userOrderService.reducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
    cartReducer:cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authService.middleware,
      categoryService.middleware,
      productService.middleware,
      homeProductsService.middleware,
      paymentService.middleware,
      orderService.middleware,
      userOrderService.middleware
    ]),
});

export default Store;
