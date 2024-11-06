import { createContext, useReducer, useContext } from 'react'

const initialState = {
  message: null,
  type: null
}

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.payload

  case 'SLEEP':
    return initialState

  default:
    return state
  }
}

const NotificationContext = createContext()

export const ContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  return(
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationDispatch = () => {
  const helper = useContext(NotificationContext)
  return helper[1]
}

export const useNotificationValue = () => {
  const helper = useContext(NotificationContext)
  return helper[0]
}

export const setNotification = (dispatch, payload, time) => {
  dispatch({ type: 'NOTIFY', payload })
  setTimeout(() => {
    dispatch({ type: 'SLEEP' })
  }, time * 1000)
}

export default NotificationContext