import axios from "axios";
import { API_URL } from "../services/config";

const getDoctorRatings = async () => {
        try {
                const response = await axios.get(`${API_URL}/doctorRatings`);
                console.log("RESPONSE: ", response);
                return response.data; // Return only the data part of the response
        } catch (error) {
                // Log the error for debugging
                console.error("Error fetching doctor ratings:", error);
                throw error; // Re-throw the error to handle it in the calling function
        }
}

export default getDoctorRatings;