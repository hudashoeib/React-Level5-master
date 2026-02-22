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
      //action.payload is the object of API that i want to add to the cart
      //use spread operator to copy the object  and spread it on the new object without  array =brackets then  I add a new key to it called quantity with value 1

      const productWithQuantity = { ...action.payload, quantity: 1 };
      state.selectedProducts.push(productWithQuantity);
      state.selectedProductsID.push(action.payload.id);
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts),
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID),
      );
    },
    removeFromCart: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (item) => item.id !== action.payload.id,
      );
      state.selectedProductsID = state.selectedProductsID.filter(
        (item) => item !== action.payload.id,
      );
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts),
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID),
      );
    },
    increaseQuantity: (state, action) => {
      //we need to inc the value of  "quantity" key of the selected item only so detect it 1st in the main array (selectedProducts)
      const itemById = state.selectedProducts.find(
        (item) => item.id === action.payload.id,
      );
      itemById.quantity += 1;
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts),
      );
    },
    decreaseQuantity: (state, action) => {
      const itemById = state.selectedProducts.find(
        (item) => item.id === action.payload.id,
      );
      itemById.quantity -= 1;
      if (itemById.quantity <= 0) {
        state.selectedProducts = state.selectedProducts.filter(
          (item) => item.id !== action.payload.id,
        );
        state.selectedProductsID = state.selectedProductsID.filter(
          (item) => item !== action.payload.id,
        );
      }
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts),
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID),
      );
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
