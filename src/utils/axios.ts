import axios from 'axios'
import { authRequestMiddleware, authResponseMiddleware } from './authMiddleware'
const url = 'https://localhost:7242/api'

const axiosInstance = axios.create({ baseURL: url })

axiosInstance.interceptors.request.use(authRequestMiddleware)

axiosInstance.interceptors.response.use(authResponseMiddleware)

export default axiosInstance