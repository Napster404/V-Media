import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000'
    // baseURL: 'https://network-backend-server.herokuapp.com/'
})

export default instance  