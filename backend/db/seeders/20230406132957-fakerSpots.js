'use strict';
const spots = require('../fakerSeeds/createSpots.js');
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Spots';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options,[
      {
        "ownerId": 1,
        "address": "123 Main Street",
        "city": "Los Angeles",
        "state": "California",
        "country": "United States",
        "lat": 34.0522,
        "lng": -118.2437,
        "description": "Cozy apartment near downtown LA",
        "name": "Downtown Oasis",
        "price": 250
      },
      {
        "ownerId": 2,
        "address": "456 Elm Avenue",
        "city": "Miami",
        "state": "Florida",
        "country": "United States",
        "lat": 25.7617,
        "lng": -80.1918,
        "description": "Luxurious beachfront villa",
        "name": "Ocean Paradise",
        "price": 500
      },
      {
        "ownerId": 3,
        "address": "789 Pine Street",
        "city": "New York",
        "state": "New York",
        "country": "United States",
        "lat": 40.7128,
        "lng": -74.0060,
        "description": "Charming brownstone in Manhattan",
        "name": "City Retreat",
        "price": 300
      },
      {
        "ownerId": 4,
        "address": "1010 Oak Drive",
        "city": "Paris",
        "state": "",
        "country": "France",
        "lat": 48.8566,
        "lng": 2.3522,
        "description": "Quaint apartment in the heart of Paris",
        "name": "Le Petit Charme",
        "price": 200
      },
      {
        "ownerId": 5,
        "address": "1313 Maple Avenue",
        "city": "Tokyo",
        "state": "",
        "country": "Japan",
        "lat": 35.6895,
        "lng": 139.6917,
        "description": "Modern penthouse with stunning city views",
        "name": "Skyline Heights",
        "price": 800
      },
      {
        "ownerId": 6,
        "address": "1515 Cedar Street",
        "city": "Sydney",
        "state": "New South Wales",
        "country": "Australia",
        "lat": -33.8688,
        "lng": 151.2093,
        "description": "Spacious house near Bondi Beach",
        "name": "Beachside Bliss",
        "price": 400
      },
      {
        "ownerId": 7,
        "address": "1717 Walnut Avenue",
        "city": "Cancun",
        "state": "Quintana Roo",
        "country": "Mexico",
        "lat": 21.1619,
        "lng": -86.8515,
        "description": "Tropical villa with private pool",
        "name": "Sunset Retreat",
        "price": 600
      },
      {
        "ownerId": 8,
        "address": "1919 Pineapple Street",
        "city": "Rio de Janeiro",
        "state": "Rio de Janeiro",
        "country": "Brazil",
        "lat": -22.9068,
        "lng": -43.1729,
        "description": "Vibrant apartment in Copacabana",
        "name": "Samba Haven",
        "price": 350
      },
      {
        "ownerId": 9,
        "address": "2121 Oakwood Drive",
        "city": "Barcelona",
        "state": "Catalonia",
        "country": "Spain",
        "lat": 41.3851,
        "lng": 2.1734,
        "description": "Stylish loft in the Gothic Quarter",
        "name": "Urban Retreat",
        "price": 280
      },
      {
        "ownerId": 10,
        "address": "2323 Cherry Lane",
        "city": "Dubai",
        "state": "",
        "country": "United Arab Emirates",
        "lat": 25.2048,
        "lng": 55.2708,
        "description": "Luxury villa in the prestigious Palm Jumeirah",
        "name": "Desert Oasis",
        "price": 900
      },
      {
        "ownerId": 11,
        "address": "2525 Elmwood Avenue",
        "city": "London",
        "state": "",
        "country": "United Kingdom",
        "lat": 51.5074,
        "lng": -0.1278,
        "description": "Elegant townhouse in Kensington",
        "name": "Royal Residence",
        "price": 450
      },
      {
        "ownerId": 12,
        "address": "2727 Pine Street",
        "city": "Amsterdam",
        "state": "",
        "country": "Netherlands",
        "lat": 52.3702,
        "lng": 4.8952,
        "description": "Canal-side apartment in the historic center",
        "name": "Dutch Delight",
        "price": 320
      },
      {
        "ownerId": 13,
        "address": "2929 Maple Avenue",
        "city": "Rio de Janeiro",
        "state": "Rio de Janeiro",
        "country": "Brazil",
        "lat": -22.9068,
        "lng": -43.1729,
        "description": "Modern apartment near Ipanema Beach",
        "name": "Tropical Getaway",
        "price": 380
      },
      {
        "ownerId": 14,
        "address": "3131 Cedar Street",
        "city": "Bali",
        "state": "",
        "country": "Indonesia",
        "lat": -8.3405,
        "lng": 115.0920,
        "description": "Private villa surrounded by lush rice fields",
        "name": "Rice Terrace Retreat",
        "price": 600
      },
      {
        "ownerId": 15,
        "address": "3333 Walnut Avenue",
        "city": "Cape Town",
        "state": "Western Cape",
        "country": "South Africa",
        "lat": -33.9249,
        "lng": 18.4241,
        "description": "Spectacular cliffside house overlooking the ocean",
        "name": "Ocean View Haven",
        "price": 700
      },
      {
        "ownerId": 16,
        "address": "3535 Pineapple Street",
        "city": "Phuket",
        "state": "",
        "country": "Thailand",
        "lat": 7.8804,
        "lng": 98.3923,
        "description": "Tropical villa with a private beach",
        "name": "Paradise Cove",
        "price": 550
      },
      {
        "ownerId": 17,
        "address": "3737 Oakwood Drive",
        "city": "Athens",
        "state": "",
        "country": "Greece",
        "lat": 37.9838,
        "lng": 23.7275,
        "description": "Traditional house in Plaka, the old town of Athens",
        "name": "Authentic Greek Retreat",
        "price": 300
      },
      {
        "ownerId": 18,
        "address": "3939 Cherry Lane",
        "city": "Hawaii",
        "state": "",
        "country": "United States",
        "lat": 21.3069,
        "lng": -157.8583,
        "description": "Luxury villa with a private pool on the Big Island",
        "name": "Tropical Paradise",
        "price": 800
      },
      {
        "ownerId": 19,
        "address": "4141 Elmwood Avenue",
        "city": "Buenos Aires",
        "state": "",
        "country": "Argentina",
        "lat": -34.6037,
        "lng": -58.3816,
        "description": "Artistic loft in the trendy Palermo neighborhood",
        "name": "Bohemian Hideaway",
        "price": 250
      },
      {
        "ownerId": 20,
        "address": "4343 Pine Street",
        "city": "Rome",
        "state": "",
        "country": "Italy",
        "lat": 41.9028,
        "lng": 12.4964,
        "description": "Centrally located apartment near the Colosseum",
        "name": "Roman Retreat",
        "price": 350
      }
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    let Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.gt]: 0 },
    });
  }
};
