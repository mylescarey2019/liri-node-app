# LIRI  
## (Language Interpretation and Recognition Interface)


Node.js app for song, movie, concert search

## Description
 
This node.js app has command line interface for retrieving song, movie and concert 
information.

The APIs for Spotify, OMDB and Bands in Town are used to retrieve information for
search values entered by the user.

The command format is:

1.  spotify-this-song <song name here>
2.  movie-this <movie name here>
3.  concert-this <artist/band name here>
4.  do-what-it-says

### Details

## Github project :
https://github.com/mylescarey2019/liri-node-app

## Screen Captures
Walk thru Gif

![Walk-Thru-Gif](assets/images/wireframe1.png)

Static pics:

![static-pic](assets/images/wireframe1b.png)


## Getting Started

### Native and NPM Packages Used
0.  fs and path - for file I/O tasks
1.  axios     - for http api calls
2.  dotenv    - for setting environment variable to hold api keys
3.  inquirer  - for interactive command line response on command typos
4.  moment    - for date-time formatting
5.  node-spotify-api  - to interact with Spotify API
6.  string-similarity - to find most likely intended command for command typos


### Dependencies

* none 

### Installing

* none necessary 

### Executing program

* open terminal session
  1. enter command terms 
        1. spotify-this-song <song name here>
        2.  movie-this <movie name here>
        3.  concert-this <artist/band name here>
        4.  do-what-it-says
    2. view results
    

## Help

For further development details see [UseCases and Psuedo Code](UseCases-PsuedoCode.md)

## Authors

Myles Carey 
mylescarey2019@gmail.com 

## Version History
 
* 0.1
    * Initial Release

## License


## Acknowledgments

Thanks to beta testers - my 15yo & 17yo daughters and wife 
