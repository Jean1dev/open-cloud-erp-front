import axios from 'axios'
import { toast } from 'react-hot-toast';

//export const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://api-open-cloud-erp-bc78e9246ecc.herokuapp.com'
export const baseURL = 'https://api-open-cloud-erp-bc78e9246ecc.herokuapp.com'

const instance = axios.create({
    baseURL
})

instance.interceptors.response.use((response) => {
    return response
}, (error) => {
    console.log(error.response?.data)

    if (!error.response){
        toast.error('Erro interno')
        throw error
    }
        
    const messages = error.response.data.details || null
    if (messages) {
        messages.forEach(element => {
            toast.error(element)    
        });
    }

    throw error
})

export function addXTenant(tenant) {
    instance.defaults.headers.common['X-Tenant'] = tenant.replace(' ', '_').toLowerCase()
}

export default instance 
