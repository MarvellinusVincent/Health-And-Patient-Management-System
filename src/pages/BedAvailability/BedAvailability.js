import { useState, useEffect } from 'react';
import DoctorHeader from "../../components/DoctorHeader/DoctorHeader";
import "./BedAvailability.css";
import { useParams } from "react-router-dom";


export default function BedAvailability() {
    const {theme} = useParams();
    const [pageTheme, setPageTheme] = useState(theme == "undefined" ? "light" : theme);
    
    console.log("Theme: ", theme);
    const [hospitals, setHospitals] = useState([
        {
            hospital: 'St Helena Hospital',
            address: "123 Main St Bloomington, IN 47408",
            phone: "812-123-4567",
            covidSupport: true,
            beds: 10,
            available: 5
        },
        {
            hospital: 'IU Health Bloomington Hospital',
            address: "123 Main St Bloomington, IN 47408",
            phone: "812-123-4567",
            covidSupport: false,
            beds: 15,
            available: 2
        },
        {
            hospital: 'Monroe Hospital',
            address: "123 Main St Bloomington, IN 47408",
            phone: "812-123-4567",
            covidSupport: true,
            beds: 20,
            available: 10
        },
        {
            hospital: 'IU Health Bedford Hospital',
            address: "123 Main St Bloomington, IN 47408",
            phone: "812-123-4567",
            covidSupport: true,
            beds: 5,
            available: 0
        }
    ]);

    const displayHospitals = () => {
        
        return hospitals.map((hospital, index) => {
            return (
                <div className="hospital" key={index}>
                    <div className="dr-info">
                        <h1>{hospital.hospital}</h1>
                        <h3><span class="title">Address:</span> {hospital.address}</h3>
                        <h3><span class="title">Phone:</span> {hospital.phone}</h3>
                        <h3><span class="title">Covid Support:</span> {hospital.covidSupport ? "Yes" : "No"}</h3>
                        <h3><span class="title">Total Beds:</span> {hospital.beds}</h3>
                        <h3><span class="title">Beds Available:</span> {hospital.available}</h3>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className={`doctor-page ${pageTheme}`}>
            <DoctorHeader theme={pageTheme}/>
            <div className={`content ${pageTheme}`}>
                <h1 className="welcome">Beds Available</h1>
                <div className="hospitals">
                    {displayHospitals()}
                </div>
            </div>
        </div>
    );
};