//Get Keys from Config Files
require('dotenv').config()
var keys = require('./keys.js')

//Node Packages
var Spotify = require('node-spotify-api')
var axios = require('axios')
var moment = require('moment')
var fs = require('fs')

//variable to access keys information
var spotify = new Spotify(keys.spotify)

//Get arguments from process.argv
var arg1 = process.argv[2]
var arg2 = []

//Create Argument Array and String
for (var i = 3; i < process.argv.length; i++) {
    arg2.push(process.argv[i])
}
var argvString = arg2.join(' ')

//spotify-this-song function
var spotifyFunc = function () {
    spotify
        .search({
            type: 'track',
            query: argvString,
            limit: 1
        })
        .then(function (response) {
            //Artists, Track Name, Spotify Preview Link, Album
            var artistArr = []
            for (var i = 0; i < response.tracks.items[0].artists.length; i++) {
                artistArr.push(response.tracks.items[0].artists[i].name)
            }
            console.log(`Artist: ${artistArr.join(', ')}\nTrack Name: ${response.tracks.items[0].name}\nSpotify Preview Link: ${response.tracks.items[0].external_urls.spotify}\nAlbum Name: ${response.tracks.items[0].album.name}`)
        })
        .catch(function (err) {
            console.log(err)
        })
}

//movie-this function
var movieFunc = function () {
    axios
        .get(`http://www.omdbapi.com/?apikey=trilogy&t=${argvString}`)
        .then(function (response) {
            var rating = response.data.Ratings.find(ratings => ratings.Source === 'Rotten Tomatoes')

            if(rating){
                console.log(`Title: ${response.data.Title}\nYear: ${response.data.Year}\nRated: ${response.data.Rated}\nRotten Tomatoes: ${rating.Value}\nCountry: ${response.data.Country}\nLanguage: ${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}`)
            } else {
                console.log(`Title: ${response.data.Title}\nYear: ${response.data.Year}\nRated: ${response.data.Rated}\nRotten Tomatoes: No Rating\nCountry: ${response.data.Country}\nLanguage: ${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}`)
            }

        })
        .catch(function (err) {
            console.log(err)
        })
}

//do-what-it-says function
var doFunc = function () {
    fs.readFile('./random.txt', 'utf8', function (err, data) {
        if (err) throw err
        var dataSplit = data.split(',')
        argvString = dataSplit[1]
        if (dataSplit[0] === 'spotify-this-song') {
            spotifyFunc()
        } else if (dataSplit[0] === 'movie-this') {
            movieFunc()
        }
    })
}

//If statement for spotify-this-song movie-this do-what-it-says

if (arg1 === 'spotify-this-song') {
    if (!argvString) {
        argvString = 'The Sign'
    }
    spotifyFunc()
} else if (arg1 === 'movie-this') {
    if (!argvString) {
        argvString = 'Mr. Nobody'
    }
    movieFunc()
} else if (arg1 === 'do-what-it-says') {
    doFunc()
}