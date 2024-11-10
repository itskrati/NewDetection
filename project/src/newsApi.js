const axios = require('axios');
require('dotenv').config();

async function fetchLatestNews() {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'in',
        apiKey: process.env.NEWS_API_KEY
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error.message);
    return [];
  }
}

module.exports = { fetchLatestNews };