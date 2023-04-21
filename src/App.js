import './App.css'
import Layout from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import AllBlogPosts from './components/BlogPostList'
import BlogPost from './components/BlogPost'
import PageNotFound from './components/PageNotFound'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<AllBlogPosts />} />
          <Route path="/posts/:id" element={<BlogPost />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
