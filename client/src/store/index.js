import { configureStore, } from "@reduxjs/toolkit";
import authService from "./service/authService";
import authReducer from "./reducer/authReducer";
import categoryService from "./service/categoryService";
import globalReducer from "./reducer/globalReducer";
import productService from "./service/productService";
import homeProductsService from "./service/homeProducts";

const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    [homeProductsService.reducerPath]:homeProductsService.reducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authService.middleware,
      categoryService.middleware,
      productService.middleware,
      homeProductsService.middleware
    ]),
});

export default Store;
