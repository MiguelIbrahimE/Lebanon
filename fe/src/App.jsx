import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./CSS/App.css";
import "./CSS/navbar.css";
import Tourism from "./tourism"; // Ensure correct relative path

const App = () => (
    <div>
        <Routes>
            {/* Home route */}
            <Route
                path="/"
                element={
                    <div>
                        <Header />
                        <HeroSection />
                        <DiscoverSection />
                        <Separator />
                        <FullWidthCard />
                    </div>
                }
            />
            {/* Tourism page route */}
            <Route path="/tourism" element={<Tourism />} />
        </Routes>
    </div>
);

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <span className="red">Leban</span>
                    <span className="green">on</span>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/tourism" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Tourism
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/restaurants" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Restaurants
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="search-icon">
                        <i className="fas fa-search"></i>
                    </div>
                </nav>
            </div>

            {/* Full Screen Menu Overlay */}
            <div className={`full-screen-menu ${isMenuOpen ? "show" : ""}`}>
                <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>X</button>
                <div className="menu-item">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                </div>
                <div className="menu-item">
                    <Link to="/tourism" onClick={() => setIsMenuOpen(false)}>Tourism</Link>
                </div>
                <div className="menu-item">
                    <Link to="/restaurants" onClick={() => setIsMenuOpen(false)}>Restaurants</Link>
                </div>
            </div>
        </header>
    );
};

const HeroSection = () => (
    <section className="hero-section text-dark py-5" style={{ background: "#D99090" }}>
        <div className="container text-center">
            <h1 className="display-4 font-weight-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: "2.5rem" }}>
                Exploring Lebanon one Mankoushe at a Time
            </h1>
        </div>
    </section>
);

const DiscoverSection = () => (
    <section id="discover" className="section py-5 bg-light">
        <div className="container">
            <h2 className="text-center mb-4 text-primary">Discover Lebanon</h2>
            <div className="grid">
                <Link to="/tourism" className="card-link">
                    <div className="card">
                        <img src="/baalbek.jpg" alt="Touristic Sites" />
                        <div className="card-overlay">
                            <h3>Touristic Sites</h3>
                        </div>
                    </div>
                </Link>
                <Link to="/restaurants" className="card-link">
                    <div className="card">
                        <img src="/food.jpg" alt="Restaurants" />
                        <div className="card-overlay">
                            <h3>Restaurants</h3>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </section>
);

const Separator = () => <hr className="separator" />;

const FullWidthCard = () => (
    <div className="full-width-card mb-5">
        <img src="./aub.png" alt="Education" className="img-fluid" />
        <div className="overlay">
            <h3>Education</h3>
        </div>
    </div>
);

export default App;
