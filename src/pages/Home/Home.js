import HomeHeader from "../../components/HomeHeader/HomeHeader";
import "./Home.css";

export default function Home() {
    return (
        <div className="home-page">
            <HomeHeader />
            <div className="home-content">
                <div className="home-introduction">
                    <h2>Simplify Your World: All-in-One, All for You.</h2>
                    <p>Connecting Health, Insurance, and Care with Seamless Precision.</p>
                </div>
            </div>
            <div className="home-footer">
                <p>© 2024 CareConnect360. All Rights Reserved.</p>
            </div>
        </div>
    );
}