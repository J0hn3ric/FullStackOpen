import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const loggedUser = action.payload
      blogService.setToken(loggedUser.token)
      return loggedUser
    },
    logout() {
      window.localStorage.removeItem('loggedUser')
      return initialState
    }
  }
})

export const { setUser, logout } = userSlice.actions

export const userLogin = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(setNotification({
        message: `welcome ${user.username}`,
        type: 'success'
      }, 5))
    } catch (error) {
      dispatch(setNotification({
        message: error.response.data.error,
        type: 'error'
      }, 5))
    }
  }
}

export const userLogout = () => {
  return dispatch => {
    dispatch(setNotification({
      message: 'logged out',
      type: 'error'
    }, 5))
    dispatch(logout())
  }
}

export default userSlice.reducer