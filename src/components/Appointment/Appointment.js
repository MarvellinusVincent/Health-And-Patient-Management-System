import { useState, useMemo, useCallback } from "react";
import { Rating } from 'primereact/rating';
import { Datepicker, getJson, Page, setOptions } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

import { SiIfixit } from "react-icons/si";
import { IoIosCloseCircle } from "react-icons/io";
import { GoCheckCircleFill } from "react-icons/go";
import doctorImage from "../../assets/images/doctor.jpg";
import Survey from "../Survey/Survey";
import "./Appointment.css";

setOptions({
    theme: 'windows',
    themeVariant: 'light'
});

export default function Appointment({ setAppointmentIsOpen, selectedDoctor }) {
    const [multiple, setMultiple] = useState(['2024-03-11T00:00', '2024-03-16T00:00', '2024-03-17T00:00']);
    const min = '2024-03-22T00:00';
    const max = '2024-09-22T00:00';
    const [singleLabels, setSingleLabels] = useState([]);
    const [singleInvalid, setSingleInvalid] = useState([]);
    const [datetimeLabels, setDatetimeLabels] = useState([]);
    const [datetimeInvalid, setDatetimeInvalid] = useState([]);
    const [multipleLabels, setMultipleLabels] = useState([]);
    const [multipleInvalid, setMultipleInvalid] = useState([]);

    const [surveyIsOpen, setSurveyIsOpen] = useState(false);

    const invalid = useMemo(() => {
        return [{
            start: '2024-03-22T08:00',
            end: '2024-03-22T13:00'
        }, {
            start: '2024-03-22T15:00',
            end: '2024-03-22T17:00'
        }, {
            start: '2024-03-22T19:00',
            end: '2024-03-22T20:00'
        }];
    }, []); // Dependencies array is empty, indicating this memoization doesn't depend on props or state

    const labels = useMemo(() => {
        return [{
            start: '2024-03-21',
            textColor: '#e1528f',
            title: '2 SPOTS'
        }];
    }, []); // Similarly, an empty dependencies array

    const handlePageLoadingSingle = useCallback((args) => {
        const d = args.firstDay;

        getJson(
            'https://mobiscroll.com/getprices/?year=' + d.getFullYear() + '&month=' + d.getMonth(),
            (bookings) => {
                for (let i = 0; i < bookings.length; ++i) {
                    const booking = bookings[i];
                    const d = new Date(booking.d);

                    if (booking.price > 0) {
                        labels.push({
                            start: d,
                            title: '$' + booking.price,
                            textColor: '#e1528f',
                        });
                    } else {
                        invalid.push(d);
                    }
                }
                setSingleLabels(labels);
                setSingleInvalid(invalid);
            },
            'jsonp',
        );
    }, []);

    const handlePageLoadingDatetime = useCallback((args) => {
        const d = args.firstDay;
        const invalid = [];
        const labels = [];

        getJson(
            'https://mobiscroll.com/getbookingtime/?year=' + d.getFullYear() + '&month=' + d.getMonth(),
            (bookings) => {
                for (let i = 0; i < bookings.length; ++i) {
                    const booking = bookings[i];
                    const d = new Date(booking.d);

                    if (booking.nr > 0) {
                        labels.push({
                            start: d,
                            title: booking.nr + ' SPOTS',
                            textColor: '#e1528f',
                        });
                        invalid.push(...booking.invalid);
                    } else {
                        invalid.push(d);
                    }
                }
                setDatetimeLabels(labels);
                setDatetimeInvalid(invalid);
            },
            'jsonp',
        );
    }, []);

    const handlePageLoadingMultiple = useCallback((args) => {
        const d = args.firstDay;
        const invalid = [];
        const labels = [];

        getJson(
            'https://mobiscroll.com/getbookings/?year=' + d.getFullYear() + '&month=' + d.getMonth(),
            (bookings) => {
                for (let i = 0; i < bookings.length; ++i) {
                    const booking = bookings[i];
                    const d = new Date(booking.d);

                    if (booking.nr > 0) {
                        labels.push({
                            start: d,
                            title: booking.nr + ' SPOTS',
                            textColor: '#e1528f',
                        });
                    } else {
                        invalid.push(d);
                    }
                }
                setMultipleLabels(labels);
                setMultipleInvalid(invalid);
            },
            'jsonp',
        );
    }, []);

    const handleChangeMultiple = useCallback((args) => {
        setMultiple(args.value);
    }, []);

    const covidSupport = (support) => {
        if(support) {
            return <GoCheckCircleFill className="green" />
        } else {
            return <SiIfixit className="red" />
        }
    }

    return (
        <div className="appointment">
            <div className="appointment-modal">
                <IoIosCloseCircle className="close-btn" onClick={() => setAppointmentIsOpen(false)} />
                <div className="appointment-header">
                    <img src={doctorImage} alt="Doctor" />
                    <h1>{selectedDoctor.fullName}</h1>
                </div>
                <div className="appointment-content">
                    <div className="doctor-details">
                        <div className="doctor-location">
                            <h2>Location</h2>
                            <p>{selectedDoctor.streetAddress}</p>
                            <p>{selectedDoctor.city}, {selectedDoctor.country} {selectedDoctor.zipCode}</p>
                        </div>
                        <div className="doctor-specializations">
                            <div className="doctor-specializations-header">
                                <h2>Specializations</h2>
                                <span>
                                    {covidSupport(selectedDoctor.supportCovid)}
                                    <p>COVID-19 care</p>
                                </span>
                            </div>
                            <ul>
                                <li>{selectedDoctor.specialization}</li>
                            </ul>
                        </div>
                        <div className="doctor-reviews">
                            <div className="doctor-reviews-header">
                                <h2>Reviews</h2>
                                <div className="doctor-rating">
                                    <Rating value={5} readOnly cancel={false} className="rating" />
                                    <p>(4)</p>
                                </div>
                            </div>
                            <div className="doctor-reviews-content">
                                <div className="doctor-review">
                                    <div className="doctor-review-details">
                                        <h3>Ethan Behar</h3>
                                        <div className="doctor-rating">
                                            <Rating value={5} readOnly cancel={false} className="rating" />
                                        </div>
                                    </div>
                                    <p>Excellent</p>
                                </div>
                                <div className="doctor-review">
                                    <div className="doctor-review-details">
                                        <h3>Jack Joliet</h3>
                                        <div className="doctor-rating">
                                            <Rating value={5} readOnly cancel={false} className="rating" />
                                        </div>
                                    </div>
                                    <p>The doctor was ok.</p>
                                </div>
                                <div className="doctor-review">
                                    <div className="doctor-review-details">
                                        <h3>Jack Joliet</h3>
                                        <div className="doctor-rating">
                                            <Rating value={5} readOnly cancel={false} className="rating" />
                                        </div>
                                    </div>
                                    <p>The doctor was ok.</p>
                                </div>
                                <div className="doctor-review">
                                    <div className="doctor-review-details">
                                        <h3>Jack Joliet</h3>
                                        <div className="doctor-rating">
                                            <Rating value={5} readOnly cancel={false} className="rating" />
                                        </div>
                                    </div>
                                    <p>The doctor was ok.</p>
                                </div>
                                <div className="doctor-review">
                                    <div className="doctor-review-details">
                                        <h3>Jack Joliet</h3>
                                        <div className="doctor-rating">
                                            <Rating value={5} readOnly cancel={false} className="rating" />
                                        </div>
                                    </div>
                                    <p>The doctor was ok.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="book-an-appointment">
                        <h2>Book an Appointment</h2>
                        <Page className="md-calendar-booking">
                            <div className="mbsc-form-group">
                                <Datepicker
                                    display="inline"
                                    controls={['calendar', 'timegrid']}
                                    min={min}
                                    max={max}
                                    minTime="08:00"
                                    maxTime="19:59"
                                    stepMinute={60}
                                    width={null}
                                    labels={datetimeLabels}
                                    invalid={datetimeInvalid}
                                    onPageLoading={handlePageLoadingDatetime}
                                    cssClass="booking-datetime"
                                    onChange={() => {
                                        setSurveyIsOpen(true);
                                    }}
                                />
                                {surveyIsOpen && (
                                    <Survey setSurveyIsOpen={setSurveyIsOpen} />
                                )}
                            </div>
                        </Page>
                    </div>
                </div>
            </div>
        </div>
    );
}