import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CSS/tourism.css";
import ReactAnimatedWeather from 'react-animated-weather';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';

const Tourism = () => {
    const [baalbekWeather, setBaalbekWeather] = useState(null);
    const [pigeonRocksWeather, setPigeonRocksWeather] = useState(null);

    // Coordinates:
    const baalbekCoords = { lat: 34.0060, lon: 36.2039 };
    const pigeonRocksCoords = { lat: 33.8970, lon: 35.4743 };

    // Transport stops (dummy data, modify as needed)
    const transportStops = [
        { name: "Beirut Central", lat: 33.8938, lon: 35.5018 },
        { name: "East Terminal", lat: 33.8500, lon: 35.8667 },
        { name: "North Junction", lat: 34.0000, lon: 35.7000 }
    ];

    // Map weather codes to conditions/icons
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
        95: {condition: "Thunderstorm", icon: "RAIN"}
    };

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

    // Extract coordinates for polyline
    const polylinePositions = transportStops.map(s => [s.lat, s.lon]);

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

                {/* New Large Card with Map */}
                <section className="tourism-cards-section">
                    <div className="container">
                        <div className="map-card p-3" style={{background: '#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.1)', borderRadius:'8px'}}>
                            <h2 className="mb-4 text-center">Public Transportation Network</h2>
                            <div style={{height: '500px'}}>
                                <MapContainer
                                    center={[33.8938, 35.5018]}
                                    zoom={8}
                                    style={{height:'100%', width:'100%'}}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {transportStops.map((stop, idx) => (
                                        <Marker key={idx} position={[stop.lat, stop.lon]}>
                                            <Popup>{stop.name}</Popup>
                                        </Marker>
                                    ))}
                                    <Polyline positions={polylinePositions} color="red" />
                                </MapContainer>
                            </div>
                            <p className="mt-3 text-center">
                                This map shows our planned public transportation stops and route. (Currently conceptual)
                            </p>
                        </div>
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
