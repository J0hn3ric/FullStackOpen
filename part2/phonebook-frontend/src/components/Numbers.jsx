import Header from "./subComponents/Header"
import Person from "./subComponents/Person"

const Numbers = ({persons, filtered, perFilt, setPersons}) => {

  

    if(!filtered){
      return(<div>
        <Header title='Numbers' />
        <ul>
        {persons.map( person =>
              <Person key={person.id} name={person.name} number={person.number}
                setPersons={setPersons} id={person.id} person={person} />
            )}
        </ul>
      </div>)
    }else{
      return(
        <div>
          <Header title='Numbers' />
          <ul>
          {perFilt.map( person =>
                <Person key={person.id} name={person.name} number={person.number}
                   setPersons={setPersons} id={person.id} person={person} />
              )}
          </ul>
        </div>
      )
    }
    
    
}

export default Numbers