import { create } from "apisauce"


const apiClient = create({
    baseURL: 'http://192.168.0.219:3000',
    headers: { Accept: 'application/vnd.github.v3+json' },
 })
 
 export default apiClient
 
 