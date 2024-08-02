import { useEffect, useState } from 'react'
import coutrieServices from './services/coutrieServices'
import Countries from './components/outputs/Countries'

const App = () => {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([])
  const [numShownCountries, setNumSC] = useState(0)
  

  useEffect(() => {
    coutrieServices
      .fetchCountries()
      .then(countries => {
        setCountries(countries)
      })
  }, [])

  useEffect(() => {
    const empty = []
    setShownCountries(empty)
    let filteredCountries = []
    if(input !== ''){
      filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(input.toLowerCase())
      )
    }
    if(filteredCountries.length !== 0){
      setShownCountries(filteredCountries)
    }
  }, [input, countries])

  useEffect(() => {
    setNumSC(shownCountries.length)
  }, [shownCountries])

  return (
    <div>
      <form onSubmit={(event) => {event.preventDefault()}}>
        find countries : <input name='search' 
                          onChange={(event) => setInput(event.target.value)} 
                          value={input} />
      </form>
      <Countries format={numShownCountries} datas={shownCountries} 
                setData={setShownCountries} setnum={setNumSC} />
    </div>
  )
}

export default App
