import { configureStore } from '@reduxjs/toolkit'
import AllDate from '../productsSlice/AllProduct'
import showProduct from '../productsSlice/ShowProduct'
import CartSlice from '../productsSlice/CartSlice'
// ...

export const store = configureStore({
  reducer: {
    AllDate,
    showProduct,
    CartSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch