import axios from 'axios'
const baseURl = '/api/contacts'

const getAll = () => axios.get(baseURl)

const create = (newPerson) => axios.post(baseURl, newPerson)

const remove = (id) => axios.delete(`${baseURl}/${id}`)

const update = (id, personToUpdate) => axios.put(`${baseURl}/${id}`, personToUpdate)

export default {getAll, create, remove, update}
