import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importing magnifying glass icon
import "./css/App.css";

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearchInput, setShowSearchInput] = useState(false);

    const handleSearch = () => {
        const searchUrl = searchTerm.trim()
            ? `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`
            : `https://www.google.com`;
        window.open(searchUrl, "_blank");
    };

    return (
        <div className="App">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="logo">
                    <h1>
                        Leban<span className="highlight-olive">on</span>
                    </h1>

                </div>
                <ul className="nav-links">
                    <li><a href="./Tourism.tsx">Destinations</a></li>
                    <li><a href="./Food.tsx">Food</a></li>
                    <li><a href="./emergency.tsx"><span className="red">Emergency</span></a></li>
                </ul>
                <div className="search-container">
                    {showSearchInput && (
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    )}
                    <button
                        className="search-icon"
                        onClick={handleSearch}
                    >
                        <FaSearch/>
                    </button>
                </div>
            </nav>

            {/* Welcome Section */}
            <section className="welcome-section">
                <h1 className="welcome-heading">Discover Lebanon</h1>
                <p className="welcome-text">
                    From its stunning beaches to its majestic mountains. Find all the resources you need for the perfect
                    trip, look up essential information on living, studying, and working.
                </p>
            </section>

            {/* Cards Section */}
            <section className="cards-section container mt-5">
                <div className="row">
                    {/* Card 1 */}
                    <div className="col-md-4">
                        <div className="card">
                            <img
                                src="/baalbek.png"
                                className="card-img-top"
                                alt="Baalbek"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Tourism</h5>
                                <p className="card-text">
                                    Explore the many magnificent touristic destinations.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="col-md-4">
                        <div className="card">
                            <img
                                src="/food.png"
                                className="card-img-top"
                                alt="Food Delight"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Lebanese Cuisine</h5>
                                <p className="card-text">
                                    Experience Lebanese food and hospitality.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="col-md-4">
                        <div className="card">
                            <img
                                src="/events.png"
                                className="card-img-top"
                                alt="Adventure"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Events</h5>
                                <p className="card-text">
                                    Check out the current on-going events.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Single Cards Section */}
            <section className="single-cards-section container mt-5">
                <div className="single-card">
                    <a href="/explore-more">
                        <img src="/AUB.png" alt="Explore More" className="single-card-img"/>
                        <div className="hover-text">Education</div>
                    </a>
                </div>
            </section>
            <section className="single-cards-section container mt-5">
                <div className="single-card">
                    <a href="/explore-more">
                        <img src="/helem.png" alt="Explore More" className="single-card-img"/>
                        <div className="hover-text">Organizations</div>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default App;
