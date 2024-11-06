import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updatedObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject,
    config
  )
  return response.data
}

const del = async (objectToDelete) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/${objectToDelete.id}`, config)
}

const addComment = async (payload) => {
  const body = {
    comment: payload.comment
  }

  const response = await axios.post(`${baseUrl}/${payload.id}/comments`, body)
  return response.data
}

export default { getAll, create, setToken, update, del, addComment }
