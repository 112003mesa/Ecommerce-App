import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../type";

interface CartItem extends Product {
  quantity: number;
}

const initialState: CartItem[] = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ إضافة للـ cart
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity < existingItem.maxQuantity) {
          existingItem.quantity += 1;
        }
      } else {
        state.push({ ...product, quantity: 1 });
      }
    },

    // ✅ تقليل الكمية لو أكبر من 1
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // لو وصل 1 ونقصنا كمان نحذفه
          return state.filter((item) => item.id !== action.payload);
        }
      }
      return state;
    },

    // ✅ حذف المنتج بالكامل من الـ cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart } = CartSlice.actions;
export default CartSlice.reducer;
