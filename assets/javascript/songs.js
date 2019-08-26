// manage song retrieval from spotify API

// Include the axios npm package 
var axios = require("axios");

// fileCommand - logic to manage file read/write 
var fileCommandClass = require("./fileCommand.js");

// instansiate new file command object
var myFileCommand = new fileCommandClass.FileManage();

// configure spotify
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

// class for Musc object to manage song inquiries
class Music {
  constructor() {
    }

  //methods

  // get Song from Spotify API
  getSong(searchName) {
    // console.log('in Music class object.getSong()');
    if (searchName === '') searchName = 'If You See Kay';
    // console.log('spotify id: ',process.env.SPOTIFY_ID);
    // console.log('spotify secret: ',process.env.SPOTIFY_SECRET);
    // console.log('search name is: ',searchName);

    // spotify API search
    spotify.search({ type: 'track', query: searchName })
    // spotify.search({ type: 'track', query: 'I Just Can\'t Stop Loving You' })
      .then(function(response) {
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        // console.log(response.tracks.items);
        var songs = response.tracks.items;
        var recodingOccurance = 1;
        var songFooter = '===========================================';
        songs.forEach(recording => {
          var allArtists = '';
          var firstArtist = true;
          recording.artists.forEach(artist => {
            if (firstArtist) {
              allArtists = artist.name;
              firstArtist = false;
            }
            else {
              allArtists += ', ' + artist.name;
            }; 
          });
          var songNumber = `<< ${recodingOccurance} >>`;
          var songArtists = "artist: " + allArtists;
          var songName = "song name: " + recording.name;
          var songPreview = "preview song: " + ((recording.preview_url === null) ? 'not available' : recording.preview_url);
          var songAlbum = "album name: " + recording.album.name;
          console.log(songNumber);
          myFileCommand.appendToLog(songNumber);
          console.log(songArtists);
          myFileCommand.appendToLog(songArtists);
          console.log(songName);
          myFileCommand.appendToLog(songName);
          console.log(songPreview);
          myFileCommand.appendToLog(songPreview);
          console.log(songAlbum);
          myFileCommand.appendToLog(songAlbum);
          console.log(songFooter);
          myFileCommand.appendToLog(songFooter);

          recodingOccurance++;
  
        });
      })
      .catch(function(err) {
        console.log(err);
      });

    }  
}

// module.exports for use in other .js files
module.exports = {
  Music: Music
};
