import axios from 'axios'
import { useState, useEffect } from 'react'



const Filter = ({handleChange, filter}) => {
  return(
    <>
    name: <input value={filter} onChange={handleChange} />
    </>
  )
}

const PersonForm = ({addName, handleNameChange, handleNumberChange, newName, newNumber}) => {
  return(
    <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons}) => {
  return(
    <ul>
    {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
  </ul>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ]) 

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName) != undefined)
    {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const uusiObjekti = {name: newName, number: newNumber}

    setPersons(persons.concat(uusiObjekti))
    setNewName('')
    setNewNumber('')
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handleChange2 = (event) => {
    setNewNumber(event.target.value)
  }
  const handleChange3 = (event) => {
    setNewFilter(event.target.value)
  }
  const filteredMap = () => {
    let lista = []
    if (newFilter.length === 0){
      lista = persons
    }
    else{
      lista = persons.filter((person) => {
        const etsittava = newFilter.toLowerCase()
        const tutkittava = person.name.toLowerCase()
        return (tutkittava.includes(etsittava))
      })
    }


    return (lista)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter handleChange={handleChange3} filter={newFilter}></Filter>
      </div>
      <h2>add a new</h2>
      <PersonForm addName={addName} handleNameChange={handleChange} 
      handleNumberChange={handleChange2} newName={newName} newNumber={newNumber}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={filteredMap()}></Persons>
    </div>
  )

}

export default App