import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importing magnifying glass icon
import { Link, Routes, Route } from "react-router-dom";
import "./css/App.css";

// Importing pages
import Food from "./Food";
import Tourism from "./Tourism";
import Emergency from "./emergency";
import Events from "./Events";

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
                    <li><Link to="/tourism">Destinations</Link></li>
                    <li><Link to="/food">Food</Link></li>
                    <li><Link to="/emergency"><span className="red">Emergency</span></Link></li>
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
                        <FaSearch />
                    </button>
                </div>
            </nav>

            {/* Routing */}
            <Routes>
                {/* Main Home Page */}
                <Route
                    path="/"
                    element={
                        <>
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
                                    {/* Tourism Card */}
                                    <div className="col-md-4">
                                        <Link to="/tourism">
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
                                        </Link>
                                    </div>
                                    {/* Food Card */}
                                    <div className="col-md-4">
                                        <Link to="/food">
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
                                        </Link>
                                    </div>
                                    {/* Events Card */}
                                    <div className="col-md-4">
                                        <Link to="/events">
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
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </>
                    }
                />
                {/* Individual Pages */}
                <Route path="/food" element={<Food />} />
                <Route path="/tourism" element={<Tourism />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/events" element={<Events />} />
                {/* Fallback Route */}
                <Route path="*" element={<div>Page not found</div>} />
            </Routes>
        </div>
    );
};

export default App;
