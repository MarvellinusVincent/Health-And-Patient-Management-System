import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "./Register.css";


import register from "../../contexts/register";




const RegisterPage = () => {
    const [emailid, setEmaiId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateofbirth, setDateofBirth] = useState(null);
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [doctorlic, setDoctorLic] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [supportCovid, setSupportCovid] = useState('');
    const [company, setCompany] = useState('');
    const [companyLic, setCompanyLic] = useState('');
    const [error, setError] = useState('');
    const [msg, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [is2FAEnabled, setIs2FAEnabled] = useState('true');
    const [isPhoneNumberVerified, seIsPhoneNumberVerified] = useState('true');



    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'This email is already in use.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters.';
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            default:
                return 'An unexpected error occurred. Please try again.';
        }
    };
    const formatDate = (date) => { //Formating the date according to the backend
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const day = (`0${d.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        let userData = {};
        const formattedDateOfBirth = dateofbirth ? formatDate(dateofbirth) : null;
        setLoading(true)

        if (role == "patient") {

            userData = {
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                phoneNumber: phoneNumber,
                dateOfBirth: formattedDateOfBirth,
                streetAddress: address,
                country: country,
                state: state,
                city: city,
                zipCode: pincode,
                role: role,
                is2FAEnabled: true,
                isPhoneNumberVerified: true
            };




        }
        else if (role == "doctor") {
            userData = {
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                phoneNumber: phoneNumber,
                dateOfBirth: formattedDateOfBirth,
                streetAddress: address,
                country: country,
                state: state,
                city: city,
                zipCode: pincode,
                role: role,
                doctorLicense: doctorlic,
                specialization: specialization,
                supportCovid: supportCovid,
                is2FAEnabled: true,
                isPhoneNumberVerified: true
            };

        }


        console.log("Signup", userData);

        try {
            const response = await register(userData, emailid, password);
            console.log("Sign up successfully", response);
            if (response.includes("uid")) {
                navigate('/login');
            }
            else {
                setMessage(response);
                window.scrollTo(0, 0);
            }

        } catch (err) {
            window.scrollTo(0, 0);
            console.error("Signup error", err);
            setError(err.response?.data?.message || 'An error occurred during signup.');

        }

        setLoading(false);
        setError(null);

    };


    const handleChange = date => {
        setDateofBirth(date);
    };

    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const countrySelect = document.getElementById('country');


            data.sort((a, b) => {
                const nameA = a.name.common.toUpperCase();
                const nameB = b.name.common.toUpperCase();
                return nameA.localeCompare(nameB);
            });


            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common;
                option.text = country.name.common;
                countrySelect.add(option);
            });
        })
        .catch(error => console.error('Error fetching countries:', error));
    //
    const renderInputForm = () => {
        if (role === 'patient') {
            return;
        } else if (role === 'doctor') {
            return (
                <div className="doctor-info">
                    <p>Doctor Information</p>
                    <div className="doctor-content">
                        <input
                            type="text"
                            placeholder="License Number"
                            required
                            value={doctorlic}
                            onChange={(e) => setDoctorLic(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Specialization"
                            required
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)} />
                        <select
                            required
                            className="select-role"
                            value={supportCovid}
                            onChange={(e) => setSupportCovid(e.target.value)}>

                            <option value="yes">Provides Covid Support</option>
                            <option value="no">Does not provide Covid Support</option>

                        </select>

                    </div>
                </div>
            );
        } else if (role === 'insuranceProvider') {
            return (
                <div className="insurance-provider">
                    <p>Insurance Information</p>
                    <div className="insurance-content">
                        <input
                            type='text'
                            placeholder="Insurance Company"
                            required
                            value={company}
                            onChange={(e) => setCompany(e.target.value)} />

                        <input
                            type="text"
                            required
                            placeholder="License Number"
                            value={companyLic}
                            onChange={(e) => setCompanyLic(e.target.value)} />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };
    return (
        <div className="register-page">
            <div className="content">
                <h2>Registration Form</h2>
                {error && (
                    <div className="error-message-box">{error}</div>
                )}
                {msg && (
                    <div className="error-message-box">{msg}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <p>Select User type</p>
                    <select
                        required
                        className="select-role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>

                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="insuranceProvider">Insurance Provider </option>
                    </select>
                    <p>Account Information</p>
                    <div className="account-info">


                        <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={emailid}
                            onChange={(e) => setEmaiId(e.target.value)} />

                        <input
                            type="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <p>Personal Information</p>
                    <div className="personal-info">

                        <input
                            type="text"
                            required
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />

                        <input
                            type="text"
                            placeholder="Last Name"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />



                        <select
                            required
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}>

                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} />
                        <DatePicker

                            selected={dateofbirth}
                            onChange={handleChange}
                            placeholderText="Date of Birth"
                            dateFormat="yyyy-MM-dd"

                        />
                    </div>

                    <p>Address</p>
                    <div className="address-details">
                        <input
                            type="text"
                            placeholder="Street Address"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />

                        <select
                            id="country"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}>
                            <option disabled value="">Country</option>
                        </select>

                        <input
                            type="text"
                            placeholder="State"
                            required
                            value={state}

                            onChange={(e) => setState(e.target.value)} />

                        <input
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)} />

                        <input
                            type="number"
                            placeholder="Pincode"
                            required
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)} />


                    </div>

                    {renderInputForm()}

                    <button id='register-btn'>Register</button>
                </form>
                <footer>
                    <div><Link to="/">Back to Homepage</Link></div>
                </footer>

            </div>
        </div>
    );
}

export default RegisterPage;