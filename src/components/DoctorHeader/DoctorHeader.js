import { Link } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa";
import Logo from "../../components/Logo/Logo";
import "./DoctorHeader.css";

export default function DoctorHeader({ theme }) {
    console.log("THIS IS THEME", theme)

    if(theme === "undefined" || theme === ""){
        theme = "light";
    }
    console.log("THIS IS THEME2", theme)

    return (
        <div className={`doctor-header ${theme === "dark" ? "dark" : ""}`}>
            <nav>
                <Logo />
                <ul>
                    <li>
                        <Link to={`/doctor/dashboard/${theme}`}>
                            <FaHome className="dashboard-icon" />
                        </Link>
                    </li>
                    <li>
                        <Link to={`/doctor/MyPatients/${theme}`}>My Patients</Link>
                    </li>
                    <li>
                        <Link to={`/doctor/bedAvailability/${theme}`}>Bed Availability</Link>
                    </li>
                    <li>
                        <Link className="user-nav-link" to={`/doctor/account/${theme}`}>
                            <FaUserCircle className="user-icon" />
                            <p>USER</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}