import { useState, useEffect } from 'react'
import phoneServices from './services/phoneServices'
import Form from './components/Form'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Notification from './components/Notification'
import './css/index.css'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    phoneServices
      .getAll()
      .then(allPers => 
        setPersons(allPers))
  }, [])

  const [filtered, setFiltered] = useState(false)

  const [perFilt, setPersFilt] = useState(persons)

  const [message, setMessage] = useState(
    {
      msg: null,
      type: null
    }
  )
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter persons={persons} setPersFilt={setPersFilt}
        setFiltered={setFiltered} setPerson={setPersons}/>
      <Form persons={persons} setPersons={setPersons} 
        setFiltered={setFiltered} setMsg={setMessage}/>
      <Numbers persons={persons} filtered={filtered} 
        perFilt={perFilt} setPersons={setPersons} />
    </div>
  )
}

export default App
