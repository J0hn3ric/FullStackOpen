import Notification from './Notification'

import { setUser, userLogin } from '../reducers/loginReducer'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useField } from '../hooks'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Col, Form, Row } from 'react-bootstrap'

import '../css/index.css'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification.message)

  const username = useField('Username', 'text', 'username-input')
  const password = useField('Password', 'password', 'password-input')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(userLogin({
      username: username.input.value,
      password: password.input.value
    }))

    username.submit()
    password.submit()
    navigate('/', { replace: true })
  }

  return (
    <div>
      {(message
        ? <Notification />
        : null
      )}
      <h2>Log in to application</h2>
      <Card style={{ width: '35rem' }} className='mx-3 my-4'>
        <Card.Header as='h2' className='cardHeader'>
          input your credentials
        </Card.Header>
        <Card.Body className='cardBody'>
          <Form onSubmit={handleLogin}>
            <Form.Group className='mb-1' controlId={username.testid}>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                as='input'
                className='w-50'
                placeholder='Username'
                {...username.input}
              />
            </Form.Group>
            <Form.Group className='mb-1' controlId={password.testid}>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                as='input'
                className='w-50'
                placeholder='Password'
                {...password.input}
              />
            </Form.Group>
            <Button variant='success' type="submit">login</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login