import axios from "axios";
import { API_URL } from "../services/config";

const getsigninotp = async (token) => {
    const payload = {
        idToken: token
    };
    console.log("sign in wala token", token);
    const response = await axios.post(`${API_URL}/signIn`, payload, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
};

const verifyOTP = async (otp) => {

    console.log("sign in wala otp", otp);
    const response = await axios.post(`${API_URL}/verifyPin?pinCode=${otp}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
};

const signin = {
    getsigninotp,
    verifyOTP
};

export default signin;