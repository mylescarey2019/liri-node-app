## (Language Interpretation and Recognition Interface)


Node.js app for song, movie, concert search

## Description

This node app retrieves API data for the user based on input and command selection.

Available data is songs from Spotify, movies from OMDB and concerts from Bands in Town.

Nice to have features could include
1.  corrective command interpretation 
    1. ex. command for songs is 'spotify-this-song song-name'
    2. if user misstyped 'sptify-this-son song-name'  the app would responde with
    3. did you you mean 'spotify-this-song song-name' y/n?
2.  help command
3.  logging of output to log.txt

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
    2. user can enter new command
    3. if no movie-name entered default to "My way"

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
    2. user can enter new command  
    3. if no movie-name entered the default movie-name to 'Mr. Nobody'

4.  user enters concert-this artist/band-name
    1. Bands in Town API returns information about upcoming concerts for the artist
        1. name of venue
        2. venue location
        3. data of event formatted as MM/DD/YYYY (use moment library)
    2. user can enter new command  

4.  user enters do-what-says
    1. the random.txt file is read and command executed 
        1. value in random.txt can be for any of the three commands

5.  user enters 'quit'
    1. program will say goodbye and terminate
        


### Psuedo Code - details TBD

1. Global
    1. Variables
    2. Functions

2. Objects/Classes
    1. song
        1. Properties
            1. TBD
        2. Methods
            1. TBD
    1. movie
        1. Properties
            1. TBD
        2. Methods
            1. TBD
    1. concert
        1. Properties
            1. TBD
        2. Methods
            1. TBD
    1. fileCommand
        1. Properties
            1. TBD
        2. Methods
            1. TBD
    1. help
        1. Properties
            1. TBD
        2. Methods
            1. TBD
    1. determineCommand
        1. Properties
            1. TBD
        2. Methods
            1. TBD
    1. correction
        1. Properties
            1. TBD
        2. Methods
            1. TBD       

3. Program Flow
    1. loop checking for commands until quit command detected
    2. determine command entered
        1. if not exact match of command name but close and parameter follows then ask user if they meant the actual command 
            1. if yes then execute command
            2. if no then print help command list
        2. if exact match but no parameter
            1. tell user then need to enter command and parameter
            2. re-listen for command
        3. if exact match of a command then execute the command
            1. spotify-this-song
            2. movie-this
            3. concert-this
            4. do-what-it-says
                1. reads random.txt and execute appropriate command
                    1. should do same close and missing parameter check as if
                    entered on command line
                2. if no random.txt tell users


         
