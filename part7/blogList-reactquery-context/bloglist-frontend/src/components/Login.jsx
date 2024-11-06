import Notification from './Notification'

import { useUserDispatch, loginReducer } from '../context/userContext'
import { setNotification, useNotificationDispatch, useNotificationValue } from '../context/notificationContext'
import { useEffect, useState } from 'react'

import { setToken } from '../services/blogs'
import { login }from '../services/login'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userDispatch = useUserDispatch()

  const notificationDispatch = useNotificationDispatch()
  const notification = useNotificationValue()


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const userFromLocal = JSON.parse(loggedUser)
      loginReducer(userDispatch, userFromLocal)
      setToken(userFromLocal.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userLogIn = await login({
        username: username,
        password: password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(userLogIn))
      loginReducer(userDispatch, userLogIn)
      setNotification(notificationDispatch,
        {
          message: `welcome ${userLogIn.username}`,
          type: 'success'
        }, 5)
      setUsername('')
      setPassword('')
      setToken(userLogIn.token)
    } catch (exception) {
      console.log(exception.response.data.error)
      setNotification(notificationDispatch, {
        message: exception.response.data.error,
        type: 'error'
      }, 5)
    }
  }

  return(
    <div>
      {(notification.message
        ? <Notification />
        :null
      )}
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login