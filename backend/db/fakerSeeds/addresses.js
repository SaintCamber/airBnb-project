const fs = require('fs');
const axios = require('axios');

// Generate a random latitude and longitude within a bounding box
const generateRandomCoordinates = (minLat, maxLat, minLon, maxLon) => {
  const lat = Math.random() * (maxLat - minLat) + minLat;
  const lon = Math.random() * (maxLon - minLon) + minLon;
  return { lat, lon };
};

// Query Overpass API for a random address
const getRandomAddress = async () => {
    const bbox = '-90,-90,90,90'; // Bounding box coordinates
    const endpoint = 'https://overpass-api.de/api/interpreter';
    const query = `[out:json][timeout:25];
      node["addr:housenumber"~"."]["addr:street"~"."](${bbox});
      out center;`;
  
    try {
      const response = await axios.post(endpoint, query);
      const {data} = response;
      if (data.elements.length === 0) {
        return null; // No address found
      }
      const randomIndex = Math.floor(Math.random() * data.elements.length);
      const element = data.elements[randomIndex];
      return {
              housenumber: element.tags['addr:housenumber'] || '',
              street: element.tags['addr:street'] || '',
              city: element.tags['addr:city'] || '',
              state: element.tags['addr:state'] || '',
              country: element.tags['addr:country'] || '',
              lat: element.lat,
              lon: element.lon
            };
    } catch (error) {
      console.error('Error retrieving address:', error);
      return null;
    }
  };
  

// Generate a list of random addresses
const generateRandomAddresses = async (count) => {
  const addresses = [];
  for (let i = 0; i < count; i++) {
    const coordinates = generateRandomCoordinates(-90, 90, -180, 180);
    const address = await getRandomAddress(coordinates);
    if (address) {
      addresses.push(address);
    }
  }
  return addresses;
};

// Save addresses to a file
const saveAddressesToFile = (addresses, filename) => {
  const data = addresses.map(address => JSON.stringify(address)).join('\n');
  fs.writeFileSync(filename, data);
  console.log(`Addresses saved to ${filename}`);
};

// Usage
const numberOfAddresses = 100;
const outputFilename = 'random_addresses.json';

generateRandomAddresses(numberOfAddresses)
  .then(addresses => saveAddressesToFile(addresses, outputFilename))
  .catch(error => console.error('Error:', error));
