import { useState } from "react"
import Header from "./subComponents/Header"
import Inputs from "./subComponents/Inputs"
import Button from "./subComponents/Button"

const Form = ({persons, setPersons, setFiltered}) => {

    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
  
    const addPerson = (event) => {
      event.preventDefault()
      if(newNum === '' || newNum === 1){
        window.alert(`please fill the name form or number form`)
      }else{
        const addPerson = {
          name: newName,
          number: newNum,
          id: persons.length + 1
        }
  
        const verify = persons.filter(person => addPerson.name === person.name ||
          addPerson.number === person.number).length > 0
       
       if(!verify){
         setPersons(persons.concat(addPerson))
         setFiltered(false)
         setNewName('')
         setNewNum('')
       }else{
         window.alert(`${newName} or ${newNum} is alredy added to phonebook`)
       }
      }
      
    }
  
    return(
    <>
      <Header title='add a new' />
      <form onSubmit={addPerson}>
            <Inputs title='name' onChange={(event) => setNewName(event.target.value)} 
              value={newName} />
            <Inputs title='number' onChange={(event) => setNewNum(event.target.value)}
              value={newNum} />
            <Button type="submit" text='add' />
          </form>
    </>)
}

export default Form