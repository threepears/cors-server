"use strict";

const cors = require('cors')
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.AUDIO_DB_API_KEY || '045748';

const urlBase = "https://www.theaudiodb.com/api/v2/json/"

const options = {
    headers: {
      "X-API-KEY": API_KEY
    }
  };

app.use(cors());

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*splat', function(req, res, next) {
    console.log("ADDING HEADERS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("User-Agent", "Hoodat/1.0 http://hoodat.threepears.com/");
    res.header("X-Frame-Options", "SAMEORIGIN");
    console.log("FINISHED ADDING HEADERS")
    next();
});

// Request basic artist info to get artist id from The Audio DB API
app.get('/api/search/artist/:artist', async (req, res, next) => {
  const artist = req.params.artist;
  const url = urlBase + "search/artist/" + artist

  const response = await fetch(url, options);
  const data = await response.json();

  console.log("GET ARTIST ID", data)

  res.status(200).send(data);
});

// Request artist bio and photo from The Audio DB API
app.get('/api/lookup/artist/:artistId', async (req, res, next) => {
  const artistId = req.params.artistId;
  const url = urlBase + "lookup/artist/" + artistId

  const response = await fetch(url, options);
  const data = await response.json();

  console.log("GET ARTIST BIO", data)

  res.status(200).send(data);
});

// Request discography information from The Audio DB API
app.get('/api/list/discography/:artistId', async (req, res, next) => {
  const artistId = req.params.artistId;
  const url = urlBase + "list/discography/" + artistId

  const response = await fetch(url, options);
  const data = await response.json();

  console.log("GET DISCOGRAPHY INFO", data)

  res.status(200).send(data);
});

// Request album information from The Audio DB API
// app.get('/album/:albumId', async (req, res, next) => {
//   const albumId = req.params.albumId;
//   const url = "https://www.theaudiodb.com/api/v2/json/search/artist/" + artist

//   const response = await fetch(url, options);
//   const data = await response.json();

//   console.log("GET ALBUM INFO LINKS", data)

//   res.status(200).send(data);
// });

// Request artist video links from The Audio DB API
app.get('/api/lookup/video/:artistId', async (req, res, next) => {
  const artistId = req.params.artistId;
  const url = "https://www.theaudiodb.com/api/v1/json/123/mvid.php?i=" + artistId

  const response = await fetch(url, options);
  const data = await response.json();

  console.log("GET VIDEO LINKS", data)

  res.status(200).send(data);
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server running on port ${PORT}`);
});
