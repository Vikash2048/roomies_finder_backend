import axios from "axios"

// Replace with your OpenCage API key
const API_KEY = "5f460328678e44e29d11844d6cbabd6f";

// Replace with the address you want to geocode
const address = " National Highway 71B, Santosh Colony, Dharuhera, Haryana 123106";

// Build the request URL
// const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.OPENCAGE_API_KEY || API_KEY}`;


const getCoordinates = async() =>  {
  try {
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.OPENCAGE_API_KEY || API_KEY}`);

    if (response.data && response.data.results.length > 0) {
      // Extract latitude and longitude
      const { lat, lng } = response.data.results[0].geometry;
    //   console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      return { lat, lng };
    } else {
      console.log("No results found for the given address.");
    }
  } catch (error) {
    console.error("Error fetching geocoding data:", error.message);
  }
}

export { getCoordinates }

// getCoordinates(address);
