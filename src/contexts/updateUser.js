import axios from "axios";
import { API_URL } from "../services/config";

const updateUser = async (newUser) => {
    try {
        const response = await axios.put(`${API_URL}/updateUser`, JSON.stringify(newUser), {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    } catch (error) {
        console.error("Error updating user data:", error);
        throw error; // Re-throw the error for handling in the calling code
    }
};

export default updateUser;