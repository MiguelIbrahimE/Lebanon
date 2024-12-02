import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "./CSS/App.css"; // Your custom CSS for additional styling

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle function for the burger menu
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="header bg-dark text-white py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <span className="text-danger">Leban</span>
                    <span className="text-success">on</span>
                </div>

                {/* Navbar and Hamburger Menu */}
                <nav className="navbar navbar-expand-lg navbar-dark d-flex align-items-center">
                    {/* Hamburger Menu Icon (Appears when menu is closed) */}
                    <button
                        className={`navbar-toggler ${isOpen ? "open" : ""}`}
                        type="button"
                        aria-expanded={isOpen ? "true" : "false"}
                        aria-label="Toggle navigation"
                        onClick={toggleMenu}
                    >
                        <span className="bar bar1"></span>
                        <span className="bar bar2"></span>
                        <span className="bar bar3"></span>
                    </button>

                    {/* Search Icon */}
                    <div className="search-icon ml-3">
                        <FaSearch size={20} />
                    </div>
                </nav>
            </div>

            {/* Full-screen menu */}
            <div className={`full-screen-menu ${isOpen ? "show" : ""}`} onClick={toggleMenu}>
                <ul className="full-menu-items">
                    <li className="menu-item">
                        <Link to="/tourism" className="menu-link" onClick={toggleMenu}>Tourism</Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/restaurants" className="menu-link" onClick={toggleMenu}>Restaurants</Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/emergencies" className="menu-link" onClick={toggleMenu}>Emergencies</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

const DiscoverSection = () => (
    <section id="discover" className="section py-5 bg-light">
        <div className="container">
            <h2 className="text-center mb-4 text-primary">Discover Lebanon</h2>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <Link to="/tourism" className="card-link">  {/* Wrap the card with a link */}
                        <div className="card">
                            <img src="/baalbek.jpg" alt="Touristic Sites" className="card-img-top" />
                            <div className="card-body">
                                <h3 className="card-title">Touristic Sites</h3>
                               </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-4 mb-4">
                    <Link to="/restaurants" className="card-link">
                        <div className="card">
                            <img src="restaurants.jpg" alt="Restaurants" className="card-img-top" />
                            <div className="card-body">
                                <h3 className="card-title">Restaurants</h3>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-4 mb-4">
                    <Link to="/events" className="card-link">
                        <div className="card">
                            <img src="events.jpg" alt="Events" className="card-img-top" />
                            <div className="card-body">
                                <h3 className="card-title">Events</h3>
                           </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </section>
);

const Separator = () => <hr className="separator" />;

const FullWidthCard = () => (
    <div className="full-width-card mb-5">
        <img src="./aub.png" alt="AUB" className="img-fluid" />
        <div className="overlay">
            <h3>Education</h3>
        </div>
    </div>
);

const App = () => (
    <div>
        <Header />
        <DiscoverSection />
        <Separator />
        <FullWidthCard />
    </div>
);

export default App;
