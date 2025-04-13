import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../type";

// أول حاجة نحاول نجيب المنتجات من localStorage لو موجودة
const productsFromStorage = localStorage.getItem("products");
const initialState: Product[] = productsFromStorage
  ? JSON.parse(productsFromStorage)
  : [];

const ShowProduct = createSlice({
  name: "ShowProduct",
  initialState,
  reducers: {
    showProduct: (state, action: PayloadAction<Product>) => {
      state.splice(0, state.length, action.payload);
      localStorage.setItem("products", JSON.stringify(state));
    },
    
  },
});

export const { showProduct } = ShowProduct.actions;
export default ShowProduct.reducer;
