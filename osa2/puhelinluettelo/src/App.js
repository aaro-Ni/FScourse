import axios from 'axios'
import { useState, useEffect } from 'react'
import noteService from './services/notes'



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

const Persons = ({persons, handleKlick}) => {
  return(
    <ul>
    {persons.map(person => <li key={person.name}><div>{person.name} {person.number}</div><button key={person.name} onClick={() => handleKlick(person)}>Delete</button></li>)}
  </ul>
  )
}

const Notification = ({message}) => {
  if (message == null){
    return null
  }
  return (
    <div className={message.class}>{message.msg}</div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ]) 

  useEffect(() => {
    noteService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  const addName = (event) => {
    event.preventDefault()
    const uusiObjekti = {name: newName, number: newNumber}
    const person = persons.find((person) => person.name === newName)
    if (person != undefined && window.confirm(`${newName} is already in added to phonebook, replace the old number with new one?`))
    {
      noteService.update(person.id, uusiObjekti).then(response => {
        setPersons(persons.map(p => p.id !== person.id ? p : response.data))
        setMessage({msg: `Changed number of ${person.name}`, class: 'notification'})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }).catch( response => {
        setMessage({msg: `Information of ${person.name} has already been removed from server`, class: 'error'})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      }
      )
      return
    }

    noteService.create(uusiObjekti).then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      setMessage({msg: `Added ${uusiObjekti.name}`, class: 'notification'})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }).catch( response => {
      setMessage({msg: `Adding of ${uusiObjekti.name} failed`, class: 'error'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    )

    //setPersons(persons.concat(uusiObjekti))
    
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
  const handleKlick= (person) => {
    if (window.confirm(`Delete ${person.name} ?`)){
    noteService.deletePerson(person.id).then((response) => {
      setMessage({msg: `Deleted ${person.name}`, class: 'notification'})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }).catch( response => {
      setMessage({msg: `Information of ${person.name} has already been removed from server`, class: 'error'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    )
    setPersons(persons.filter(p => p.id !== person.id))
    }
    
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
      <Notification message={message}></Notification>
      <div>
        <Filter handleChange={handleChange3} filter={newFilter}></Filter>
      </div>
      <h2>add a new</h2>
      <PersonForm addName={addName} handleNameChange={handleChange} 
      handleNumberChange={handleChange2} newName={newName} newNumber={newNumber}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={filteredMap()} handleKlick={handleKlick}></Persons>
    </div>
  )

}

export default App