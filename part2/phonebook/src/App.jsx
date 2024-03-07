import { useState } from 'react'
import Form from './components/Form'
import Numbers from './components/Numbers'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [filtered, setFiltered] = useState(false)

  const [perFilt, setPersFilt] = useState(persons)
  

  return (
    <div>
      <Filter persons={persons} setPersFilt={setPersFilt}
        setFiltered={setFiltered} />
      <Form persons={persons} setPersons={setPersons} 
        setFiltered={setFiltered} />
      <Numbers persons={persons} filtered={filtered} 
        perFilt={perFilt} />
    </div>
  )
}

export default App
