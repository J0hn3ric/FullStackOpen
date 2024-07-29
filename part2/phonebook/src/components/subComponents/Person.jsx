import { all } from "axios"
import phoneServices from "../../services/phoneServices"
import { useEffect } from "react"

const Person = ({name, number, id, setPersons, person}) => {

    const deleteNum = () => {
        if (window.confirm(`delete ${name} ?`)){
            phoneServices
            .del(person.id)
            .then(_newData => {
                phoneServices
                .getAll()
                .then(allDatas => {
                    setPersons(allDatas)
                })
            })
        }
    }

    return (<>
        <li>{person.name} {person.number}</li> <button onClick={deleteNum}>delete</button>
    </>)
}

export default Person
  