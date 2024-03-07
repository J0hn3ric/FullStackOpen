import { useState } from "react"
import Inputs from "./subComponents/Inputs"

const Filter = ({persons, setPersFilt, setFiltered}) =>{
    const [search, setSearch] = useState('')
  
    const handleFilter = (event) =>{
      event.preventDefault()
      const newPers = persons.filter(person => 
        person.name.toUpperCase() === search.toUpperCase())
      if(newPers.length === 0){
        window.alert(`no person with that name detected`)
      }else{
        setPersFilt(newPers)
        setFiltered(true)
        setSearch('')
      }
    }
  
    return(
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={handleFilter} >
          <Inputs title='filter shown with ' 
            onChange={(event) => setSearch(event.target.value)} 
            value={search} />
        </form>
      </div>
    )
}

export default Filter