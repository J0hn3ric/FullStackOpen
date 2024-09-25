import { useState } from "react"
import Inputs from "./subComponents/Inputs"
import Button from "./subComponents/Button"
import phoneServices from "../services/phoneServices"

const Filter = ({persons, setPersFilt, setFiltered, setPerson}) =>{
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
  
    const resetFilter = (event) =>{
      event.preventDefault()
      phoneServices
        .getAll()
        .then(allDatas => {
          setPersFilt(allDatas)
          setFiltered(false)
        }) 
    }

    return(
      <div>
        <form onSubmit={handleFilter} >
          <Inputs title='filter shown with ' 
            onChange={(event) => setSearch(event.target.value)} 
            value={search} />
        </form>
        <Button type='button' onClick={resetFilter} text='reset' />
      </div>
    )
}

export default Filter