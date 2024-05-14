import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InsuranceHeader from "../../components/InsuranceHeader/InsuranceHeader";
import "./InsurancePlans.css";
import myInsurancePlans from "../../contexts/getInsuranceProvidersPlans";
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from "../../services/config";

function InsurancePlans() {
    const [insurancePlans, setInsurancePlans] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState('');
    const [premium, setPremium] = useState('');
    const [deductible, setDeductible] = useState('');
    const [visionCoverage, setVisionCoverage] = useState(false);
    const [medicalCoverage, setMedicalCoverage] = useState(false);
    const [dentalCoverage, setDentalCoverage] = useState(false);
    const [planName, setPlanName] = useState('');

    const { theme } = useParams();
    const [pageTheme, setPageTheme] = useState(theme == "undefined" || "" ? "light" : theme);

    console.log("Theme: ", theme);
    console.log("Pagetheme", pageTheme);

    useEffect(() => {
        fetchInsurancePlans();
    }, []);

    const fetchInsurancePlans = async () => {

        try {
            const response = await myInsurancePlans();
            if (response.status !== 200) {
                console.error("Error fetching insurance plan data");
                setInsurancePlans([]);
            } else {
                const insurancePlans = response.data;
                setInsurancePlans(insurancePlans);
            }
        }
        catch (error) {
            setInsurancePlans([]);
            console.error("Error fetching insurance plan data", error);
        }
    }

    const displayInsurancePlans = () => {
        if (insurancePlans.length > 0) {
            <p>{insurancePlans.length} Insurance Plans</p>
            const insurancePlansContent = insurancePlans.map((plan, index) => (
                <div className="insurance-plan-card" key={index}>
                    <div className="insurance-plan-details">
                        <h3>{plan.planName}</h3>
                        <h4>{plan.description}</h4>
                        <p>Premium: {plan.premium}</p>
                        <p>Deductible: {plan.deductible}</p>
                        <p>Medical Coverage: {plan.medicalCoverage ? 'Yes' : 'No'}</p>
                        <p>Vision Coverage: {plan.visionCoverage ? 'Yes' : 'No'}</p>
                        <p>Dental Coverage: {plan.dentalCoverage ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            ));
            return <div className="content">{insurancePlansContent}</div>;
        } else {
            return <div className="content"><p>You currently don't have any insurance plans.</p></div>;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const premiumValue = parseFloat(premium);
        const deductibleValue = parseFloat(deductible);

        const visionCoverageValue = visionCoverage === 'Yes';
        const dentalCoverageValue = dentalCoverage === 'Yes';
        const medicalCoverageValue = medicalCoverage === 'Yes';

        if (typeof planName !== 'string' || typeof description !== 'string') {
            console.error('Plan name and description must be strings');
            return;
        }

        if (isNaN(premiumValue) || isNaN(deductibleValue)) {
            console.error('Premium and deductible must be numbers');
            return;
        }

        const planData = {
            planName,
            description,
            premium: premiumValue,
            deductible: deductibleValue,
            visionCoverage: visionCoverageValue,
            dentalCoverage: dentalCoverageValue,
            medicalCoverage: medicalCoverageValue
        };

        try {
            const response = await axios.post(`${API_URL}/addInsurancePlan`, planData);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setShowModal(false);
        }
    };


    return (
        <div className={`insurance-page ${pageTheme}`}>
            <InsuranceHeader theme={pageTheme} />
            <div className="title-container">
                <h2>My Insurance Plans</h2>
            </div>
            <div className={`insurance-plan ${pageTheme}`}>
                <Button onClick={() => setShowModal(true)}>Add a New Insurance Plan</Button>
            </div>
            <div className="insurance-content">
                {displayInsurancePlans()}
            </div>
            <Modal show={showModal} fullscreen={true} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a New Insurance Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="planName">
                            <Form.Label>What is the name of the plan?</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter plan name"
                                value={planName}
                                onChange={(e) => setPlanName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="planDescription">
                            <Form.Label>What is the description for the plan?</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter plan description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="premium">
                            <Form.Label>What is the premium price for the plan?</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter premium price"
                                value={premium}
                                onChange={(e) => setPremium(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="deductible">
                            <Form.Label>What is the deductible?</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter deductible"
                                value={deductible}
                                onChange={(e) => setDeductible(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="visionCoverage">
                            <Form.Label>Do you support vision coverage?</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Yes"
                                name="visionCoverage"
                                id="visionCoverageYes"
                                onChange={() => setVisionCoverage(true)}
                            />
                            <Form.Check
                                type="radio"
                                label="No"
                                name="visionCoverage"
                                id="visionCoverageNo"
                                onChange={() => setVisionCoverage(false)}
                                defaultChecked
                            />
                        </Form.Group>
                        <Form.Group controlId="dentalCoverage">
                            <Form.Label>Do you support dental coverage?</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Yes"
                                name="dentalCoverage"
                                id="dentalCoverageYes"
                                onChange={() => setDentalCoverage(true)}
                            />
                            <Form.Check
                                type="radio"
                                label="No"
                                name="dentalCoverage"
                                id="dentalCoverageNo"
                                onChange={() => setDentalCoverage(false)}
                                defaultChecked
                            />
                        </Form.Group>
                        <Form.Group controlId="medicalCoverage">
                            <Form.Label>Do you support medical coverage?</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Yes"
                                name="medicalCoverage"
                                id="medicalCoverageYes"
                                onChange={() => setMedicalCoverage(true)}
                            />
                            <Form.Check
                                type="radio"
                                label="No"
                                name="medicalCoverage"
                                id="medicalCoverageNo"
                                onChange={() => setMedicalCoverage(false)}
                                defaultChecked
                            />
                        </Form.Group>

                        <Button type="submit">Submit</Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default InsurancePlans;