/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'NOTIFY':
      return {
        message: action.payload,
        display: ''
      }
    case 'SLEEP':
      return {
        message: '',
        display: 'none'
      }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    {
      message: '',
      display: 'none'
    }
  )

  return(
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useContextValue = () => {
  const notifyAndDispatch = useContext(NotificationContext)
  return notifyAndDispatch[0]
}

export const useContextDispatch = () => {
  const notifyAndDispatch = useContext(NotificationContext)
  return notifyAndDispatch[1]
}

export default NotificationContext