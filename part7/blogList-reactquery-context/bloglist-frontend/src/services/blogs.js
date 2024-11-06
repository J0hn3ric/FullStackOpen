import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAll = () => (
  axios
    .get(baseUrl)
    .then(response => response.data)
    .catch(error => error.data.error)
)

export const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  return axios
    .post(baseUrl, newObject, config)
    .then(response => response.data)
    .catch(error => error.data.error)
}

export const update = (updatedObject) => {
  const config = {
    headers: { Authorization: token },
  }

  return axios
    .put(`${baseUrl}/${updatedObject.id}`, updatedObject, config)
    .then(response => response.data)
    .catch(error => error.data.error)
}

export const del = (objectToDelete) => {
  const config = {
    headers: { Authorization: token },
  }

  axios
    .delete(`${baseUrl}/${objectToDelete.id}`, config)
    .catch(error => error.data.error)
}
