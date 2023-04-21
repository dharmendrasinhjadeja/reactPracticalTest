import { Container } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'

const Layout = (props) => {
  const navigation = useNavigate()
  return (
    <>
      <Navbar
        bg="primary"
        sticky="top"
        className="justify-content-center"
        variant="dark"
      >
        <Navbar.Brand
          onClick={() => navigation('/')}
          style={{ cursor: 'pointer' }}
        >
          Practical Test
        </Navbar.Brand>
      </Navbar>
      <Container>{props.children}</Container>
    </>
  )
}
export default Layout
