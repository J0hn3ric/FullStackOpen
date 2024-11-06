import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../reducers/loginReducer'

import Notification from './Notification'

const Head = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const message = useSelector(state => state.notification.message)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(userLogout())
    navigate('/login')
  }

  const padding = {
    pading: 5
  }

  return(
    <div>
      {user
        ? <div>
          <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <Container>
              <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='me-auto'>
                  <Nav.Link href='#' as='span'>
                    <Link style={padding} to='/'>Blogs</Link>
                  </Nav.Link>
                  <Nav.Link href='#' as='span'>
                    <Link style={padding} to='/users'>Users</Link>
                  </Nav.Link>
                  <Navbar.Text>
                    <em>{user.name} logged in </em>&nbsp;
                    <Button variant='danger' size='sm' onClick={handleLogout}>log out</Button>
                  </Navbar.Text>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {(message
            ? <Notification />
            : null
          )}
          <h2>blogs</h2>
        </div>
        : null
      }
    </div>
  )
}

export default Head