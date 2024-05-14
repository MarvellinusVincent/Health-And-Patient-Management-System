import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import doctorImage from "../../assets/images/doctor.jpg";
import "./Survey.css";

export default function Survey({ setSurveyIsOpen, selectedDateTime }) {
    const [experienced, setExperienced] = useState("");
    const [inContact, setInContact] = useState("");
    const [positiveTest, setPositiveTest] = useState("");
    const [selfQuarantine, setSelfQuarantine] = useState("");
    const [covid19Test, setCovid19Test] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="survey">
            <div className="survey-modal">
                <IoIosCloseCircle
                    className="close-btn"
                    onClick={() => setSurveyIsOpen(false)}
                />
                <div className="survey-header">
                    <img src={doctorImage} alt="Doctor" />
                    <h1>Jack Joliet</h1>
                </div>
                <div className="survey-content">
                    <h2>COVID-19 Survey</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="question">
                            <h3>
                                Have you experienced any of the following in the past 48 hours:
                            </h3>
                            <ol>
                                <li>fever or chills</li>
                                <li>cough</li>
                                <li>shortness of breath of difficulty breathing</li>
                                <li>fatigue</li>
                                <li>muscle or body aches</li>
                                <li>headache</li>
                                <li>new loss of taste or smell</li>
                                <li>sore throat</li>
                                <li>congestion or runny nose</li>
                                <li>nausea or vomiting</li>
                                <li>diarrhea</li>
                            </ol>
                            <div className="answer-radio-buttons">
                                <div>
                                    <input
                                        type="radio"
                                        name="experienced"
                                        id="yes"
                                        value="YES"
                                        checked={experienced === "YES"}
                                        onChange={(event) => setExperienced(event.target.value)}
                                    />
                                    <label htmlFor="yes">YES</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="experienced"
                                        id="no"
                                        value="NO"
                                        checked={experienced === "NO"}
                                        onChange={(event) => setExperienced(event.target.value)}
                                    />
                                    <label htmlFor="no">NO</label>
                                </div>
                            </div>
                        </div>
                        <div className="question">
                            <h3>
                                Within the past 14 days, have you been in close physical contact
                                (6 feet or closer for a cumulative total of 15 minutes) with:
                            </h3>
                            <ol>
                                <li>
                                    Anyone who is known to have laboratory-confirmed COVID-19?
                                </li>
                                <li>Anyone who has any symptoms consistent with COVID-19?</li>
                            </ol>
                            <div className="answer-radio-buttons">
                                <div>
                                    <input
                                        type="radio"
                                        name="in-contact"
                                        id="yes"
                                        value="YES"
                                        checked={inContact === "YES"}
                                        onChange={(event) => setInContact(event.target.value)}
                                    />
                                    <label htmlFor="yes">YES</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="in-contact"
                                        id="no"
                                        value="NO"
                                        checked={inContact === "NO"}
                                        onChange={(event) => setInContact(event.target.value)}
                                    />
                                    <label htmlFor="no">NO</label>
                                </div>
                            </div>
                        </div>
                        <div className="question">
                            <h3>
                                Have you had a COVID-19 positive test in the last 90 days?
                            </h3>
                            <div className="answer-radio-buttons">
                                <div>
                                    <input
                                        type="radio"
                                        name="positive-test"
                                        id="yes"
                                        value="YES"
                                        checked={positiveTest === "YES"}
                                        onChange={(event) => setPositiveTest(event.target.value)}
                                    />
                                    <label htmlFor="yes">YES</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="positive-test"
                                        id="no"
                                        value="NO"
                                        checked={positiveTest === "NO"}
                                        onChange={(event) => setPositiveTest(event.target.value)}
                                    />
                                    <label htmlFor="no">NO</label>
                                </div>
                            </div>
                        </div>
                        <div className="question">
                            <h3>
                                Within the past 14 days, has a public health or medical
                                professional told you to self-monitor, self-isolate, or
                                self-quarantine because of concerns about COVID-19 infection?
                            </h3>
                            <div className="answer-radio-buttons">
                                <div>
                                    <input
                                        type="radio"
                                        name="self-quarantine"
                                        id="yes"
                                        value="YES"
                                        checked={selfQuarantine === "YES"}
                                        onChange={(event) => setSelfQuarantine(event.target.value)}
                                    />
                                    <label htmlFor="yes">YES</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="self-quarantine"
                                        id="no"
                                        value="NO"
                                        checked={selfQuarantine === "NO"}
                                        onChange={(event) => setSelfQuarantine(event.target.value)}
                                    />
                                    <label htmlFor="no">NO</label>
                                </div>
                            </div>
                        </div>
                        <div className="question">
                            <h3>Would you like a COVID-19 test?</h3>
                            <div className="answer-radio-buttons">
                                <div>
                                    <input
                                        type="radio"
                                        name="covid19-test"
                                        id="yes"
                                        value="YES"
                                        checked={covid19Test === "YES"}
                                        onChange={(event) => setCovid19Test(event.target.value)}
                                    />
                                    <label htmlFor="yes">YES</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="covid19-test"
                                        id="no"
                                        value="NO"
                                        checked={covid19Test === "NO"}
                                        onChange={(event) => setCovid19Test(event.target.value)}
                                    />
                                    <label htmlFor="no">NO</label>
                                </div>
                            </div>
                        </div>
                        <div className="appointment-details">
                            <h2>Appointment Details</h2>
                            <div>
                                <p>Doctor: Jack Joliet</p>
                                <p>Date: {new Date(selectedDateTime).toLocaleDateString()}</p>
                                <p>Time: {new Date(selectedDateTime).toLocaleTimeString()}</p>
                            </div>
                        </div>
                        <button type="submit">BOOK APPOINTMENT</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
