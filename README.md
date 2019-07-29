# Week 10 HW - LIRI

This project was designed to take in one of three functions to output the following: a Spotify Song Search, a Movie Search, and a Random Search based on a text file.

### Spotify Search

In order to use the Spotify Search, in the command line, you would have to type in `spotify-this-song` followed by the name of the song you would want to search for. It would output the Artist(s), the Track Name, the Spotify Preview Link, and the Album Name.

![](https://i.imgur.com/01r4El1.jpg)

### Movie Search

In order to use the Movie Search, in the command line, you would have to type in `movie-this` followed by the name of the movie you would want to search for. It would output a variety of information pulled from the OMDB database.

![](https://i.imgur.com/vCxhYVj.jpg)

### Random Search

In order to use the Random Search, in the command line, you would have to type in `do-what-it-says`. It then reads the random.txt file in the same folder and depending on the parameters in the file, would do either a Spotify Search or a Movie Search.

![](https://i.imgur.com/jqmDbYY.jpg)

## Etc

This app was built with Node.js, with the Spotify and OMDB APIs, using Axios and the Node Spotify API.
