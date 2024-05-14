import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./ForgotPassword.css";

export default function ForgotPassword() {
    const [emailId, setEmailId] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { resetPassword } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailId);
            setMessage("Check your inbox for further instructions.");
        } catch {
            setError("Failed to reset password.");
        }

        setLoading(false);
    }

    return (
        <div className="forgot-password-page">
            <div className="content">
                <h2>Password Reset</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={emailId}
                        onChange={(event) => setEmailId(event.target.value)}
                        required
                    />
                    <button disabled={loading}>Reset Password</button>
                </form>
                <Link to="/login">Login</Link>
                <div className="footer">
                    <p>
                        Don't have an account?
                        <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}