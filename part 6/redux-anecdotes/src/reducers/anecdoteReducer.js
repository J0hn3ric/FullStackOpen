import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const compare = (anecdote1, anecdote2) => {
  if (anecdote1.votes > anecdote2.votes)
    return -1
  else if (anecdote1.votes < anecdote2.votes)
    return 1
  return 0
}

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const changedAnecdote = action.payload
      const id = changedAnecdote.id
      const newState = state.map(anecdote => 
        anecdote.id === id 
        ? changedAnecdote
        : anecdote
      )
      newState.sort(compare)
      console.log(newState)
      return newState
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
  }

})

export const { incrementVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log(anecdotes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (id) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.vote(id)
    dispatch(incrementVote(changedAnecdote))
  }
}

export default anecdoteSlice.reducer