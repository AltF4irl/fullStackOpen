import axios from 'axios'
const baseURl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseURl)

const create = (newPerson) => axios.post(baseURl, newPerson)

const remove = (id) => axios.delete(`${baseURl}/${id}`)

export default {getAll, create, remove}
