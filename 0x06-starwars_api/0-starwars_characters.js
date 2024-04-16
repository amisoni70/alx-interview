#!/usr/bin/node

const request = require('request');

// Function to fetch and print characters for a given movie ID
function printCharacters(movieId) {
  // Make request to fetch film details
  request(`https://swapi.dev/api/films/${movieId}/`, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
    } else {
      // Parse film details
      const film = JSON.parse(body);
      if (film.detail === 'Not found') {
        console.error('Movie not found.');
        return;
      }

      // Fetch characters
      const characters = film.characters;
      if (!characters || characters.length === 0) {
        console.error('No characters found for this movie.');
        return;
      }

      // Print characters
      console.log(`Characters in "${film.title}":`);
      fetchAndPrintCharacters(characters, 0);
    }
  });
}

// Function to recursively fetch and print characters
function fetchAndPrintCharacters(characterUrls, index) {
  if (index >= characterUrls.length) {
    return;
  }

  // Make request to fetch character details
  request(characterUrls[index], (error, response, body) => {
    if (error) {
      console.error('Error:', error);
    } else {
      // Parse character details
      const character = JSON.parse(body);
      console.log(character.name);
      // Fetch and print next character
      fetchAndPrintCharacters(characterUrls, index + 1);
    }
  });
}

// Get movie ID from command line arguments
const movieId = process.argv[2];
if (!movieId || isNaN(movieId)) {
  console.error('Please provide a valid movie ID as the first argument.');
} else {
  printCharacters(movieId);
}
