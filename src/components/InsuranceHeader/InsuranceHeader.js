import { Link } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa";
import Logo from "../../components/Logo/Logo";
import "./InsuranceHeader.css";

export default function InsuranceHeader({ theme }) {
    console.log("THIS IS THEME", theme)

    if (theme === "undefined" || theme === "") {
        theme = "light";
    }
    console.log("THIS IS THEME2", theme)

    return (
        <div className={`insurance-header ${theme === "dark" ? "dark" : ""}`}>
            <nav>
                <Logo />
                <ul>
                    <li>
                        <Link to={`/insurance/dashboard/${theme}`}>
                            <FaHome className="dashboard-icon" />
                        </Link>
                    </li>
                    <li>
                        <Link to={`/insurance/clients/${theme}`}>My Clients</Link>
                    </li>
                    <li>
                        <Link to={`/insurance/plans/${theme}`}>Insurance Plans</Link>
                    </li>
                    <li>
                        <Link className="user-nav-link" to={`/insurance/account/${theme}`}>
                            <FaUserCircle className="user-icon" />
                            <p>USER</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}