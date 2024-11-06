import { createContext, useContext, useReducer } from 'react'

const initialState = null

const userReducer = (state, action) => {
  switch(action.type) {
  case 'LOG_IN':
    return action.payload
  case 'LOG_OUT':
    return initialState
  default:
    return state
  }
}

const UserContext = createContext()

export const UserProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, initialState)

  return(
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserDispatch = () => {
  const helper = useContext(UserContext)
  return helper[1]
}

export const useUserValue = () => {
  const helper = useContext(UserContext)
  return helper[0]
}

export const loginReducer = (dispatch, payload) => {
  dispatch({ type: 'LOG_IN', payload: payload })
}

export const logoutReducer = (dispatch) => {
  dispatch({ type: 'LOG_OUT' })
}