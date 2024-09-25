import axios from "axios";
const defUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(defUrl)
    return request.then(response => response.data)
}

const create = newObj => {
    const request = axios.post(defUrl, newObj)
    return request.then(response => response.data)
}

const del = (id) => {
    const request = axios.delete(`${defUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${defUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, del, update }