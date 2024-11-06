import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const initialState = []

const compare = (a, b) => {
  if (a.blogs.length < b.blogs.length) {
    return 1
  } else if (a.blogs.length > b.blogs.length) {
    return -1
  }
  return 0
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const allUsers = await usersService.getAll()
    console.log(allUsers)
    allUsers.sort(compare)
    dispatch(setUsers(allUsers))
  }
}

export default usersSlice.reducer