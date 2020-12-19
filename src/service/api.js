import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://api-open-cloud-erp.herokuapp.com'
})

export default instance 