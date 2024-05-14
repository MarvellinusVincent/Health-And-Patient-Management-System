import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientHeader from "../../components/PatientHeader/PatientHeader";
import { Accordion, Card, Button } from 'react-bootstrap';
import "./MyInsurance.css";

export default function MyInsurance() {
    const [insuranceData, setInsuranceData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://backend-careconnect360.onrender.com/patientInsuranceProviders');
                setInsuranceData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();

     
        const tawkToScript = document.createElement("script");
        tawkToScript.async = true;
        tawkToScript.src = "https://embed.tawk.to/6625a7621ec1082f04e54dba/1hs1hbma4";
        tawkToScript.charset = "UTF-8";
        tawkToScript.setAttribute('crossorigin', '*');
        document.body.appendChild(tawkToScript);

        
        return () => {
            document.body.removeChild(tawkToScript);
        };
    }, []);

    return (
        <div className="myinsurance">
            <PatientHeader />
            <div><h2 className="insuranceheader">My Insurance Plans</h2></div>
            <Accordion defaultActiveKey="0" style={{ margin: '30px' }}>
                {insuranceData && insuranceData.map((item, index) => (
                    <Accordion.Item eventKey={String(index)} key={index}>
                        <Accordion.Header><strong>Plan Name:</strong> {item.planName || "No Plan Name"}</Accordion.Header>
                        <Accordion.Body>
                            <div><strong>Deductible:</strong> ${item.deductible || "N/A"}</div>
                            <div><strong>Premium:</strong> ${item.premium ? item.premium.toLocaleString() : "N/A"}</div>
                            <div><strong>Dental Coverage:</strong> {item.dentalCoverage ? "Yes" : "No"}</div>
                            <div><strong>Medical Coverage:</strong> {item.medicalCoverage ? "Yes" : "No"}</div>
                            <div><strong>Vision Coverage:</strong> {item.visionCoverage ? "Yes" : "No"}</div>
                            <div><strong>Description:</strong> {item.description || "N/A"}</div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}
