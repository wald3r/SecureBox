import axios from 'axios'

const baseUrl = '/api/users'

let token = null


const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAllUsers = async () => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response
}


const changeRole = async (id) =>  {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(`${baseUrl}/roles/${id}`, config)
  return response
}

const updateUserDetails = async (details, id) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/details/${id}`, details, config)
  return response
}

const checkUserPassword = async (password, id) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/check/${id}`, password, config)
  return response

}

const updateUserPassword = async (password, id) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/password/${id}`, password, config)
  return response
}


export default { updateUserDetails, updateUserPassword, setToken, getAllUsers, checkUserPassword, changeRole }