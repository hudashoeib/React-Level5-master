import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts: JSON.parse(localStorage.getItem("selectedProducts")) || [],
  selectedProductsID:
    JSON.parse(localStorage.getItem("selectedProductsID")) || [],
};

export const cartSlice = createSlice({
  name: "cart", // cart will be used as at store.js to be imported as cartReducer  and be declared as a key and value in the reducer object (cart: cartReducer)
  // and used at the component only at useselctor (state.cart)
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productWithQuantity = { ...action.payload, quantity: 1 };
      state.selectedProducts.push(productWithQuantity);
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts),
      );
    },
    removeFromCart: (state, action) => {
      state.selectedProducts.filter((item) => item.id !== action.payload.id);
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts),
      );
    },
    increaseQuantity: (state, action) => {
      const productById = state.selectedProducts.find(
        (item) => item.id === action.payload.id,
      );
      productById.quantity += 1;
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts),
      );
    },
    decreaseQuantity: (state, action) => {
      const productById = state.selectedProducts.find(
        (item) => item.id === action.payload.id,
      );
      productById.quantity -= 1;
      if (productById.quantity <= 0) {
        state.selectedProducts.filter((item) => item.id !== action.payload.id);
        localStorage.setItem(
          "selectedProducts",
          JSON.stringify(state.selectedProducts),
        );
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
