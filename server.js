"use strict";

const cors = require('cors')
const express = require("express");
const app = express();

// Install request
const request = require('request');

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.AUDIO_DB_API_KEY || '';

const urlBase = "https://www.theaudiodb.com/api/v2/json/"

const options = {
    headers: {
      "X-API-KEY": API_KEY
    }
  };

app.use(cors());

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    console.log("ADDING HEADERS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("User-Agent", "Hoodat/1.0 http://hoodat.threepears.com/");
    res.header("X-Frame-Options", "SAMEORIGIN");
    console.log("FINISHED ADDING HEADERS")
    next();
});

// Request basic artist info to get artist id from The Audio DB API
app.get('/api/search/artist/:artist', (req, res) => {
  const artist = req.params.artist;
  const url = urlBase + "search/artist/" + artist
  console.log("URL", url)

  request.get(url, options, (err, response, body) => {
    console.log("BODY", body)
    if (err) throw err;

    res.send(JSON.parse(body));
  });
});

// Request artist bio and photo from The Audio DB API
app.get('/api/lookup/artist/:artistId', (req, res) => {
  console.log("GETTING READY TO FETCH THAT SHIZZZ")
  const artistId = req.params.artistId;
  const url = urlBase + "lookup/artist/" + artistId
  console.log("FETCH INFO URL", url)

  request.get(url, options, (err, response, body) => {
    console.log("BODY", body)
    if (err) throw err;

    res.send(JSON.parse(body));
  });
});

// Request discography information from The Audio DB API
app.get('/api/list/discography/:artistId', (req, res) => {
  const artistId = req.params.artistId;
  const url = urlBase + "list/discography/" + artistId

  request.get(url, options, (err, response, body) => {
    if (err) throw err;

    res.send(JSON.parse(body));
  });
});

// Request album information from The Audio DB API
app.get('/album/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  const url = "https://www.theaudiodb.com/api/v2/json/search/artist/" + artist

  request.get(url, (err, response, body) => {
    if (err) throw err;

    res.send(JSON.parse(body));
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
