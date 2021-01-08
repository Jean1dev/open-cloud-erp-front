import axios from 'axios'

export const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://api-open-cloud-erp.herokuapp.com'

const instance = axios.create({
    baseURL
})

export default instance 