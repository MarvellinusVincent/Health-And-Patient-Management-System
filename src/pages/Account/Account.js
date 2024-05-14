import { useState, useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import getUser from "../../contexts/getUser";
import updateUser from "../../contexts/updateUser";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import userPlaceholder from "../../assets/images/user-placeholder.png";
import PatientHeader from "../../components/PatientHeader/PatientHeader";
import DoctorHeader from "../../components/DoctorHeader/DoctorHeader";
import InsuranceHeader from "../../components/InsuranceHeader/InsuranceHeader";
import "./Account.css";
import { upload, storage } from "../../services/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function Account() {
    const { currentUser, logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [role, setRole] = useState("doctor");
    const [email, setEmai] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [doctorLic, setDoctorLic] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [company, setCompany] = useState("");
    const [companyLic, setCompanyLic] = useState("");
    const [isModified, setIsModified] = useState(false);
    const [pageTheme, setPageTheme] = useState("light");
    const { theme } = useParams();
    const [loading, setLoading] = useState(false);

    const changeTheme = (theme) => {
        setPageTheme(theme);
    };

    const ifThemePresent = () => {
        if (theme) {
            setPageTheme(theme);
        }
    }

    fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
            const countrySelect = document.getElementById("country");

            data.sort((a, b) => {
                const nameA = a.name.common.toUpperCase();
                const nameB = b.name.common.toUpperCase();
                return nameA.localeCompare(nameB);
            });

            // Populate the dropdown with sorted country names
            data.forEach((country) => {
                const option = document.createElement("option");
                option.value = country.name.common;
                option.text = country.name.common;
                countrySelect.add(option);
            });
        })
        .catch((error) => console.error("Error fetching countries:", error));

    const fetchInfo = async () => {
        try {
            ifThemePresent();
            const userData = await getUser();
            console.log(userData);
            if (userData) {
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setPhoneNumber(userData.phoneNumber);
                setProfilePictureUrl(userData.profilePictureUrl);
                setAddress(userData.streetAddress);
                setCountry(userData.country);
                const countrySelect = document.getElementById("country");
                countrySelect.value = userData.country;
                const genderSelect = document.getElementById("gender");
                genderSelect.value = userData.gender;

                setState(userData.state);
                setCity(userData.city);
                setZipCode(userData.zipCode);
                setDoctorLic(userData.doctorLicense);
                const dateOfBirthDate = new Date(userData.dateOfBirth);
                setDateOfBirth(dateOfBirthDate);

                setGender(userData.gender);
                setSpecialization(userData.specialization);
                setRole(userData.role);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const saveData = async () => {
        setIsModified(false);
        const userData = {};
        if (role === "doctor") {
            userData.doctorLicense = doctorLic;
            userData.specialization = specialization;
        } else if (role === "insuranceProvider") {
            userData.company = company;
            userData.companyLicense = companyLic;
        }
        userData.firstName = firstName;
        userData.lastName = lastName;
        upload(photo, currentUser, setLoading);
        userData.profilePictureUrl = profilePictureUrl;
        userData.phoneNumber = phoneNumber;
        userData.dateOfBirth = dateOfBirth;
        userData.streetAddress = address;
        userData.country = country;
        userData.state = state;
        userData.city = city;
        userData.zipCode = zipCode;
        userData.gender = gender;

        let response = await updateUser(userData);
        if (response.status === 200) {
            alert("User data updated successfully");
        } else {
            alert("Failed to update user data");
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const renderHeader = () => {
        if (role === "patient") {
            return <PatientHeader theme={pageTheme} />;
        } else if (role === "doctor") {
            return <DoctorHeader theme={pageTheme} />;
        } else if (role === "insuranceProvider") {
            return <InsuranceHeader theme={pageTheme} />;
        }
    };

    const renderDetails = () => {
        if (role === "patient") {
            return <h2>Patient Information</h2>;
        } else if (role === "doctor") {
            return (
                <div className="doctor-info">
                    <h2>Doctor Information</h2>
                    <div className="doctor-content">
                        <label>License Number</label>
                        <input
                            type="text"
                            placeholder="License Number"
                            required
                            value={doctorLic}
                            onChange={(event) => {
                                setIsModified(true);
                                setDoctorLic(event.target.value);
                            }}
                        />
                        <label>Specialization</label>
                        <input
                            type="text"
                            placeholder="Specialization"
                            required
                            value={specialization}
                            onChange={(event) => {
                                setIsModified(true);
                                setSpecialization(event.target.value);
                            }}
                        />
                    </div>
                </div>
            );
        } else if (role === "insuranceProvider") {
            return (
                <div className="insurance-provider">
                    <h2>Insurance Information</h2>
                    <div className="insurance-content">
                        <label>Insurance Company</label>
                        <input
                            type="text"
                            placeholder="Insurance Company"
                            required
                            value={company}
                            onChange={(event) => {
                                setIsModified(true);
                                setCompany(event.target.value);
                            }}
                        />
                        <label>License Number</label>
                        <input
                            type="text"
                            placeholder="License Number"
                            required
                            value={companyLic}
                            onChange={(event) => {
                                setIsModified(true);
                                setCompanyLic(event.target.value);
                            }}
                        />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };

    const [photo, setPhoto] = useState(null);

    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
            setIsModified(true);
        }
    };

    return (
        <div className={`account-page ${pageTheme}`}>
            <div className={`header ${pageTheme}`}>
                {renderHeader()}
            </div>
            <div className="content">
                <div className="theme-buttons">
                    <button className="light-button" onClick={() => changeTheme("light")}>Light Theme</button>
                    <button className="dark-button" onClick={() => changeTheme("dark")}>Dark Theme</button>
                </div>
                <div className="heading">
                    <h1>Account</h1>
                    <div>
                        <button className="save-btn" disabled={!isModified} onClick={saveData}>
                            SAVE
                        </button>

                        <Link to="/">
                            <button className="logout-btn">LOG OUT</button>
                        </Link>
                    </div>
                </div>
                <form className={`account-page ${pageTheme}`}>
                    <h2>Basic Information</h2>
                    <div className="basic-information">
                        <div className="portfolio">
                            <img src={profilePictureUrl || userPlaceholder} alt="User Placeholder" />
                            <input type="file" onChange={handleChange} />
                        </div>
                        <div className="basic-information-inputs">
                            <div>
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    required
                                    value={firstName}
                                    onChange={(event) => {
                                        setIsModified(true);
                                        setFirstName(event.target.value);
                                    }}
                                />
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    required
                                    value={lastName}
                                    onChange={(event) => {
                                        setIsModified(true);
                                        setLastName(event.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="email" placeholder="Email Address" required value={email} disabled />
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    required
                                    value={phoneNumber}
                                    onChange={(event) => {
                                        setIsModified(true);
                                        setPhoneNumber(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {renderDetails()}
                    <div className="patient-information">
                        <div>
                            <h3>Home Address</h3>
                            <div className="home-address">
                                <div>
                                    <label>Street Address</label>
                                    <input
                                        type="text"
                                        placeholder="Street Address"
                                        required
                                        value={address}
                                        onChange={(event) => {
                                            setIsModified(true);
                                            setAddress(event.target.value);
                                        }}
                                    />
                                    <label>Country</label>
                                    <select
                                        id="country"
                                        required
                                        value={country}
                                        onChange={(event) => {
                                            setIsModified(true);
                                            setCountry(event.target.value);
                                        }}
                                    ></select>
                                    <label>State</label>
                                    <input
                                        type="text"
                                        placeholder="State"
                                        required
                                        value={state}
                                        onChange={(event) => {
                                            setIsModified(true);
                                            setState(event.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label>City</label>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        required
                                        value={city}
                                        onChange={(event) => {
                                            setIsModified(true);
                                            setCity(event.target.value);
                                        }}
                                    />
                                    <label>ZIP Code</label>
                                    <input
                                        type="number"
                                        placeholder="ZIP Code"
                                        required
                                        value={zipCode}
                                        onChange={(event) => {
                                            setIsModified(true);
                                            setZipCode(event.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Personal Information</h3>
                            <div className="personal-information">
                                <label>Date of Birth</label>
                                <DatePicker
                                    selected={dateOfBirth}
                                    onChange={(event) => {
                                        setIsModified(true);
                                        setDateOfBirth(event.target.value);
                                    }}
                                    placeholderText="Date of Birth"
                                    dateFormat="MMMM d, yyyy"
                                />
                                <label>Gender</label>
                                <select
                                    id="gender"
                                    required
                                    value={gender}
                                    onChange={(e) => {
                                        setIsModified(true);
                                        setGender(e.target.value);
                                    }}
                                >
                                    <option value="">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}