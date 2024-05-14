import userPlaceholder from "../../assets/images/user-placeholder.png";
import "./Doctor.css";
import React, { useState } from 'react';
import getUserID from "../../contexts/getUserID";

const ReviewItem = (review) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const fetchInfo = async () => {
    const userData = await getUserID(review.uid);
    console.log("uid", review);
    if (userData.profilePictureUrl) {
      setProfilePictureUrl(userData.profilePictureUrl);
    } else {
      setProfilePictureUrl("");
    }
  }

  fetchInfo();

  return (
    <div className="review">
      <div className="portfolio">
        <img src={profilePictureUrl || userPlaceholder} alt="User Placeholder" />
        <p>{review.patientName}</p> 
      </div>
      <div className="text-content">
        <div className="review-info">
          <h3>{review.title}</h3>
          <p>Rating: {review.stars}</p>
        </div>
        <p>{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewItem;