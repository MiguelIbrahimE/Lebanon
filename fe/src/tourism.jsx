import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CSS/tourism.css";
import ReactAnimatedWeather from 'react-animated-weather';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Coordinates for Cola station (converted from 33°52'31.5"N 35°29'44.1"E)
const colaCoords = [33.875417, 35.495583]; // Approximate decimal conversion

// Coordinates for Aammatour, Lebanon (example coordinates)
const aammatourCoords = [33.668310, 35.586566]; // Approximate coordinates for Ammatour/Aammatour

// Black line route: Cola to Aammatour
const busBlackRoute = [
    colaCoords,
    aammatourCoords
];

// Bus 5 Route
const bus5Route = [
    [33.8903, 35.48419],
    [33.88664, 35.51444],
    [33.88875, 35.54158],
    [33.88792, 35.54569],
    [33.88975, 35.56136],
    [33.88717, 35.57081],
    [33.88575, 35.57022],
    [33.88381, 35.57069],
    [33.88100, 35.57383],
    [33.88086, 35.57689]
];

// Bus 2 Route (Green Line)
const bus2Route = [
    [33.8903, 35.48419], // Start (same as Bus 5)
    [33.88708, 35.52042],  // Sassine Square
    [33.89047, 35.52100],
    [33.89258, 35.51831],
    [33.8950, 35.5180],   // EDL
    [33.9282, 35.5952]    // Antelias
];

// Bus 6 Route (Olive Green)
const bus6Route = [
    [33.8731, 35.4963],   // Cola
    [33.8814, 35.5097],   // Peugeot
    [33.8935, 35.5260],   // Ittihad
    [33.8898, 35.56748],  // Given coordinate
    [33.9114, 35.5714]    // Zalka
];

// Updated Dora coordinates: 33.89339° N, 35.55097° E
const doraCoords = [33.89339, 35.55097];

// Long haul routes
// Dora to Jbeil
const doraToJbeilRoute = [
    doraCoords,         // Dora (updated)
    [34.1211, 35.6489]  // Jbeil
];

// Dora to Tripoli (further north)
const doraToTripoliRoute = [
    doraCoords,         // Dora (updated)
    [34.1211, 35.6489], // Jbeil (intermediate stop)
    [34.4367, 35.8497]  // Tripoli
];

// Weather code mapping
const weatherCodeMap = {
    0: {condition: "Clear sky", icon: "CLEAR_DAY"},
    1: {condition: "Mainly clear", icon: "PARTLY_CLOUDY_DAY"},
    2: {condition: "Partly cloudy", icon: "PARTLY_CLOUDY_DAY"},
    3: {condition: "Overcast", icon: "CLOUDY"},
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

const Tourism = () => {
    const [baalbekWeather, setBaalbekWeather] = useState(null);
    const [pigeonRocksWeather, setPigeonRocksWeather] = useState(null);

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

    const baalbekCoords = { lat: 34.0060, lon: 36.2039 };
    const pigeonRocksCoords = { lat: 33.8970, lon: 35.4743 };

    useEffect(() => {
        fetchWeather(baalbekCoords.lat, baalbekCoords.lon, setBaalbekWeather);
        fetchWeather(pigeonRocksCoords.lat, pigeonRocksCoords.lon, setPigeonRocksWeather);
    }, []);

    const [roadRouteBus5, setRoadRouteBus5] = useState([]);
    const [roadRouteBus2, setRoadRouteBus2] = useState([]);
    const [roadRouteBus6, setRoadRouteBus6] = useState([]);
    const [roadRouteDoraJbeil, setRoadRouteDoraJbeil] = useState([]);
    const [roadRouteDoraTripoli, setRoadRouteDoraTripoli] = useState([]);
    const [roadRouteBusBlack, setRoadRouteBusBlack] = useState([]);
    const [finalRoutes, setFinalRoutes] = useState([]);

    const fetchRoadRoute = (routeCoords, setRouteState) => {
        const waypoints = routeCoords.map(([lat, lon]) => `${lon},${lat}`).join(';');
        const url = `https://router.project-osrm.org/route/v1/driving/${waypoints}?overview=full&geometries=geojson`;

        return fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.routes && data.routes.length > 0) {
                    const coords = data.routes[0].geometry.coordinates;
                    const latLonCoords = coords.map(([lon, lat]) => [lat, lon]);
                    setRouteState(latLonCoords);
                }
            })
            .catch(console.error);
    };

    useEffect(() => {
        // Fetch all routes
        fetchRoadRoute(bus5Route, setRoadRouteBus5);
        fetchRoadRoute(bus2Route, setRoadRouteBus2);
        fetchRoadRoute(bus6Route, setRoadRouteBus6);
        fetchRoadRoute(doraToJbeilRoute, setRoadRouteDoraJbeil);
        fetchRoadRoute(doraToTripoliRoute, setRoadRouteDoraTripoli);
        fetchRoadRoute(busBlackRoute, setRoadRouteBusBlack);
    }, []);

    // Utility functions for line bundling
    function pointsAreClose(p1, p2, threshold = 0.0001) {
        const [lat1, lng1] = p1;
        const [lat2, lng2] = p2;
        return Math.abs(lat1 - lat2) < threshold && Math.abs(lng1 - lng2) < threshold;
    }

    function offsetRoute(route, latOffset = 0, lngOffset = 0) {
        return route.map(([lat, lng]) => [lat + latOffset, lng + lngOffset]);
    }

    function separateOverlappingLines(routes) {
        // Compare each pair of routes to find overlapping segments
        for (let i = 0; i < routes.length; i++) {
            for (let j = i + 1; j < routes.length; j++) {
                const routeA = routes[i].coords;
                let routeB = routes[j].coords;

                let overlapCount = 0;
                for (let p1 of routeA) {
                    for (let p2 of routeB) {
                        if (pointsAreClose(p1, p2)) {
                            overlapCount++;
                            if (overlapCount > 5) {
                                // Found significant overlap, offset routeB
                                routes[j].coords = offsetRoute(routeB, 0.00005, 0.00005);
                                break;
                            }
                        }
                    }
                    if (overlapCount > 5) break;
                }
            }
        }
        return routes;
    }

    // Once the routes are updated, we apply the bundling logic
    useEffect(() => {
        if (
            roadRouteBus5.length > 0 ||
            roadRouteBus2.length > 0 ||
            roadRouteBus6.length > 0 ||
            roadRouteDoraJbeil.length > 0 ||
            roadRouteDoraTripoli.length > 0 ||
            roadRouteBusBlack.length > 0
        ) {
            const routesData = [
                { coords: roadRouteBus5, color: "blue" },
                { coords: roadRouteBus2, color: "green" },
                { coords: roadRouteBus6, color: "olive" },
                { coords: roadRouteDoraJbeil, color: "orange" },
                { coords: roadRouteDoraTripoli, color: "purple" },
                { coords: roadRouteBusBlack, color: "black" } // New black route
            ].filter(r => r.coords && r.coords.length > 0);

            const separated = separateOverlappingLines(routesData);
            setFinalRoutes(separated);
        }
    }, [roadRouteBus5, roadRouteBus2, roadRouteBus6, roadRouteDoraJbeil, roadRouteDoraTripoli, roadRouteBusBlack]);

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

                {/* Map Card */}
                <section className="tourism-cards-section">
                    <div className="container">
                        <div className="map-card p-3" style={{background: '#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.1)', borderRadius:'8px'}}>
                            <h2 className="mb-4 text-center">Public Transportation Network</h2>
                            <div style={{height: '500px', width:'100%'}}>
                                <MapContainer
                                    center={[33.8938, 35.5018]}
                                    zoom={10} // zoom out a bit to see the route to Aammatour
                                    style={{height:'100%', width:'100%'}}
                                >
                                    <TileLayer
                                        attribution='&copy; OpenStreetMap contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    {finalRoutes.map((r, i) => (
                                        <Polyline key={i} positions={r.coords} color={r.color} weight={4} />
                                    ))}
                                </MapContainer>
                            </div>
                            <p className="mt-3 text-center">
                                This map shows our planned public transportation stops and routes, including the new black line from Cola to Aammatour.
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
