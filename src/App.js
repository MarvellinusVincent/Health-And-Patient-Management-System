import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Patient from "./pages/Patient/Patient";
import Account from "./pages/Account/Account";
import FindADoctor from "./pages/FindADoctor/FindADoctor";
import FindAnInsurance from "./pages/FindAnInsurance/FindAnInsurance";
import MyInsurance from "./pages/MyInsurance/MyInsurance";
import BookAppointment from "./pages/BookAppointment/BookApointment";
import Doctor from "./pages/Doctor/Doctor";
import MyPatients from "./pages/MyPatients/MyPatients";
import BedAvailability from "./pages/BedAvailability/BedAvailability";
import PatientInfo from "./pages/PatientInfo/PatientInfo";
import InsuranceDashboard from "./pages/InsuranceProvider/InsuranceProvider";
import InsuranceClients from "./pages/InsuranceClients/InsuranceClients";
import InsurancePlans from "./pages/InsurancePlans/InsurancePlans";
import 'bootstrap/dist/css/bootstrap.min.css';
import PatientAppointments from "./pages/PatientAppointments/PatientAppointments";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<LogIn />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />

                    <Route path="patient/dashboard/:theme" element={<Patient />} />
                    <Route path="patient/account/:theme" element={<Account />} />
                    <Route path="patient/doctor/:theme" element={<FindADoctor />} />
                    <Route path="patient/insurance/:theme" element={<FindAnInsurance />} />
                    <Route path="patient/myinsurance/:theme" element={<MyInsurance />} />
                    <Route path="patient/appointments/:theme" element={<PatientAppointments />} />
                    <Route path="/book-appointment/:doctorUid/:theme" element={<BookAppointment />} />

                    <Route path="doctor/dashboard/:theme" element={<Doctor />} />
                    <Route path="doctor/myPatients/:theme" element={<MyPatients />} />
                    <Route path="doctor/bedAvailability/:theme" element={<BedAvailability />} />
                    <Route path="doctor/patientInfo/:theme" element={<PatientInfo />} />
                    <Route path="doctor/account/:theme" element={<Account />} />

                    <Route path="insurance/dashboard/:theme" element={<InsuranceDashboard />} />
                    <Route path="insurance/clients/:theme" element={<InsuranceClients />} />
                    <Route path="insurance/plans/:theme" element={<InsurancePlans />} />
                    <Route path="insurance/account/:theme" element={<Account />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}