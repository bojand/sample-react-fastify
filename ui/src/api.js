import axios from 'axios'
import { baseURL } from './config.json'

const apiClient = axios.create({ baseURL })

const getGreeting = (name, greeting, excited) => {
  return apiClient.get('/greet', {
    params: { name, greeting, excited }
  })
}

const API = {
  getGreeting
}

export default API