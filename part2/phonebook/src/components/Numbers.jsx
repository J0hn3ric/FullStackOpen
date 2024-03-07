import Header from "./Header"
import Person from "./Person"

const Numbers = ({persons, filtered, perFilt}) => {

    if(!filtered){
      return(<div>
        <Header title='Numbers' />
        <ul>
        {persons.map( person =>
              <Person key={person.id} name={person.name} number={person.number} />
            )}
        </ul>
      </div>)
    }else{
      return(
        <div>
          <Header title='Numbers' />
          <ul>
          {perFilt.map( person =>
                <Person key={person.id} name={person.name} number={person.number} />
              )}
          </ul>
        </div>
      )
    }
    
    
}

export default Numbers