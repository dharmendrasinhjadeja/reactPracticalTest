import axios from 'axios'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import ReactPaginate from 'react-paginate'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllPosts,
  getLoading,
  allPostsLoading,
  allPostsRecieved,
} from '../features/blogPosts/blogPostSlice'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const AllBlogPosts = () => {
  const [itemsPerPage] = useState(10)
  const [currentPage, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const { posts = [], total = null } = useSelector(getAllPosts)
  const apiStatus = useSelector(getLoading)
  const dispatch = useDispatch()
  const navigation = useNavigate()
  console.log('allPosts', total)
  let contentToRender = ''

  useEffect(() => {
    const invokeAllPostsAPI = async () => {
      dispatch(allPostsLoading())
      const apiResponse = await axios.get(
        `https://dummyjson.com/posts?limit=${itemsPerPage}&skip=${itemOffset}`,
      )
      dispatch(allPostsRecieved(apiResponse.data))
    }

    invokeAllPostsAPI()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, itemsPerPage])

  useEffect(() => {
    if (total) {
      setPageCount(Math.ceil(total / itemsPerPage))
    }
  }, [total])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % total
    console.log(
      `User requested page number ${event.selected}, which is offset `,
    )
    setCurrentItems(event.selected)
    setItemOffset(newOffset)
  }

  contentToRender =
    apiStatus === 'pending' ? (
      <>
        <div className=" d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </>
    ) : (
      <>
        <Row xs={1} md={1} className="g-4">
          {posts?.length > 0 &&
            posts.map((post) => (
              <Col key={post.id}>
                <Card style={{ width: '80rem' }}>
                  <Card.Header as="h5">{post.title}</Card.Header>
                  <Card.Body>
                    <Card.Text>{post.body}</Card.Text>
                    <Button
                      onClick={() => navigation(`/posts/${post.id}`)}
                      style={{ cursor: 'pointer' }}
                      variant="primary"
                    >
                      {' '}
                      View Post
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}

          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            forcePage={currentPage}
          />
        </Row>
      </>
    )

  return <Container className="mt-2">{contentToRender}</Container>
}

export default AllBlogPosts
