import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./LogIn.css";
import signin from "../../contexts/signin";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ReCAPTCHA from "react-google-recaptcha";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useHistory } from "react-router-dom";

export default function LogIn() {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const [sentOtp, setSentOtp] = useState("");
    const [otp, setOTP] = useState("");
    const [verfied, setVerifed] = useState(false);

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function onChange(value) {
        console.log("Captcha value:", value);
        setVerifed(true);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response_token = await login(emailId, password);
            console.log("token", response_token);
            if (response_token) {
                const response_signin = await signin.getsigninotp(response_token);
                if (response_signin.includes('pending')) {
                    setSentOtp(response_token);
                    setShow(true);
                    handleShow();
                }

                console.log("OTP response", response_signin);
            }
        } catch (error) {
            console.error("Error signing in:", error);
            setError("Failed to log in. Please check your email or password.");
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async (event) => {
        console.log(otp);
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response_role = await signin.verifyOTP(otp);
            console.log("Role", response_role);

            if (response_role === "doctor") {
                navigate('/doctor/dashboard/light');
            }
            else if (response_role === "patient") {
                navigate('/patient/dashboard/light');
            }
            else {
                navigate('/insurance/dashboard/light');
            }

        }
        catch (error) {
            console.error("Error signing in:", error);
            setError("Failed to log in. Please check your email or password.");
        } finally {
            setLoading(false);
        }

    }

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                    navigate('/patient/dashboard/light');
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.customData.email;
                    const credential = GoogleAuthProvider.credentialFromError(error);
                });
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };


    return (
        <>

            <div className="login-page">
                <div className="content">
                    <h2>Log In</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Email Address"
                            required
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ReCAPTCHA
                            //sitekey="6LfvwLIpAAAAAHKIrpN22HNCXC4pRlQnS9mFlfSb"
                            sitekey="6LfjucIpAAAAAGWgwmCfAU-apkho3liPq871FZRr"
                            onChange={onChange}
                        />

                        <button disabled={!verfied}>Login</button>
                    </form>
                    <button onClick={handleGoogleSignIn}>Sign in with Google</button>
                    <Link to="/forgot-password">Forgot Password?</Link>
                    <div className="footer">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </div>

            </div>
            {
                sentOtp &&
                <>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Two Factor Authentication</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={verifyOTP}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Enter OTP</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="OTP"
                                        value={otp}
                                        onChange={(e) => setOTP(e.target.value)}
                                        autoFocus

                                    /><br />
                                    <Button variant="success" type="submit" onClick={handleClose}>
                                        Submit
                                    </Button>

                                </Form.Group>
                            </Form>
                        </Modal.Body>

                    </Modal>
                </>
            }
        </>

    );
}