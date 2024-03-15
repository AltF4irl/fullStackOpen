import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import personService from './services/personService'

const App = () => {
  
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setsearch] = useState('')
  const [searchList, setSearchList] = useState([])

  useEffect(() => {
    console.log('Effect')
    personService
    .getAll()
    .then(res => {
      console.log('Fulfilled')
      console.log(res.data)
      setPerson(res.data)
      setSearchList(res.data)
    })
  }, [])
  console.log('render', person.length, 'notes')

  const eventHandler = {
    nameChangeHandler: (e) => {
      setNewName(e.target.value)
    },
    numberChangeHandler : (e) => {
      setNewNumber(e.target.value)
    },
    addSubmitHandler: (e) => {
      e.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }
      console.log('new person:', personObject)
      if (person.filter(prs => prs.name === newName).length >0) {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
      } else {
        personService
          .create(personObject)
          .then(res => {
            const personHolder = person.concat(res.data)
            setPerson(person.concat(res.data))
            setNewName('')
            setNewNumber('')
            setSearchList(personHolder)
          })
      } 
    },
    seachChangeHandler: (e) => {
      setsearch(e.target.value)
      e.target.value.length > 0 
      ? setSearchList(person.filter(prs => prs.name.toLowerCase().includes(e.target.value)))
      : setSearchList(person)
    },
    deletePersonEventHandler: (id) => {
      personService
      .remove(id)
      .then(res => {
      console.log(res.data)
      setPerson(person.filter(prs => prs.id !== id))
      setSearchList(person.filter(prs => prs.id !== id))
      })
    }
  }
  const {nameChangeHandler, addSubmitHandler, numberChangeHandler, seachChangeHandler, deletePersonEventHandler} = eventHandler

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={seachChangeHandler} />
      <h2>Add a New Contact</h2>
      <PersonForm 
      onSubmit={addSubmitHandler} 
      nameValue={newName} nameChange={nameChangeHandler}
      numberValue={newNumber} numberChange={numberChangeHandler}
      />
      <h2>Numbers</h2>
      <People 
      list={searchList} 
      onClick={deletePersonEventHandler}
      />
    </div>
  )
}

export default App