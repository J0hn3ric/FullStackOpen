import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    content: '',
    display: 'none'
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notify(state, action) {
            return action.payload
        },
        sleep() {
            return initialState
        },
    }
})

export const { notify, sleep } = notificationSlice.actions

export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch(notify({
            content: notification,
            display: ''
        }))
        setTimeout(() => {
            dispatch(sleep())
        }, time * 1000)
    }
}

export default notificationSlice.reducer