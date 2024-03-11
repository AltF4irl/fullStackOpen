import { useState,useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'

const App = () => {
  
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setsearch] = useState('')
  const [searchList, setSearchList] = useState([])

  useEffect(() => {
    console.log('Effect')
    axios
    .get('http://localhost:3001/persons')
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
        id: newName.split(' ')[0],
        name: newName,
        number: newNumber
      }
      console.log('new person:', personObject)
      if (person.filter(prs => prs.name === newName).length >0) {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
      } else {
        const personHolder = person.concat(personObject)
        setPerson(person.concat(personObject))
        setNewName('')
        setNewNumber('')
        setSearchList(personHolder)
      } 
    },
    seachChangeHandler: (e) => {
      setsearch(e.target.value)
      e.target.value.length > 0 
      ? setSearchList(person.filter(prs => prs.name.toLowerCase().includes(e.target.value)))
      : setSearchList(person)
    }
  }
  const {nameChangeHandler, addSubmitHandler, numberChangeHandler, seachChangeHandler} = eventHandler

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
      <People list={searchList} />
    </div>
  )
}

export default App