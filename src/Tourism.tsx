import React, { useEffect, useState } from "react";
import "./css/Tourism.css";

interface Destination {
    id: number;
    name: string;
    image: string;
    description: string;
}

// Helper function to shuffle array consistently
const shuffleArray = (array: Destination[]) => {
    const seed = 42; // Using a fixed seed for consistent order
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(
            Math.abs(Math.sin(currentIndex + seed)) * array.length
        );
        currentIndex--;

        // Swap
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

const Tourism: React.FC = () => {
    const [destinations, setDestinations] = useState<Destination[]>([]);

    useEffect(() => {
        console.log("Fetching data from API...");
        fetch(process.env.REACT_APP_API_URL + "/api/destinations/")
            .then((response) => {
                if (!response.ok) {
                    console.error("API error:", response.status, response.statusText);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched data:", data); // Log the fetched JSON data
                const shuffled = shuffleArray(data); // Shuffle the destinations
                setDestinations(shuffled);
            })
            .catch((error) => console.error("Error fetching destinations:", error));
    }, []);



    return (
        <div className="tourism-container">
            {/* Map Section */}
            <div className="map-section">
                <div className="text-content">
                    <p className="headline">You can go anywhere*</p>
                    <p className="disclaimer">*: With enough money and/or luck</p>
                </div>
                <img src="/map.png" alt="Lebanon Map" className="map-image" />
            </div>

            {/* Horizontal Line */}
            <hr className="separator" />

            {/* Destinations Section */}
            <div className="destinations-section">
                <h2>Top Destinations</h2>
                {destinations.length > 0 && (
                    <>
                        {/* Top Destination */}
                        <div className="top-destination">
                            <img
                                src={destinations[0].image}
                                alt={destinations[0].name}
                                className="top-destination-image"
                            />
                            <h3 className="top-destination-title">{destinations[0].name}</h3>
                            <p className="top-destination-description">
                                {destinations[0].description}
                            </p>
                        </div>

                        {/* Next Destinations */}
                        <div className="next-destinations">
                            {destinations.slice(1, 3).map((destination) => (
                                <div className="next-destination" key={destination.id}>
                                    <img
                                        src={destination.image}
                                        alt={destination.name}
                                        className="next-destination-image"
                                    />
                                    <h4 className="next-destination-title">
                                        {destination.name}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Tourism;
