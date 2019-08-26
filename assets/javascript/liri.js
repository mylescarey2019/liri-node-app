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
 // want to leverage this using inquirier if time permits
function checkCommand(command) {
  // console.log('in global.checkCommand');
  var matchResult = stringSimilarity.findBestMatch(command,fuzzyCommandList);
  // console.log('string check object is:  ',matchResult);
  return matchResult.bestMatch.target;
  // console.log('did you mean: ', matchResult.bestMatch.target + ' ' + commandInputValue);
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


 // function check if typing was close to valid command 
 // want to leverage this using inquirier if time permits
 function apiSwitch() {
  //  console.log('in global.apiSwitch');
  //  if (!readyForAPICall) {
  //    console.log('ready for API - fuzzy answer - command is: ' + liriCommand + ' search term is: ' + liriSearchArg);
  //  }
  //  else {
  //    console.log('ready for API - original input - command is: ' + liriCommand + ' search term is: ' + liriSearchArg);
  //  };

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

// test new objects
// mySpotify.hello();
// myBandsInTown.hello();
// myOMDB.hello();
// myFileCommand.hello();

// capture file line entries
commandFileCommands = myFileCommand.readCommandInFile().split(' ');
// console.log('commands returned from input file: ', commandFileCommands);

var [fileCommand, ...fileArgs] = commandFileCommands;
var fileSearchArg = fileArgs.join(' ');
console.log('file args: ' + fileCommand + ' ' + fileSearchArg);

// capture command line entries
var [bin,sourcePath,liriCommand, ...liriArgs] = process.argv;
var liriSearchArg = liriArgs.join(' ');
console.log('liri args: ' + liriCommand + ' ' +  liriSearchArg);


// Now check the commands entered - via command line and/or file
if (validCommands.indexOf(liriCommand) === -1) {
  // invalid command
  // console.log(liriCommand + ' is not valid command');
  readyForAPICall = false;
} // liri command is valid see if its do-what-it-says
else {
      // console.log(liriCommand + ' is valid command');
      // if calling for file command input reset values
      if (liriCommand === 'do-what-it-says') { 
          // ignore file command of do-what-it-says !
          // file command is invalid
          if (apiCommandList.indexOf(fileCommand) === -1) {
            console.log('file command is invalid or file parameter is missing');
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
        // console.log('you meant to type: ', fuzzyPick + ' ' + liriSearchArg);
        // console.log('ready for API - fuzzy version - command is: ' + fuzzyPick + ' search term is: ' + liriSearchArg);
        liriCommand = fuzzyPick;
        // main logic switch 
        apiSwitch();
        // switch (liriCommand) {
        //   case 'spotify-this': mySpotify.getSong(liriSearchArg)
        //     break;
      
        //   case 'concert-this': myBandsInTown.getConcert(liriSearchArg)
        //     break;  
      
        //   case 'movie-this': myOMDB.getMovie(liriSearchArg)
        //     break;   
      
        //   default:
        //     break;
        // }
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
  // switch (liriCommand) {
  //   case 'spotify-this': mySpotify.getSong(liriSearchArg)
  //     break;

  //   case 'concert-this': myBandsInTown.getConcert(liriSearchArg)
  //     break;  

  //   case 'movie-this': myOMDB.getMovie(liriSearchArg)
  //     break;   

  //   default:
  //     break;
  // }
};



// //    if Y then run it
// //          checkCommand(liriCommand,liriSearchArg);
// //    if N then show valid commands and exit
// // if valid input then proceed


// // if no valid command break out
// if (readyForAPICall) {
//   console.log('ready for API - command is: ' + liriCommand + ' search term is: ' + liriSearchArg);
//   // main logic switch 
//   switch (liriCommand) {
//     case 'spotify-this': mySpotify.getSong(liriSearchArg)
//       break;

//     case 'concert-this': myBandsInTown.getConcert(liriSearchArg)
//       break;  

//     case 'movie-this': myOMDB.getMovie(liriSearchArg)
//       break;   

//     default:
//       break;
//   }
// }
// else {
//   console.log('The command: ' + liriCommand + ' search term: ' + liriSearchArg + ' is invalid');
//   console.log('Valid commands are: spotify-this songname, movie-this moviename, conert-this artist');
//   console.log('or:  do-what-it-says to execute command in the random.txt file.');
// };
 



 








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
