import React, { useState } from 'react';
import userPlaceholder from "../../assets/images/user-placeholder.png";
import "./PatientInfo.css";

const PatientCard = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [patientData, setPatientData] = useState({
    diagnosis: props.diagnosis,
    symptoms: props.symptoms,
    testResults: props.testResults,
    medicalHistory: props.medicalHistory,
    insuranceDetails: props.insuranceDetails
  });
  const [editedData, setEditedData] = useState({}); // Add editedData state

  const handleEditClick = () => {
    setIsEditing(true);
    // Initialize editedData with current patient data
    setEditedData(patientData);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Update the state with the edited data
    setPatientData(editedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="card">
      <img src={userPlaceholder} alt="User Placeholder" />
      <h3>{props.userName}</h3>
      {isEditing ? (
        <>
          <div>
            <label htmlFor="diagnosis">Diagnosis:</label>
            <input type="text" id="diagnosis" name="diagnosis" value={editedData.diagnosis} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="symptoms">Symptoms:</label>
            <input type="text" id="symptoms" name="symptoms" value={editedData.symptoms} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="testResults">Test Results:</label>
            <input type="text" id="testResults" name="testResults" value={editedData.testResults} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="medicalHistory">Medical History:</label>
            <input type="text" id="medicalHistory" name="medicalHistory" value={editedData.medicalHistory} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="insuranceDetails">Insurance Details:</label>
            <input type="text" id="insuranceDetails" name="insuranceDetails" value={editedData.insuranceDetails} onChange={handleInputChange} />
          </div>
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <p>Diagnosis: {patientData.diagnosis}</p>
          <p>Symptoms: {patientData.symptoms}</p>
          <p>Test Results: {patientData.testResults}</p>
          <p>Medical History: {patientData.medicalHistory}</p>
          <p>Insurance Details: {patientData.insuranceDetails}</p>
          <button onClick={handleEditClick}>EDIT PATIENT</button>
        </>
      )}
    </div>
  );
};

export default PatientCard;
