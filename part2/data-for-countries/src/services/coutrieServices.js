import axios from "axios";
const defUrl = 'http://localhost:3001/countries'

const fetchCountries = async () => {
    try {
      const externalResponse = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      const newData = externalResponse.data

      console.log('Country data fetched successfully:', newData)
      return newData
    } catch (error) {
      console.error('Error:', error)
    }
};

const fetchWeather = async (lat, lon, api_key) => {
  try {
    const externalResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    const newData = externalResponse.data

    console.log('Weather data fetched successfully:', newData)
    return newData
  } catch (error) {
    console.error('Error:', error)
  }
}
 
export default { fetchCountries, fetchWeather } 