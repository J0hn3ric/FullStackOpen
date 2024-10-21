import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdoteServices'
import { useContextDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useContextDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({
        type: 'NOTIFY',
        payload: `new anecdote ${newAnecdote.content} added`
      })
      setTimeout(() => 
        dispatch({ type: 'SLEEP' }),
        5000)
    },
    onError: () => {
      dispatch({
        type: 'NOTIFY',
        payload: 'anecdote too short, must have length 5 or more'
      })
      setTimeout(() => 
        dispatch({ type: 'SLEEP' }),
        5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
