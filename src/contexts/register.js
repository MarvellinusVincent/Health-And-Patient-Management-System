import axios from "axios";
import { API_URL } from "../services/config";



const register = async (userData, email, password) => {
    console.log("Payload2 ", userData);


    const endpoint = `${API_URL}/signUp?email=${email}&password=${password}`;


    const response = await axios.post(endpoint, JSON.stringify(userData), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });


    return response.data;

};

export default register;