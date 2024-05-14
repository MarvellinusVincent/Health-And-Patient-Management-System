import { Link } from "react-router-dom";
import PatientHeader from "../../components/PatientHeader/PatientHeader";
import "./Patient.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function Patient() {
    const {theme} = useParams();
    const [pageTheme, setPageTheme] = useState(theme == "undefined" || "" ? "light" : theme);


    return (
        <div className={`patient-page ${pageTheme}`}>
            <PatientHeader theme={pageTheme}/>
            <div className="patient-content">
                <h1 className="patient-welcome">Hello User</h1>
                <div className="covid-19-precautions">
                    <h2>Key Recommendations to Prevent COVID-19</h2>
                    <hr />
                    <ul>
                        <ol>
                            <li>
                                Don't forget hand hygiene! Wash with soap and water or use sanitizer regularly.
                            </li>
                            <li>
                                Cover your coughs and sneezes with your elbow or a disposable tissue.                            </li>
                            <li>
                                Maintain a safe distance from individuals who are sneezing, coughing, or experiencing a fever.
                            </li>
                            <li>
                                Wash food, cutlery, and shared objects before sharing.
                            </li>
                            <li>
                                Wear a mask when you're around others, especially in crowded indoor spaces.
                            </li>
                        </ol>
                    </ul>
                    <h3>FEELING SICK? GET A COVID-19 TEST RIGHT AWAY IF YOU HAVE SYMPTOMS!</h3>
                    <p>If you test positive or think you might have COVID-19, isolate yourself for two weeks.</p>
                </div>
                <div className="patient-services">
                    <div className="find-a-doctor">
                        <h2>Find a Doctor</h2>
                        <hr />
                        <p>Need a doctor? We've got you covered! Find specialists in your area, read what other patients say, and easily chat with doctors to get the answers you need.</p>
                        <Link to={`/patient/doctor/${pageTheme}`}>
                            <button>BOOK AN APPOINTMENT</button>
                        </Link>
                    </div>
                    <div className="find-an-insurance">
                        <h2>My Insurance</h2>
                        <hr />
                        <p>CareConnect360 simplifies your healthcare experience. Check your provider and plan, and it's instantly available and clear for all your doctors to see.</p>
                        <Link to={`/patient/myinsurance/${pageTheme}`}>
                            <button>MY PLANS</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}