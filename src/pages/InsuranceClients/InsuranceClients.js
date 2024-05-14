import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myInsuranceClients from "../../contexts/getInsuranceClients";
import InsuranceHeader from "../../components/InsuranceHeader/InsuranceHeader";
import "./InsuranceClients.css";

export default function InsuranceClients() {
    const [clients, setClients] = useState([]);
    
    const { theme } = useParams();
    const [pageTheme, setPageTheme] = useState(theme == "undefined" || "" ? "light" : theme);

    console.log("Theme: ", theme);
    console.log("Pagetheme", pageTheme);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {

        try {
            const response = await myInsuranceClients();
            if (response.status !== 200) {
                console.error("Error fetching clients");
                setClients([]);
            } else {
                const clients = response.data;
                setClients(clients);
            }
        }
        catch (error) {
            setClients([]);
            console.error("Error fetching insurance clients", error);
        }
    }

    const displayClients = () => {
        if (clients.length > 0) {
            <p>{clients.length} Clients</p>
            const clientsContent = clients.map((client, index) => (
                <div className="insurance-clients-card" key={index}>
                    <div className="insurance-clients-details">
                        <h3>{client.patientName}</h3>
                        <p><span>Plan Name:</span> {client.planName}</p>
                        <p><span>Description:</span>  {client.description}</p>
                    </div>
                </div>
            ));
            return <div className="content">{clientsContent}</div>;
        } else {
            return <div className="content"><p>You currently don't have any clients.</p></div>;
        }
    }
    return (
        <div className={`insurance-page ${pageTheme}`}>
            <InsuranceHeader theme={pageTheme} />
            <div className="title-container">
                <h2>My Clients</h2>
            </div>
            <div className="insurance-content">
                {displayClients()}
            </div>
        </div>
    );
}