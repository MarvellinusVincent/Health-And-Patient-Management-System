import { Link } from "react-router-dom";
import InsuranceHeader from "../../components/InsuranceHeader/InsuranceHeader";
import "./InsuranceProvider.css";
import { useEffect, useRef, useState  } from "react";
import { useParams } from "react-router-dom";

export default function InsuranceProvider() {
    const {theme} = useParams();
    const [pageTheme, setPageTheme] = useState(theme == "undefined" || "" ? "light" : theme);

    console.log("Theme: ", theme);
    console.log("Pagetheme", pageTheme);

    // const chartRef = useRef(null);
    //
    // useEffect(() => {
    //     let myChart = null; // Initialize chart variable
    //
    //     if (chartRef.current) {
    //         const ctx = chartRef.current.getContext("2d");
    //
    //         // Destroy existing chart if it exists
    //         if (myChart) {
    //             myChart.destroy();
    //         }
    //
    //         // Create new chart
    //         myChart = new Chart(ctx, {
    //             type: "bar",
    //             data: {
    //                 labels: ["CareConnectSilver", "CareConnectGold", "CareConnectPlatinum"],
    //                 datasets: [{
    //                     label: "Number of Clients",
    //                     data: [12, 19, 3, 5, 2, 3], // Hardcoded data for demonstration
    //                     backgroundColor: "rgba(54, 162, 235, 0.2)",
    //                     borderColor: "rgba(54, 162, 235, 1)",
    //                     borderWidth: 1
    //                 }]
    //             },
    //             options: {
    //                 scales: {
    //                     y: {
    //                         beginAtZero: true
    //                     }
    //                 }
    //             }
    //         });
    //     }

        // Cleanup function to destroy chart when component unmounts
    //     return () => {
    //         if (myChart) {
    //             myChart.destroy();
    //         }
    //     };
    // }, [chartRef.current]);

// TODO add stats of amt paid by patients adn insurance providers, total amt of paid and unpaid bills
    return (
        <div className={`insurance-page ${pageTheme}`}>
            <InsuranceHeader theme={pageTheme}/>
            <div className="insurance-content">
                <h1 className="insurance-welcome">Hello Insurance Provider</h1>
                <div className="insurance-services">
                    <div className="browse-insurance-plans">
                        <h2>View Client List</h2>
                        <hr/>
                        <p>Want to see all of your clients' plans? Look at them all here!</p>
                        <Link to={`/insurance/clients/${pageTheme}`}>
                            <button>Browse Plans</button>
                        </Link>
                    </div>
                    <div className="find-an-insurance">
                        <h2>View Insurance Plans</h2>
                        <hr/>
                        <p>CareConnect360 has a large variety of insurance plans. Compare them all here!</p>
                        <Link to={`/insurance/plans/${pageTheme}`}>
                            <button>SEARCH PLANS</button>
                        </Link>
                    </div>
                </div>

                <table id="myTable">
                    <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Amount Owed by Patients</td>
                        <td>$6800</td>
                    </tr>
                    <tr>
                        <td>Total Amount of Paid Bills</td>
                        <td>$4800</td>
                    </tr>
                    <tr>
                        <td>Total Amount of Unpaid Bills</td>
                        <td>$2000</td>
                    </tr>
                    </tbody>
                </table>

            </div>
            {/*<div style={{marginTop: '30px'}}></div>*/}
            {/*<canvas ref={chartRef} style={{ width: '10px', height: '40px', padding: "0px 15% 10px" }}></canvas>*/}
        </div>
    );
}