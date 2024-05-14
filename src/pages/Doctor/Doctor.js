import { Link, useParams } from "react-router-dom";
import DoctorHeader from "../../components/DoctorHeader/DoctorHeader";
import userPlaceholder from "../../assets/images/user-placeholder.png";
import { useState, useEffect } from 'react';
import ReviewItem from "./ReviewItem";
import getDoctorRatings from "../../contexts/getDoctorRatings";
import getUser from "../../contexts/getUser";
import "./Doctor.css";
import { set } from "date-fns/set";
import React from 'react';


export default function Doctor() {
    const {theme} = useParams();
    const [pageTheme, setPageTheme] = useState(theme == "undefined" || "" ? "light" : theme);

    console.log("Theme: ", theme);
    console.log("Pagetheme", pageTheme);
    
    const [userProfilePictureUrl, setUserProfilePictureUrl] = useState("");
    const [avgRating, setAvgRating] = useState(0);
    const [reviews, setReviews] = useState([

    ]);
    const [drInfo, setDrInfo] = useState({});


    const fetchRatings = async () => {
        try {
            const response = await getDoctorRatings();
            console.log("Ratings: ", response);
            console.log(response)
            setReviews(response);
        } catch (error) {
            console.error("Error fetching ratings: ", error);
        }
    }


    const fetchInfo = async () => {
        try {
            const userData = await getUser();
            console.log(userData);
            if(userData){
            setDrInfo({
                name: userData.lastName,
                specialty: userData.specialization
            });
            if (userData.profilePictureUrl) {
                setUserProfilePictureUrl(userData.profilePictureUrl);
              } else {
                setUserProfilePictureUrl("");
              }
        }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchInfo(); 
        fetchRatings();
    }, []);

    useEffect(() => {
        setAvgRating(calculateAverageRating());
    }, [reviews]);

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((acc, curr) => acc + parseInt(curr.stars), 0);
        const averageRating = totalRating / reviews.length;
        return Math.round(averageRating * 10) / 10;
    };

    const displayReviews = () => {
        if (reviews.length === 0) {
            return <p>No reviews yet</p>;
        }
        return reviews.map((review, index) => (
            <ReviewItem key={index} {...review} />
        ));
    }

    return (
        <div className={`doctor-page ${pageTheme}`}>
            <DoctorHeader theme={pageTheme}/>
            <div className="content">
                <h1 className="welcome">Your Reviews</h1>
                <div className={`doctor-reviews ${pageTheme}`}>
                    <div className="dr-portfolio">
                        <img src={userProfilePictureUrl || userPlaceholder} alt="User Placeholder" />
                        <div className="dr-info">
                            <h1>Dr. {drInfo.name}</h1>
                            <h3>Specialty: {drInfo.specialty}</h3>
                            <h3>Average Rating: {avgRating}</h3>
                        </div>
                    </div>
                    <div className="reviews">
                        {displayReviews()}
                    </div>
                </div>
                <div className="doctor-services">
                    <div className="find-a-patient">
                        <h2>Find a Patient</h2>
                        <hr />
                        <p>Looking for your patients' details? We've got you covered! Click here to access all your patients' information conveniently organized for easy access.</p>
                        <Link to={`/doctor/myPatients/${pageTheme}`}>
                            <button>MY PATIENTS</button>
                        </Link>
                    </div>
                    <div className="bedAvailability">
                        <h2>Find Bed Availability</h2>
                        <hr />
                        <p>CareConnect360 simplifies your patient care experience. Pick a hospital, and find bed availablility for your patients comfort.</p>
                        <Link to={`/doctor/bedAvailability/${pageTheme}`}>
                            <button>SEARCH BED AVAILABILITY</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};