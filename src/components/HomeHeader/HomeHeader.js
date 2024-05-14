import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./HomeHeader.css";

export default function HomeHeader() {
    return (
        <div className="home-header">
            <nav>
                <Logo />
                <ul>
                    <li>
                        <Link to="/login">
                            <button>Log in</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/register">
                            <button>Register</button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}