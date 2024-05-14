import axios from "axios";
import { API_URL } from "../services/config";

const getCurrentAppointments = async () => {
        const response = await axios.get(`${API_URL}/doctorCurrentAppointments`);
        return response;
}

export default getCurrentAppointments;