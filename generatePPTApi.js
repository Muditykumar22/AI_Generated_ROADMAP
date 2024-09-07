const axios = require("axios");

async function generatePPT(topic) {
  try {
    const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.GENERATE_PPT_API_KEY}`;
    
    // Create request body based on the topic
    const requestBody = {
      topic: topic,
      slides: 5  // Assuming the number of slides is fixed between 5-7
    };
    
    // Make API request
    const response = await axios.post(apiUrl, requestBody);
    
    // Assuming API returns the URL or the PPT file
    return response.data; // Adjust this based on the actual API response
  } catch (error) {
    console.error("Error generating PPT:", error);
    throw new Error("Failed to generate PPT");
  }
}

module.exports = generatePPT;
