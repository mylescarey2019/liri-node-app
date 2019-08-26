// API Key files

// console.log('In keys.js for API keys');

// export the spotify key using dotenv package and .env file content
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

// add one for movies (use trilogy)
exports.omdb = {
  id: process.env.OMDB_ID
};

// add one for bands-in-town
exports.bandsintown = {
  id: process.env.BANDS_IN_TOWN_ID
};