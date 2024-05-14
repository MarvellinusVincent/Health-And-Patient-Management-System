import axios from "axios";
import { API_URL } from "../services/config";

const getUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/getUser`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; 
    }
}

export default getUser;