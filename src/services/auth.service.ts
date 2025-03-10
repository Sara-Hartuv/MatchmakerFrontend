import { ENDPOINTS } from "../api/endpoints"
import axios from "../utils/axios"

export const login = async (email: string, password: string) => {
    const response = await axios.post<string>(ENDPOINTS.login, { email, password })
    return {
        user: { email, password },
        token: response.data
    }
}
