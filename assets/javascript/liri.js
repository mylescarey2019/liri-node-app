// LIRI - Language Interpretation and Recognition Interface
// set environment
require("dotenv").config();
var keys = require("./keys.js");
// console.log("keys are: ", keys);
// console.log(("spotfy: ",keys.spotify));
// console.log(("bandsintown: ",keys.bandsintown));
// console.log(("omdb: ",keys.omdb));

// requires:
// file system - for reading/writing files
var fs = require("fs");
// allow resolving of relative path not originating in current directory
const path = require("path");

// fileCommand - logic to manage file read/write 
var fileCommandClass = require("./fileCommand.js");
// songs - logic to manage Spotify API
var spotifyClass = require("./songs.js");
// concerts - logic to manage Bands In Town API
var bandsInTownClass = require("./concerts.js");
// movies - logic to  manage OMDB API
var OMDBClass = require("./movies.js");

// require for moment
var moment = require("moment");

// require for inquier

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
var mySpotify = new spotifyClass.Spotify(keys.spotify);

// holds command read from the input command file 'random.txt'
var commandFileCommands = [];

// valid liri commands
var validCommands = ['spotify-this','movie-this','concert-this','do-what-it-says'];
var fuzzyCommandList = ['spotify-this','movie-this','concert-this'];


 // function check if typing was close to valid command {
function checkCommand(command,commandInputValue) {
  console.log('in global.checkCommand');
  var matchResult = stringSimilarity.findBestMatch(command,fuzzyCommandList);
  console.log('string check object is:  ',matchResult);
  console.log('did you mean: ', matchResult.bestMatch.target + ' ' + commandInputValue);
  // string check object is:   {
  //   ratings: [
  //     { target: 'spotify-this', rating: 0.42105263157894735 },
  //     { target: 'movie-this', rating: 0.8235294117647058 },
  //     { target: 'concert-this', rating: 0.42105263157894735 },
  //     { target: 'do-what-it-says', rating: 0 }
  //   ],
  //   bestMatch: { target: 'movie-this', rating: 0.8235294117647058 },
  //   bestMatchIndex: 1
};  

//-------------------------------------------------------------------
// main program flow
//-------------------------------------------------------------------

// test new objects
// mySpotify.hello();
// myBandsInTown.hello();
// myOMDB.hello();
// myFileCommand.hello();

commandFileCommands = myFileCommand.readCommandInFile();
console.log('commands returned from input file: ', commandFileCommands);

// capture command line entries
// have to figure out how to deal with spaces in input parameter
// have to remember to apply a default input parameter for each 3 core types

liriCommand = process.argv[2];
liriCommandInput = process.argv[3];

console.log('liri command entered: ',liriCommand);
console.log('lire command input entered ',liriCommandInput);



if (validCommands.indexOf(liriCommand) === -1) {
  // invalid command
  console.log(liriCommand + ' is not valid command');
  checkCommand(liriCommand,liriCommandInput);
}
// valid command - see if its do-what-it-says
else {
  console.log(liriCommand + ' is valid command');
  // if calling for file command input reset values
  // to those from the file and at this point force to another valid 
  // command if operand is missing - refactor for robustness later
  if (liriCommand === 'do-what-it-says') {
    if (validCommands.indexOf(commandFileCommands[0]) === -1) {
      console.log(commandFileCommands[0] + ' from file is not valid command');
      //  force a valid search for now
      liriCommand = 'spotify-this'
      liriCommandInput = 'This Sign'
    }
    else {   // valid search but if term was missing force one
      console.log(commandFileCommands[0] + ' from file is valid command');
      liriCommand = commandFileCommands[0];
      liriCommandInput = (commandFileCommands[1] === undefined) ? 'The Sign' : commandFileCommands[1];
      }
    }     
};

console.log('ready for API - command is ' + liriCommand + ' term is ' + liriCommandInput);

// need a section to capture user correction on typo
// with suggestion presented via checkCommand
 
// main logic switch 
switch (liriCommand) {
  case 'spotify-this': mySpotify.getSong(liriCommandInput)
    break;

  case 'concert-this': myBandsInTown.getConcert(liriCommandInput)
    break;  

  case 'movie-this': myOMDB.getMovie(liriCommandInput)
    break;   

  default:
    break;
}









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




// deprecated - delete when above code is developed and tested

    // function readCommandFile() {
    //   console.log('in global.readCommandFile');
    //   return fs.readFileSync(path.resolve(__dirname,"../files/random.txt"), "utf8");
    //   };


    // function readCommandFile() {
    //   console.log('in global.readCommandFile');
    //   fs.readFile(path.resolve(__dirname,"../files/random.txt"), "utf8", function(error, data) {

    //     // If the code experiences any errors it will log the error to the console.
    //     if (error) {
    //       return console.log(error);
    //     }

    //     // We will then print the contents of data
    //     // console.log(data);

    //     // Then split it by commas (to make it more readable)
    //     commandFileCommands = data.split(",");

    //     // We will then re-display the content as an array for later use.
    //     console.log(commandFileCommands);

    //   });
    // }

    // function appendToLog(command) {
    //   console.log('in global.appendToLog');
    //   fs.appendFile(path.resolve(__dirname,"../files/log.txt"), command, function(err) {
    
    //     // If the code experiences any errors it will log the error to the console.
    //     if (err) {
    //       return console.log(err);
    //     }

    //     // Otherwise, it will print: "movies.txt was updated!"
    //     console.log("log.txt was updated!");

    //   });
    // }

    // var readData = readCommandFile();
    // commandFileCommands = readData.split(",");
    // console.log('commands are: ' ,commandFileCommands);



// file command testing
// console.log('command in file commands: ',commandFileCommands);
// myFileCommand.readCommandInFile();
// console.log('command in file commands: ',commandFileCommands);


// // read in the file command data
// fs.readFile("random.txt", "utf8", function(error, data) {

//   // If the code experiences any errors it will log the error to the console.
//   if (error) {
//     return console.log(error);
//   }

//   // We will then print the contents of data
//   console.log(data);

//   // Then split it by commas (to make it more readable)
//   var dataArr = data.split(",");

//   // We will then re-display the content as an array for later use.
//   console.log(dataArr);

// });

// // append this liri's command to the log file
// var sampleCommand = 'movie-this europa report';
// fs.writeFile("log.txt", sampleCommand, function(err) {

//   // If the code experiences any errors it will log the error to the console.
//   if (err) {
//     return console.log(err);
//   }

//   // Otherwise, it will print: "movies.txt was updated!"
//   console.log("log.txt was updated!");

// });
