import axios from "axios";
import { API_URL } from "../services/config";


const FinishAppointment = async (patientUid, date, time, appointmentDetails) => {
    try {
        const response = await axios.post(`${API_URL}/finishAppointment?patientUid=${patientUid}&date=${date}&time=${time}`, appointmentDetails);
        return response;
    } catch (error) {
        // Log the error for debugging
        console.error("Error finishing appointment:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

export default FinishAppointment;
