// Connect to the "Lebanon" database
db = db.getSiblingDB("Lebanon");

// Drop existing collections (if needed, for fresh start)
db.Users.drop();
db.restaurants.drop();
db.touristic_sites.drop();

// Create Users collection
db.Users.insertMany([
  { _id: 1, name: "Alice", visitedRestaurants: [1, 2], visitedSites: [1] },
  { _id: 2, name: "Bob", visitedRestaurants: [2], visitedSites: [2, 3] },
]);

// Create restaurants collection
db.restaurants.insertMany([
  { _id: 1, name: "Beirut Restaurant", location: "Beirut", ratings: [{ userId: 1, rating: 4 }] },
  { _id: 2, name: "Cedars Grill", location: "Bcharre", ratings: [{ userId: 2, rating: 5 }] },
]);

// Create touristic_sites collection
db.touristic_sites.insertMany([
  { _id: 1, name: "Jeita Grotto", location: "Jeita", ratings: [{ userId: 1, rating: 5 }] },
  { _id: 2, name: "Cedars Forest", location: "Bcharre", ratings: [{ userId: 2, rating: 5 }] },
  { _id: 3, name: "Pigeon Rocks", location: "Beirut", ratings: [] },
]);

// Transportation map
db.transportation = {
  buses: [
    { id: 1, route: ["Beirut", "Jeita"] },
    { id: 2, route: ["Beirut", "Bcharre"] },
  ],
  vans: [
    { id: 1, route: ["Bcharre", "Cedars Forest"] },
    { id: 2, route: ["Beirut", "Pigeon Rocks"] },
  ],
  taxis: [
    { id: 1, route: ["Beirut", "Jeita", "Bcharre"] },
    { id: 2, route: ["Bcharre", "Cedars Forest"] },
  ],
};

// Recommendation logic placeholder (can be implemented in the backend)
// Users can be recommended based on similarity in visited sites or restaurants.
db.recommendations = [
  { userId: 1, recommendations: ["Cedars Forest", "Pigeon Rocks"] },
  { userId: 2, recommendations: ["Jeita Grotto"] },
];
