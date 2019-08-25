// manage file input commands prompted by:
// requires:
// file system - for reading/writing files
var fs = require("fs");
const path = require("path");

class FileManage {
  constructor() {
    }

  //methods

  hello() {
    console.log('in fileManage class object.hello()');
    console.log('Hello world - this is fileCommand.js');
  }

   // read in the file command data - sync
   readCommandInFile() {
    console.log('in FileManage Class.readCommandInFile');
    return fs.readFileSync(path.resolve(__dirname,"../files/random.txt"), "utf8");
  }


  // append this liri's command to the log file
  appendToLog(command) {
    console.log('in FileManage Class.appendToLog');
    fs.appendFile(path.resolve(__dirname,"../files/log.txt"), '\n' + command, function(err) {
   
      // If the code experiences any errors it will log the error to the console.
      if (err) {
        return console.log(err);
      }
  
      // Otherwise, it will print: "movies.txt was updated!"
      console.log("log.txt was updated!");
  
    });
  }

  // async
  // // read in the file command data
  // readCommandInFile() {
  //   console.log('in FileManage Class.readCommandInFile');
    
  //   fs.readFileSync(path.resolve(__dirname,"../files/random.txt"), "utf8", function(error, data) {
  //     console.log('in FileManage Class.readCommandInFile.readFileSync');
  //     // If the code experiences any errors it will log the error to the console.
  //     if (error) {
  //       console.log('error is',error);
  //       return;
  //     }
  
  //     // We will then print the contents of data
  //     console.log('data is: ', data);
  
  //     // Then split it by commas (to make it more readable)
  //     var commandArray = data.split(",");
  
  //     // We will then re-display the content as an array for later use.
  //     console.log('array is: ', commandArray);
  //     return commandArray;
  //   });
  // }

} 


// module.exports for use in other .js files
module.exports = {
  FileManage: FileManage
};