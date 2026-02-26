import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { oneproductApi, productsApi } from "./productsAPI";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    //  "cart" ======>  useSelector
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [oneproductApi.reducerPath]: oneproductApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(oneproductApi.middleware),
});

setupListeners(store.dispatch);
