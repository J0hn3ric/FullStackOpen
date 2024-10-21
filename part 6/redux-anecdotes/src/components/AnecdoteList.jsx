/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleVote = () => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') 
      return anecdotes
    else {
      return anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()))
    }
  })

  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id} 
          anecdote={anecdote}
        />
      )}
    </div>
  )
}

export default AnecdoteList