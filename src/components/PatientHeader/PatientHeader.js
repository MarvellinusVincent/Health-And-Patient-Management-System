import { Link } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa";
import Logo from "../../components/Logo/Logo";
import "./PatientHeader.css";

export default function PatientHeader({ theme }) {
    console.log("THIS IS THEME", theme)

    if(theme === "undefined" || theme === ""){
        theme = "light";
    }
    console.log("THIS IS THEME2", theme)
    return (
        <div className={`patient-header ${theme === "dark" ? "dark" : ""}`}>
            <nav>
                <Logo />
                <ul>
                    <li>
                        <Link to={`/patient/dashboard/${theme}`}>
                            <FaHome className="dashboard-icon" />
                        </Link>
                    </li>
                    <li>
                        <Link to={`/patient/doctor/${theme}`}>Find a Doctor</Link>
                    </li>
                    <li>
                        <Link to={`/patient/insurance/${theme}`}>Find an Insurance</Link>
                    </li>
                    <li>
                        <Link to={`/patient/appointments/${theme}`}>Upcoming Appointments</Link>
                    </li>
                    <li>
                        <Link className="user-nav-link" to={`/patient/account/${theme}`}>
                            <FaUserCircle className="user-icon" />
                            <p>USER</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}