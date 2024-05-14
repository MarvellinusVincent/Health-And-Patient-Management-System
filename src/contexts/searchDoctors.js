import axios from "axios";
import { API_URL } from "../services/config";

const searchDoctors = async (searchData) => {

        const params = {};
        if (searchData.speciality) {
            params.specialization = searchData.speciality;
        }
        if (searchData.doctorName) {
            params.name = searchData.doctorName;
        }
        if (searchData.covid19Care) {
            params.covidSupport = searchData.covid19Care;
        }
        console.log("params", params);

        const response = await axios.get(`${API_URL}/searchDoctors`, { params });
        return response;
}

export default searchDoctors;