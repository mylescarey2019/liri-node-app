// manage file input commands prompted by:
// requires:
// file system - for reading/writing files
var fs = require("fs");
const path = require("path");

class FileManage {
  constructor() {
    }

  //methods

   // read in the file command data - sync
   readCommandInFile() {
    // console.log('in FileManage Class.readCommandInFile');
    return fs.readFileSync(path.resolve(__dirname,"../files/random.txt"), "utf8");
  }


  // append this liri's command to the log file
  appendToLog(command) {
    // console.log('in FileManage Class.appendToLog');
    fs.appendFile(path.resolve(__dirname,"../files/log.txt"), '\n' + command, function(err) {
   
      // If the code experiences any errors it will log the error to the console.
      if (err) {
        return console.log(err);
      }
  
    });
  }

} 

// module.exports for use in other .js files
module.exports = {
  FileManage: FileManage
};