// LIRI - Language Interpretation and Recognition Interface
// set environment
require("dotenv").config();
var keys = require("./keys.js");
console.log("keys are: ", keys);
console.log(("spotfy: ",keys.spotify));
console.log(("bandsintown: ",keys.bandsintown));
console.log(("omdb: ",keys.omdb));


// requires:
// file system - for reading/writing files
var fs = require("fs");

// songs - logic to manage Spotify API
var spotifyClass = require("./songs.js");
// instansiate new Spotify object
var mySpotify = new spotifyClass.Spotify(keys.spotify);

// concerts - logic to manage Bands In Town API
var bandsInTownClass = require("./concerts.js");
// instansiate new BandsInTown object
var myBandsInTown = new bandsInTownClass.BandsInTown(keys.bandsintown);

// movies - logic to  manage OMDB API
var OMDBClass = require("./movies.js");
// instansiate new OMDB object
var myOMDB = new OMDBClass.OMDB(keys.omdb);

// test new objects
mySpotify.hello();
myBandsInTown.hello();
myOMDB.hello();

// now should be able to access key information like so:
// i am thinking this is instaniationg a new instance
// of the Spotify class passing it keys.spotify in the constructor
// Spotify class will be in the songs.js file

//******************************************
// EXAMPLE USE OF THE KEYS FROM ENV
//******************************************
// var spotify = new Spotify(keys.spotify);
//******************************************

// bonus functionality
  // In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
  // Make sure you append each command you run to the log.txt file. 
  // Do not overwrite your file each time you run a command.

  // use npm string-similarity for close matches on command
  // ex:  spotf-the-sng my way would prompt did you mean 'spotify-this-song my way ? Y/N' (using inquirer)

//---------------------------------------------
// global variables
//---------------------------------------------


//---------------------------------------------
// global functions
//---------------------------------------------



//---------------------------------------------
// objects and classes
//---------------------------------------------


// object
//    variables
//    methods


//---------------------------------------------
// main program flow
//---------------------------------------------