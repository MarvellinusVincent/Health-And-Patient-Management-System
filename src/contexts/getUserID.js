import axios from "axios";
import { API_URL } from "../services/config";

const getUserID = async (userID) => {
    try {
        const response = await axios.get(`${API_URL}/getUserID?userID=${userID}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; 
    }
}

export default getUserID;