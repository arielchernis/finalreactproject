import { create } from "apisauce"


const apiClient = create({
    baseURL: 'http://192.168.49.145:3000',
    headers: { Accept: 'application/vnd.github.v3+json' },
 })
 
 export default apiClient
 
 