## (Language Interpretation and Recognition Interface)


Node.js app for song, movie, concert search

## Description

This node app retrieves API data for the user based on input and command selection.

Available data includes songs from Spotify, movies from OMDB and concerts from Bands in Town.

Nice to have features could include
1.  corrective command interpretation (*** Created ***)
    1. ex. command for songs is 'spotify-this-song song-name'
    2. if user misstyped 'sptify-this-son song-name'  the app would responde with
    3. did you you mean 'spotify-this-song song-name' y/n?
2.  help command  (*** Future work ***)
3.  logging of output to log.txt  (*** Created ***)

## Command Summary
  1.  spotify-this-song <song name here>
  2.  movie-this <movie name here>
  3.  concert-this <artist/band name here>
  4.  do-what-it-says

## User Stories / Use Cases

1.  user starts bash session

2.  user enters spotify-this-song song-name
    1. spotify API returns information about song-name  
        1. artist(s)
        2. song name
        3. preview link of song
        4. album song is from
    2. if no song-name entered default to "My way"

3.  user enters movie-this movie-name
    1. OMDB API returns information about movie-name
        1. title of movie
        2. release year
        3. IMDB rating
        4. Rotten tomatoes rating
        5. country of origin
        6. language
        7. plot
        8. actors
    2. if no movie-name entered the default movie-name to 'Mr. Nobody'

4.  user enters concert-this artist/band-name
    1. Bands in Town API returns information about upcoming concerts for the artist
        1. name of venue
        2. venue location
        3. data of event formatted as MM/DD/YYYY (use moment library)

4.  user enters do-what-says
    1. the random.txt file is read and its command is executed 
        1. value in random.txt can be for any of the three commands

5.  corrective command interpretation
    1. if user mis-spells one of the 3 commands (spotify-this, movie-this
    concert-this) liri will respond asking if user meant to type the correct name
        1. example move-dis the martian would result in 
        2. did you mean movie-this the martian Y/N?
    2. if user answers Y then liri will execute the corrected command
    3. if user answers N then lire will print list of valid commands and
       terminate
      

### Psuedo Code - details TBD

1. Global
    1. Variables
    2. Functions

2. Objects/Classes
    1. song
        1. Properties
            1. none
        2. Methods
            1. getSong
    1. movie
        1. Properties
            1. apiKey in constructor
        2. Methods
            1. getMovie
    1. concert
        1. Properties
            1. apiKey in constructor
        2. Methods
            1. getConcert
    1. fileCommand
        1. Properties
            1. none
        2. Methods
            1. readInputFile
            2. appendLog
    1. correction
        1. Properties
            1. command entered
            2. valid command list
        2. Process
            1. uses npm string-simulartity to determine
            which of the valid commands the invalid command 
            most closely matches       

3. Program Flow
    1. determine command entered
        1. if not exact match of command name but close and parameter follows then ask user if they meant the actual command 
            1. if yes then execute command
            2. if no then print help command list
        2. if exact match but no parameter
            1. use default parameter
        3. if exact match of a command then execute the command
            1. spotify-this-song
            2. movie-this
            3. concert-this
            4. do-what-it-says
                1. reads random.txt and execute appropriate command
                    1. should do same close and missing parameter check as if
                    entered on command line
                2. if no random.txt tell users


         
