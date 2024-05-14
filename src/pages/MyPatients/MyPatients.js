import DoctorHeader from "../../components/DoctorHeader/DoctorHeader";
import { useState, useEffect } from 'react';
import PatientCard from "./PatientCard";
import "./MyPatients.css";
import getCurrentAppointments from "../../contexts/getCurrentAppointments";
import { useParams } from "react-router-dom";

export default function MyPatients() {
    const {theme} = useParams();
    const [patients, setPatients] = useState([
        {
            closePhysicalContact: "no",
            formattedDate: "2021-09-01",
            experiencedSymptoms: "no",
            patientName: "John Doe",
            patientUid: "123456",
            positiveCovid90Days: "no",
            selfMonitor: "no",
            time: "12:00",
            wantCovidTest: "yes"
        },
        {
            closePhysicalContact: "no",
            formattedDate: "2021-09-01",
            experiencedSymptoms: "no",
            patientName: "Jane Doe",
            patientUid: "123456",
            positiveCovid90Days: "no",
            selfMonitor: "no",
            time: "12:00",
            wantCovidTest: "yes"
        }
    ]);


    const fetchAppointments = async () => {
        try{
            const response = await getCurrentAppointments(); 
            console.log("RESPONSE:")
            console.log(response);
            const appointments = response.data;
            console.log(appointments);
            setPatients(appointments); 
        }
        catch(error){
            setPatients([]);
            console.error("Error fetching appointments data", error);
        }
    };

    const generatePatients = () => {
        // Generate your patient data here
        const generatedPatients = [
            {
                closePhysicalContact: "no",
                formattedDate: "2021-09-01",
                experiencedSymptoms: "no",
                patientName: "John Doe",
                patientUid: "123456",
                positiveCovid90Days: "no",
                selfMonitor: "no",
                time: "12:00",
                wantCovidTest: "yes"
            },
            {
                closePhysicalContact: "no",
                formattedDate: "2021-09-01",
                experiencedSymptoms: "no",
                patientName: "Jane Doe",
                patientUid: "123456",
                positiveCovid90Days: "no",
                selfMonitor: "no",
                time: "12:00",
                wantCovidTest: "yes"
            }
        ];
        setPatients(generatedPatients);
    };


    useEffect(() => {
        if (patients.length === 0) {
            generatePatients();
        } else {
            fetchAppointments();
        }
    }, []);

    const displayPatients = () => {

        if (patients.length === 0) {
            return <p>No patients found</p>;
        }

        return patients.map((patient, index) => {
            return (
                <PatientCard
                    key={index}
                    patientName={patient.patientName}
                    formattedDate={patient.formattedDate}
                    time={patient.time ? patient.time : "10:00 AM"}
                    closePhysicalContact={patient.closePhysicalContact}
                    experiencedSymptoms={patient.experiencedSymptoms}
                    positiveCovid90Days={patient.positiveCovid90Days}
                    selfMonitor={patient.selfMonitor}
                    wantCovidTest={patient.wantCovidTest}
                    patientUID={patient.patientUid}
                    theme={theme}
                />
            );
        });
    };

    return (
        <div className={`doctor-page ${theme}`}>
            <DoctorHeader theme={theme}/>
            <div className="content">
                <h1 className="welcome">Your Patients</h1>
                <div className={`cards ${theme}`}>
                    {displayPatients()}
                </div>
                
            </div>
        </div>
    );
};