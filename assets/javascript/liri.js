// LIRI - Language Interpretation and Recognition Interface
// set environment
require("dotenv").config();
var keys = require("./keys.js");

// requires:
// file system - for reading/writing files
var fs = require("fs");

// allow resolving of relative path not originating in current directory
const path = require("path");

// fileCommand - logic to manage file read/write 
var fileCommandClass = require("./fileCommand.js");

// songs - logic to manage Spotify API
var musicClass = require("./songs.js");

// concerts - logic to manage Bands In Town API
var bandsInTownClass = require("./concerts.js");

// movies - logic to  manage OMDB API
var OMDBClass = require("./movies.js");

// require for inquier
var inquirer = require("inquirer");

// require for string-simliar
var stringSimilarity = require('string-similarity');


// global variables and functions
// instatiate objects 

// instansiate new file command object
var myFileCommand = new fileCommandClass.FileManage();

// instansiate new OMDB object
var myOMDB = new OMDBClass.OMDB(keys.omdb);

// instansiate new BandsInTown object
var myBandsInTown = new bandsInTownClass.BandsInTown(keys.bandsintown);

// instansiate new Spotify object
var myMusic = new musicClass.Music();

// holds command read from the input command file 'random.txt'
var commandFileCommands = [];

// flag used during parameter validation - this should be refactored
var readyForAPICall = true;

// valid liri commands
var validCommands = ['spotify-this','movie-this','concert-this','do-what-it-says'];
var fuzzyCommandList = ['spotify-this','movie-this','concert-this'];
var apiCommandList = ['spotify-this','movie-this','concert-this'];


 // function check if typing was close to valid command 
function checkCommand(command) {
  // console.log('in global.checkCommand');
  var matchResult = stringSimilarity.findBestMatch(command,fuzzyCommandList);
  return matchResult.bestMatch.target;
};  


 // function check if typing was close to valid command 
 function apiSwitch() {
  //  console.log('in global.apiSwitch');
   // append command to log
   myFileCommand.appendToLog(liriCommand + ' ' + liriSearchArg);

   // API call logic switch
   switch (liriCommand) {
    case 'spotify-this': myMusic.getSong(liriSearchArg)
      break;
  
    case 'concert-this': myBandsInTown.getConcert(liriSearchArg)
      break;  
  
    case 'movie-this': myOMDB.getMovie(liriSearchArg)
      break;   
  
    default:
      break;
  }
};


//-------------------------------------------------------------------
// main program flow
//-------------------------------------------------------------------

// capture file line entries
commandFileCommands = myFileCommand.readCommandInFile().split(' ');
// console.log('commands returned from input file: ', commandFileCommands);

var [fileCommand, ...fileArgs] = commandFileCommands;
var fileSearchArg = fileArgs.join(' ');

// capture command line entries
var [bin,sourcePath,liriCommand, ...liriArgs] = process.argv;
var liriSearchArg = liriArgs.join(' ');

// Now check the commands entered - via command line and/or file
if (validCommands.indexOf(liriCommand) === -1) {
  // invalid command
  readyForAPICall = false;
} // liri command is valid see if its do-what-it-says
else {
      // if calling for file command input reset values
      if (liriCommand === 'do-what-it-says') { 
          // ignore file command of do-what-it-says !
          // file command is invalid
          if (apiCommandList.indexOf(fileCommand) === -1) {
            // console.log('file command is invalid or file parameter is missing');
            readyForAPICall = false;
            liriCommand = fileCommand;
            liriSearchArg = fileSearchArg;
          }
          else { // valid - set to the lire variables 
                liriCommand = fileCommand;
                liriSearchArg = fileSearchArg;
          }
      }
    };

// now get ready to call API or prompt the user about what they miss-typed
// if not valid input then ask to try fuzzy answer instead
if (!readyForAPICall) {
  // get fuzzy answer using the string-simularity npm package
  var fuzzyPick =  checkCommand(liriCommand);
 
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Did you mean:   " + fuzzyPick + ' ' + liriSearchArg,
        name: "confirm",
        default: true
      }

    ])
    .then(function(response) {
      // console.log(response);
      // If the inquirerResponse confirms then proceed with API call based on fuzzy pick
      if (response.confirm) {
        liriCommand = fuzzyPick;
        // main logic switch 
        apiSwitch();
      }
      else {
        console.log('The command: ' + liriCommand + ' search term: ' + liriSearchArg + ' is invalid');
        console.log('Valid commands are: spotify-this songname, movie-this moviename, concert-this artist');
        console.log('or:  do-what-it-says to execute command in the random.txt file.');
      }
    });
}
else {  // ready for API Call
  // console.log('ready for API - original input - command is: ' + liriCommand + ' search term is: ' + liriSearchArg);
  // main logic switch 
  apiSwitch();
};

