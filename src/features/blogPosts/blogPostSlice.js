const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  blogPostData: [],
  loading: 'idle',
}

const blogPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    allPostsLoading: (state) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    allPostsRecieved: (state, { payload }) => {
      state.loading = 'idle'
      state.blogPostData = payload
    },
  },
  extraReducers: (builder) => {},
})
export const { allPostsLoading, allPostsRecieved } = blogPostSlice.actions
export const getAllPosts = (state) => state.post.blogPostData
export const getLoading = (state) => state.post.loading

export default blogPostSlice.reducer
