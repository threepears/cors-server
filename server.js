"use strict";

const express = require("express");
const app = express();

// install request
const request = require('request');

const PORT = process.env.PORT || 3000;
const rovi = process.env.ROVI_APIKEY || '';
const echo = process.env.ECHONEST_APIKEY || '';


// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("X-Frame-Options", "SAMEORIGIN");
    next();
});


// Request artist bio, photo, and discography from Rovi API
app.get('/api/:artist/:sig', (req, res) => {
  const artist = req.params.artist;
  const sig = req.params.sig;
  const url = "http://api.rovicorp.com/search/v2.1/music/search?apikey=" + rovi + "&sig=" + sig + "&query=" + artist + "&entitytype=artist&size=1&include=images,musicbio,discography,videos&formatid=62&type=main";

  request.get(url, (err, response, body) => {
    if (err) throw err;

    res.send(JSON.parse(body));
  });
});


// Request album information from Rovi API
app.get('/album/:albumId/:sig', (req, res) => {
  const albumId = req.params.albumId;
  const sig = req.params.sig;
  const url = "http://api.rovicorp.com/data/v1.1/album/info?apikey=" + rovi + "&sig=" + sig + "&albumid=" + albumId + "&include=images,tracks&imagesize=200-300x200-300";

  request.get(url, (err, response, body) => {
    if (err) throw err;

    res.send(JSON.parse(body));
  });
});


// Request artist's video information from Echonest API
app.get('/videos/:artist', (req, res) => {
  const artist = req.params.artist;
  const url1 = "http://developer.echonest.com/api/v4/artist/search?api_key=" + echo + "&format=json&name=" + artist + "&results=1";

  request.get(url1, (err, response, body) => {
    if (err) throw err;

    var bodyparse = JSON.parse(body);
    var artistId = bodyparse.response.artists[0].id;
    const url2 = "http://developer.echonest.com/api/v4/artist/video?api_key=" + echo + "&id=" + artistId + "&format=json&results=3&start=0";

    request.get(url2, (err, response, body) => {
      if (err) throw err;

      res.send(JSON.parse(body));
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
