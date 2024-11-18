import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
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
                    <h1>i - Lebanon</h1>
                </div>
                <ul className="nav-links">
                    <li>
                        <a href="#destinations">Destinations</a>
                    </li>
                    <li>
                        <a href="#food">Food</a>
                    </li>
                    <li>
                        <a href="#emergency">Emergency</a>
                    </li>
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
                    <button className="search-icon" onClick={handleSearch}>
                        <FaSearch />
                    </button>
                </div>
            </nav>

            {/* Welcome Section */}
            <section className="welcome-section">
                <h1 className="welcome-heading">Discover Lebanon</h1>
                <p className="welcome-text">
                    Discover the beauty, history, and culture of Lebanon. From its
                    stunning beaches to its majestic mountains. Find all the resources
                    you need for the perfect trip, look up essential information on
                    living, studying, and working.
                </p>
            </section>

            {/* Cards Section */}
            <section className="cards-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Card 1</h5>
                                    <p className="card-text">
                                        Explore the vibrant cities and historical landmarks of
                                        Lebanon.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Card 2</h5>
                                    <p className="card-text">
                                        Indulge in the culinary delights and rich food culture.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Card 3</h5>
                                    <p className="card-text">
                                        Experience the breathtaking natural beauty of Lebanon.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default App;
