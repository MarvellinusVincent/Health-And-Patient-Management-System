import axios from "axios";
import { API_URL } from "../services/config";

const getInsuranceProvidersPlans = async () => {
    const response = await axios.get(`${API_URL}/getInsurancePlans`);
    return response;
}

export default getInsuranceProvidersPlans;