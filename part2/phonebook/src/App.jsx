import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import personService from './services/personService'
import Notification from './components/Notification'

const App = () => {
  
  const [person, setPerson] = useState([]) //Array of all person objects
  const [newName, setNewName] = useState('') //Name field state
  const [newNumber, setNewNumber] = useState('') //Number field state
  const [search, setsearch] = useState('') //Search bar state
  const [searchList, setSearchList] = useState([]) //Array of searched people using search bar
  const [notificationMessage, setNotificationMessage] = useState({})

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
      const duplicatePerson = person.filter(prs => prs.name === newName)
      if (duplicatePerson.length >0) {
        if (confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
          personService
            .update(duplicatePerson[0].id, personObject)
            .then(res => {
              setSearchList(person.map(prs => prs.id === duplicatePerson[0].id? res.data : prs))
              setNotificationMessage({
                message: `${res.data.name}'s number has been updated.`,
                type: 'success'
              })
              setTimeout(() => {
                setNotificationMessage({})
              }, 5000)
            })
        }
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
            setNotificationMessage({
              message: `${res.data.name} has been added.`,
              type: 'success'
            })
            setTimeout(() => {
              setNotificationMessage({})
            }, 5000)
          })
      } 
    },
    seachChangeHandler: (e) => {
      setsearch(e.target.value)
      e.target.value.length > 0 
      ? setSearchList(person.filter(prs => prs.name.toLowerCase().includes(e.target.value.toLowerCase())))
      : setSearchList(person)
    },
    deletePersonEventHandler: (id) => {
      const current = person.find(prs => prs.id === id)
      personService
      .remove(id)
      .then(res => {
        console.log(res.data)
        setPerson(person.filter(prs => prs.id !== id))
        setSearchList(person.filter(prs => prs.id !== id))
        setNotificationMessage({
          message: `${res.data.name} has been removed.`,
          type: 'success'
        })
          setTimeout(() => {
          setNotificationMessage({})
        }, 5000)
      })
      .catch(err => {
        setNotificationMessage({
          message: `${current.name} has already been removed from the server.`,
          type: 'error'
        })
        setSearchList(searchList.filter(person => person.id !== id))
          setTimeout(() => {
          setNotificationMessage({})
        }, 5000)
      })
    }
  }
  const {nameChangeHandler, addSubmitHandler, numberChangeHandler, seachChangeHandler, deletePersonEventHandler} = eventHandler

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={seachChangeHandler} />
      <h2>Add a New Contact</h2>
      <Notification message={notificationMessage.message} type={notificationMessage.type} />
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