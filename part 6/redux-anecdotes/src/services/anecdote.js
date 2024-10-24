import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const vote = async (id) => {
  const get = await axios.get(`${baseUrl}/${id}`)
  const getAnecdote = get.data
  const changedAnecdote = {
    ...getAnecdote,
    votes: getAnecdote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  return response.data
}

export default { getAll, createNew, vote }