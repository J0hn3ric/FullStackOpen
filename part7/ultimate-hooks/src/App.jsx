import { useEffect, useState } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onSubmit = () => {
    setValue('')
  }

  return {
    input: {
      type,
      value,
      onChange
    },
    onSubmit
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getId = Math.round(Math.random() * 10000)

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => setResources(response.data))
      .catch(error => {
        console.log(error)
        setResources([])
      })
  }, [])



  const create = async (resource) => {
    const newResource = {
      ...resource,
      id: getId
    }
    await axios.post(baseUrl, newResource)
    setResources(resources.concat(newResource))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.input.value })
    content.onSubmit()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.input.value, number: number.input.value})
    name.onSubmit()
    number.onSubmit()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.input} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.input} /> <br/>
        number <input {...number.input} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App