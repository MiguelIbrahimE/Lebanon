import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CSS/tourism.css";
import ReactAnimatedWeather from 'react-animated-weather';

const Tourism = () => {
    const [baalbekWeather, setBaalbekWeather] = useState(null);
    const [pigeonRocksWeather, setPigeonRocksWeather] = useState(null);

    // Coordinates:
    const baalbekCoords = { lat: 34.0060, lon: 36.2039 };
    const pigeonRocksCoords = { lat: 33.8970, lon: 35.4743 };

    // Weather code to icon and condition mapping
    const weatherCodeMap = {
        0:  {condition: "Clear sky", icon: "CLEAR_DAY"},
        1:  {condition: "Mainly clear", icon: "PARTLY_CLOUDY_DAY"},
        2:  {condition: "Partly cloudy", icon: "PARTLY_CLOUDY_DAY"},
        3:  {condition: "Overcast", icon: "CLOUDY"},
        45: {condition: "Fog", icon: "FOG"},
        48: {condition: "Rime fog", icon: "FOG"},
        51: {condition: "Light drizzle", icon: "RAIN"},
        53: {condition: "Moderate drizzle", icon: "RAIN"},
        55: {condition: "Dense drizzle", icon: "RAIN"},
        61: {condition: "Slight rain", icon: "RAIN"},
        63: {condition: "Moderate rain", icon: "RAIN"},
        65: {condition: "Heavy rain", icon: "RAIN"},
        80: {condition: "Rain showers", icon: "RAIN"},
        81: {condition: "Moderate rain showers", icon: "RAIN"},
        82: {condition: "Violent rain showers", icon: "RAIN"},
        95: {condition: "Thunderstorm", icon: "RAIN"} // Adjust as needed
    };

    // Function to get weather from Open-Meteo
    const fetchWeather = (lat, lon, setState) => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
            .then(res => res.json())
            .then(data => {
                if (data && data.current_weather) {
                    const { temperature, weathercode } = data.current_weather;
                    const mapped = weatherCodeMap[weathercode] || {condition: "Unknown", icon: "CLOUDY"};
                    setState({ temp: Math.round(temperature), icon: mapped.icon });
                }
            })
            .catch(console.error);
    };

    useEffect(() => {
        // Fetch Baalbek Weather
        fetchWeather(baalbekCoords.lat, baalbekCoords.lon, setBaalbekWeather);

        // Fetch Pigeon Rocks Weather
        fetchWeather(pigeonRocksCoords.lat, pigeonRocksCoords.lon, setPigeonRocksWeather);
    }, []);

    return (
        <div>
            <Header />
            <div className="tourism-page">
                <section className="tourism-cards-section">
                    <div className="cards-container">
                        {/* Baalbek Card */}
                        <Link to="/baalbek-details" className="location-card">
                            <div className="card-image">
                                <div className="weather-overlay d-flex align-items-center">
                                    {baalbekWeather
                                        ? (
                                            <>
                                                <span style={{marginRight: '0.5rem'}}>{baalbekWeather.temp}°C</span>
                                                <ReactAnimatedWeather
                                                    icon={baalbekWeather.icon}
                                                    color="#333"
                                                    size={24}
                                                    animate={true}
                                                />
                                            </>
                                        )
                                        : "Loading..."}
                                </div>
                                <img src="/baalbek.jpg" alt="Baalbek" className="img-fluid" />
                                <div className="hover-overlay d-flex justify-content-center align-items-center">
                                    <h3>Baalbek</h3>
                                </div>
                            </div>
                            <div className="location-info text-center">
                                <h3>Baalbek</h3>
                            </div>
                        </Link>

                        {/* Pigeon Rocks Card */}
                        <Link to="/pigeon-rocks-details" className="location-card">
                            <div className="card-image">
                                <div className="weather-overlay d-flex align-items-center">
                                    {pigeonRocksWeather
                                        ? (
                                            <>
                                                <span style={{marginRight: '0.5rem'}}>{pigeonRocksWeather.temp}°C</span>
                                                <ReactAnimatedWeather
                                                    icon={pigeonRocksWeather.icon}
                                                    color="#333"
                                                    size={24}
                                                    animate={true}
                                                />
                                            </>
                                        )
                                        : "Loading..."}
                                </div>
                                <img src="/pigeon-rocks.jpg" alt="Pigeon Rocks" className="img-fluid" />
                                <div className="hover-overlay d-flex justify-content-center align-items-center">
                                    <h3>Pigeon Rocks</h3>
                                </div>
                            </div>
                            <div className="location-info text-center">
                                <h3>Pigeon Rocks</h3>
                            </div>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

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
                                <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/tourism" className="nav-link" onClick={() => setIsMenuOpen(false)}>Tourism</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/restaurants" className="nav-link" onClick={() => setIsMenuOpen(false)}>Restaurants</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="search-icon">
                        <i className="fas fa-search"></i>
                    </div>
                </nav>
            </div>

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

export default Tourism;
