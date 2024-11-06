import Login from './components/Login'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import './css/index.css'

import {
  setNotification,
  useNotificationDispatch,
  useNotificationValue,
} from './context/notificationContext'
import { useUserDispatch, useUserValue, logoutReducer } from './context/userContext'

const App = () => {
  const userDispatch = useUserDispatch()
  const user = useUserValue()

  const notifcationDispatch = useNotificationDispatch()
  const notification = useNotificationValue()

  const handleLogout = (event) => {
    event.preventDefault()

    logoutReducer(userDispatch)
    window.localStorage.removeItem('loggedUser')
    setNotification(notifcationDispatch, {
      message: 'logged out',
      type: 'error'
    }, 5)
  }

  return (
    <div>
      {user === null ? (
        <Login />
      ) : (
        <>
          {(notification.message
            ? <Notification />
            :null
          )}
          <p>
            {user.name} logged in <button onClick={handleLogout}>logOut</button>
          </p>
          <BlogList />
        </>
      )}
    </div>
  )
}

export default App
