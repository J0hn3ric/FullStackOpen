import { useState } from "react"
import phoneServices from "../services/phoneServices"
import Header from "./subComponents/Header"
import Inputs from "./subComponents/Inputs"
import Button from "./subComponents/Button"

const Form = ({persons, setPersons, setFiltered, setMsg}) => {

    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
  

    const handleAdd = (name) =>{
      const addMsg = {
        msg: `Added ${name}`,
        type: 'add'
      }
      setMsg(addMsg)
      timeout()
    }

    const handleUpdate = (name) => {
      const changedMsg = {
        msg: `changed ${name}'s Number`,
        type: 'update'
      }
      setMsg(changedMsg)
      timeout()
    }

    const handleError = (name) => {
      const errorMsg = {
        msg: `information of ${name} has been removed from server`,
        type: 'error'
      }
      setMsg(errorMsg)
      timeout()
    }

    const timeout = () => {
      setTimeout(() => {
        const nullMsg = {
          msg: null,
          type: null
        }
        setMsg(nullMsg)
      }, 3000);
    }

    const showMessage = (title, name) => {
      switch(title) {
        case 'add':
          handleAdd(name)
          break;

        case 'update':
          handleUpdate(name)
          break;

        case 'error':
          handleError(name)
          break;
      }
    }

    const doAddNewPerson = (addPerson) => {
      phoneServices
          .create(addPerson)
          .then(newPers => {
            setPersons(persons.concat(newPers))
            setFiltered(false)
            setNewName('')
            setNewNum('')
            showMessage('add', newPers.name)
         })
    }

    const changeNum = () => {
      const person = persons.find(p => p.name === newName)
      const changedNumber = {...person, number: newNum}

      phoneServices
        .update(person.id, changedNumber)
        .then(returnedPers => {
          setPersons(persons.map(pers => 
                      pers.id !== person.id 
                      ? pers 
                      : returnedPers))
          showMessage('update', changedNumber.name)
          setNewName('')
          setNewNum('')
      })
      .catch(error => {
        showMessage('error', changedNumber.name)
      })
    }

    const confronta = (title, addPerson) => {
      if(title === "name"){
        return(
          persons.filter(person => addPerson.name === person.name)
          .length > 0)
      }else{
        return(
          persons.filter(person => addPerson.num === person.num)
          .length > 0)
      }
    }

    const confrontCauseOfError = (verifyName) => {
      if(verifyName){
        if(confirm
          (`${newName} is already added to phonebook, change number??`)){
            changeNum()
          }
      }else{
        alert(`${newNum} is already added to phonebook`)
      }
    }

    const verifyFunction = (addPerson) => {
      const verifyName = confronta("name", addPerson)
      const verifyNum = confronta("number", addPerson)
      const verify = verifyName && verifyNum
       
      if(!verify){
        doAddNewPerson(addPerson)
      }else{
        confrontCauseOfError(verifyName)
      }
    }
    

    const addPerson = (event) => {
      event.preventDefault()
      if(newName === '' || newNum === ''){
        window.alert(`please fill the name form or number form`)
      }else{
        let newid = persons.length + 1
        const addPerson = {
          name: newName,
          number: newNum,
          id: newid.toString()
        }
        verifyFunction(addPerson)
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
            <Button type="submit" text='add' onClick={addPerson}/>
          </form>
    </>)
}

export default Form