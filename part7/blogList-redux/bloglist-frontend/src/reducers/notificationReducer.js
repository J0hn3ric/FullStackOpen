import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers:{
    notify(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type
      }
    },
    sleep() {
      return initialState
    }
  }
})

export const { notify, sleep } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return dispatch => {
    dispatch(notify(notification))
    setTimeout(() => {
      dispatch(sleep())
    }, time * 1000)
  }
}

export default notificationSlice.reducer