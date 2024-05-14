import { useState, useEffect } from 'react';
import axios from 'axios';
import PatientHeader from "../../components/PatientHeader/PatientHeader";
import "./PatientAppointments.css";
import userPlaceholder from "../../assets/images/user-placeholder.png";
import { Modal, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Rating } from 'primereact/rating';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function PatientAppointments() {
    const [patients, setPatients] = useState([]);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [ratings, setRatings] = useState('');
    const [comments, setComments] = useState('');
    const naviagte = useNavigate();

    const {theme} = useParams();
    const [pageTheme, setPageTheme] = useState(theme == "undefined" || "" ? "light" : theme);

    
    useEffect(() => {
        axios.get('https://backend-careconnect360.onrender.com/patientUpcomingAppointments')
            .then(response => {
                console.log("API Response: ", response.data);
                setPatients(response.data);
            })
            .catch(error => {
                console.error('Error fetching appointment details:', error);
            });
    }, []);

    const handleOpenReviewModal = (appointment) => {
        setSelectedAppointment(appointment);
        setComments('');
        setRatings(null);
        setShowReviewModal(true);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!selectedAppointment) return;

        const { doctorUid, formattedDate, time } = selectedAppointment;
        const apiUrl = `https://backend-careconnect360.onrender.com/postDoctorReview`;
        const params = new URLSearchParams({
            doctorUid,
            date: formattedDate,
            time
        }).toString();
        console.log("body", comments, ratings)
        try {
            const response = await axios.post(`${apiUrl}?${params}`, {
                review: comments,
                stars: ratings
            });
            console.log("Submit Review Response:", response.data);

            toast.success("Thank you for submitting the review!");
            setTimeout(() => {
                naviagte(`/patient/dashboard/${pageTheme}`);
            }, 7000);
            setShowReviewModal(false);
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error("There was some problem submitting the review. Please try again later.");
        }
    };

    return (
        <div className={`doctor-page ${pageTheme}`}>
            <PatientHeader theme={pageTheme}/>
            <ToastContainer />
            <div className={`cards ${pageTheme}`}>
                {patients && patients.map((item, index) => (
                    <div key={index} className="card mt-4" onClick={() => handleOpenReviewModal(item)}>
                        <img src={userPlaceholder} alt="User Placeholder" />
                        <p className="name">{item.doctorName}</p>
                        <p>Date: {item.formattedDate}</p>
                        <p>Time: {item.time}</p>
                        <Button className="mt-4" onClick={() => handleOpenReviewModal(item)}>Leave a Review</Button>
                    </div>
                ))}
            </div>
            <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Leave a Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitReview}>
                        <>
                            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    style={{ height: '100px' }}
                                />

                            </FloatingLabel>
                            <p className='mt-4'>Ratings</p>
                            <Rating value={ratings} onChange={(e) => setRatings(e.value)} cancel={false} className="rating" />

                            <Button type="submit" className='mt-4'>Submit Review</Button>
                        </>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
