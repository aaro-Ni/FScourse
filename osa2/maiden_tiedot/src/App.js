import axios from 'axios'
import { useState, useEffect } from 'react'

const Filter = ({filter, handleChange}) => {
  return(
    <>
    find countries <input value={filter} onChange={handleChange}></input>
    </>
  )
}

const CloseButton = ({handleChange}) =>
{
  return(
    <button onClick={handleChange}>show</button>
  )
}

const Countries = ({countries}) => {
  const [country1, setCountry1] = useState({name: {common: "test"}})
  if (countries.length > 10){
    if (country1.name.common !== "test"){
      setCountry1({name: {common: "test"}})
    }
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (countries.length === 1 || country1.name.common !== "test"){
    let country = countries[0]
    if (country1.name.common != "test")
    {
      country = country1
    }
    let languages = []
    languages = Object.values(country.languages)
    return(
      <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="Maan lippu"></img>
      </>
      
    )
  }
  else{
  return(
    <>
      {countries.map(country => <div key={country.name.common}>{country.name.common}
        <CloseButton handleChange={() => setCountry1(country)}></CloseButton></div>)} 
    </>
  )
  }
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {axios.get('https://restcountries.com/v3.1/all').then(response => {
    setCountries(response.data)})})

  const filteredCountries = () => {
    let lista = []
    if (newFilter.length === 0) {
      lista = countries
    }
    else {
      lista = countries.filter((country) => {
        const etsittava = newFilter.toLowerCase()
        const tutkittava = country.name.common.toLowerCase()
        return (tutkittava.includes(etsittava))
      })
    }
    return(lista)
  }
  const handleChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={newFilter} handleChange={handleChange}></Filter>
      <Countries countries={filteredCountries()}></Countries>
    </div>
  )
}

export default App;
