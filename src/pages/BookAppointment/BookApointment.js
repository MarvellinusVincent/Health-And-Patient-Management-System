import React, { useState, useEffect } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { Calendar } from "@progress/kendo-react-dateinputs";
import './BookAppointment.css';
import PatientHeader from '../../components/PatientHeader/PatientHeader';
import { Modal, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Rating } from 'primereact/rating';
import { ToastContainer, toast } from 'react-toastify';


const times = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00"
];


export default function BookAppointment(props) {
    const { doctorUid, theme } = useParams();
    const [pageTheme, setPageTheme] = useState(theme == "undefined" || "" ? "light" : theme);
    const [bookingDate, setBookingDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [experiencedSymptoms, setExperiencedSymptoms] = useState('No');
    const [closePhysicalContact, setClosePhysicalContact] = useState('No');
    const [positiveCovid90Days, setPositiveCovid90Days] = useState('No');
    const [selfMonitor, setSelfMonitor] = useState('No');
    const [wantCovidTest, setWantCovidTest] = useState('Yes');
    const [doctorInfo, setDoctorInfo] = useState({});
    const [bookingTimes, setBookingTimes] = useState(times);
    const [disabledSlots, setDisabledSlots] = useState([]);
    const navigate = useNavigate();

    console.log("param", doctorUid);
    useEffect(() => {
        if (doctorUid) {
            console.log("param1", doctorUid);
            const response = axios.get(`https://backend-careconnect360.onrender.com/doctorDetails?doctorUid=${doctorUid}`)

                .then(response => {
                    console.log("response", response.data)
                    setDoctorInfo(response.data);

                })
                .catch(error => {
                    console.error('Error fetching doctor details:', error);
                });
        }
    }, [doctorUid]);

    const onDateChange = e => {
        setSelectedTimeSlot(null);
        setBookingDate(e.value);
        const formattedDate = e.value.toISOString().split('T')[0];
        axios.get(`https://backend-careconnect360.onrender.com/checkAvailability?doctorUid=${doctorUid}&date=${formattedDate}`)
            .then(response => {
                const bookedSlots = response.data;
                console.log("Time slots", response.data)
                setDisabledSlots(bookedSlots);
            })
            .catch(error => {
                console.error('Error checking availability:', error);
                setDisabledSlots([]);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const apiUrl = `https://backend-careconnect360.onrender.com/bookAppointment`;
        const params = new URLSearchParams({
            doctorUid: doctorUid,
            date: bookingDate.toISOString().split('T')[0],
            time: selectedTimeSlot
        }).toString();

        const payload = {
            experiencedSymptoms,
            closePhysicalContact,
            positiveCovid90Days,
            selfMonitor,
            wantCovidTest
        };

        axios.post(`${apiUrl}?${params}`, payload)
            .then(response => {
                if (response.data === true) {
                    toast.success("Your appointment has been successfully booked.");
                    setTimeout(() => {
                        navigate(`/patient/appointments/${pageTheme}`);
                    }, 7000);
                   
                } else {
                    toast.error("Failed to book the appointment. Please try again.");
                }
                setShowModal(false);




            })
            .catch(error => {
                console.error('Error booking appointment:', error);
                alert("There was an error booking your appointment. Please check your information and try again.");

            });
    };


    const handleBookSlot = () => {
        setShowModal(true);
    };



    return (
        <div className={`content ${pageTheme}`}>
            <PatientHeader theme={pageTheme}/>
            <div><h2 className="insuranceheader">Schedule an Appointment</h2></div>
            <ToastContainer />
            <div className="book-appointment-container">
                <div className="booking-header">
                    <div className="doctor-info"><p><strong>Doctor Details</strong></p>
                        {doctorInfo ? (
                            <div>
                                <br />
                                <div className="doctor-info-card">

                                    <p><strong>Name:</strong> {doctorInfo.fullName}</p>
                                    <p><strong>Specialization:</strong> {doctorInfo.specialization}</p>
                                    <p><strong>Gender:</strong> {doctorInfo.gender}</p>
                                    <p><strong>Phone Number:</strong> {doctorInfo.phoneNumber}</p>
                                    <p><strong>Street Address:</strong> {doctorInfo.streetAddress}</p>
                                    <p><strong>City:</strong> {doctorInfo.city}</p>
                                    <p><strong>State:</strong> {doctorInfo.state}</p>
                                    <p><strong>Country:</strong> {doctorInfo.country}</p>
                                    <p><strong>Zip Code:</strong> {doctorInfo.zipCode}</p>
                                    <p><strong>Provides Covid Support:</strong> {doctorInfo.supportCovid ? "Yes" : "No"}</p>
                                    <p><strong>Feedbacks</strong></p>
                                    <p><strong>Average Rating</strong><Rating value={doctorInfo.averageRating} readOnly cancel={false} className="rating" /></p>
                                    <p><strong>Total Rating</strong><Rating value={doctorInfo.totalRating} readOnly cancel={false} className="rating" /></p>
                                    <p><strong>People Rating</strong><Rating value={doctorInfo.peopleRated} readOnly cancel={false} className="rating" /></p>
                                </div>


                            </div>
                        ) : (
                            <p>Loading doctor info...</p>
                        )}
                    </div>
                </div>

                <Calendar value={bookingDate} min={today} onChange={onDateChange} />
                <div className="time-slots-container">
                    {bookingTimes.map((time, index) => (
                        <button
                            key={index}
                            className={`time-slot-button ${selectedTimeSlot === time ? 'selected' : ''}`}
                            onClick={() => setSelectedTimeSlot(time)}
                            disabled={disabledSlots.includes(time)} // Disable slot if booked
                        >
                            {time}
                        </button>
                    ))}
                </div>


                {bookingDate && selectedTimeSlot && (
                    <div className="selected-slot-info">
                        <div className="bookingtime">
                            Selected slot: {bookingDate.toDateString()} at {selectedTimeSlot}</div>
                        <Button className='mt-4' onClick={handleBookSlot}>Book the slot</Button>
                    </div>
                )}
                <Modal show={showModal} fullscreen={true} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Covid-19 Symptom Check</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group >
                                <Form.Label>Have you experienced any COVID-19 symptoms recently?</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Yes"
                                    name="experiencedSymptoms"
                                    id="experiencedSymptomsYes"
                                    onChange={() => setExperiencedSymptoms('Yes')}
                                />
                                <Form.Check
                                    type="radio"
                                    label="No"
                                    name="experiencedSymptoms"
                                    id="experiencedSymptomsNo"
                                    onChange={() => setExperiencedSymptoms('No')}
                                    defaultChecked
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Have you been in close physical contact with someone who has COVID-19?</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Yes"
                                    name="closePhysicalContact"
                                    id="closePhysicalContactYes"
                                    onChange={() => setClosePhysicalContact('Yes')}
                                />
                                <Form.Check
                                    type="radio"
                                    label="No"
                                    name="closePhysicalContact"
                                    id="closePhysicalContactNo"
                                    onChange={() => setClosePhysicalContact('No')}
                                    defaultChecked
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Have you had a positive COVID-19 test in the last 90 days?</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Yes"
                                    name="positiveCovid90Days"
                                    id="positiveCovid90DaysYes"
                                    onChange={() => setPositiveCovid90Days('Yes')}
                                />
                                <Form.Check
                                    type="radio"
                                    label="No"
                                    name="positiveCovid90Days"
                                    id="positiveCovid90DaysNo"
                                    onChange={() => setPositiveCovid90Days('No')}
                                    defaultChecked
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Has a public health or medical professional told you to self-monitor or self-quarantine because of COVID-19?</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Yes"
                                    name="selfMonitor"
                                    id="selfMonitorYes"
                                    onChange={() => setSelfMonitor('Yes')}
                                />
                                <Form.Check
                                    type="radio"
                                    label="No"
                                    name="selfMonitor"
                                    id="selfMonitorNo"
                                    onChange={() => setSelfMonitor('No')}
                                    defaultChecked
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Would you like a COVID-19 test?</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Yes"
                                    name="wantCovidTest"
                                    id="wantCovidTestYes"
                                    onChange={() => setWantCovidTest('Yes')}
                                    defaultChecked
                                />
                                <Form.Check
                                    type="radio"
                                    label="No"
                                    name="wantCovidTest"
                                    id="wantCovidTestNo"
                                    onChange={() => setWantCovidTest('No')}

                                />
                            </Form.Group>

                            <Button type="submit">Submit</Button>

                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}
