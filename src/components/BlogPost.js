import React, { useState } from 'react'
import GetSinglePostApi from '../features/blogPosts/GetSinglePostApi'
import GetAuthorDetailsApi from '../features/blogPosts/GetAuthorDetailsApi'
import Card from 'react-bootstrap/Card'
import { Modal, Button } from 'react-bootstrap'

import { useParams, useNavigate } from 'react-router-dom'

const BlogPost = () => {
  let { id } = useParams()
  const { data } = GetSinglePostApi(id)
  const postAuthorId = data?.userId
  const { data1, fetchData } = GetAuthorDetailsApi()
  const [show, setShow] = useState(false)
  const navigation = useNavigate()

  const handleShow = () => {
    fetchData(postAuthorId)
    setShow(true)
  }

  const handleClose = () => setShow(false)

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Author Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>FirstName : {data1?.firstName}</p>
          <p>LastName : {data1?.lastName}</p>
          <p>Email : {data1?.email}</p>
          <p>Phone : {data1?.phone}</p>
          <p>Address : {data1?.address.address}</p>
          <img src={data1?.image} alt="Authorimage" className="img-fluid" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Card style={{ width: '50rem' }} className="mt-5">
        <Card.Body>
          <Card.Link
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
              fontSize: '20px',
            }}
            onClick={() => handleShow()}
          >
            {data?.title}
          </Card.Link>
          <Card.Text>{data?.body}</Card.Text>
        </Card.Body>
      </Card>
      <Button
        className="mt-5"
        onClick={() => navigation('/')}
        variant="primary"
      >
        Go Back To List
      </Button>
    </>
  )
}

export default BlogPost
