import { configureStore } from '@reduxjs/toolkit'
import postReducer from './blogPosts/blogPostSlice'

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
})
