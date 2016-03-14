"use strict";

const express = require("express");
const app = express();

// install request
const request = require('request');

const PORT = process.env.PORT || 3000;
const rovi = process.env.ROVI_APIKEY || '';


// API page with CORS header
app.get('/api/:artist/:sig', (req, res) => {
  const artist = req.params.artist;
  const sig = req.params.sig;

  console.log(artist);
  console.log(sig);
  console.log(rovi);
  console.log(PORT);
  console.log(process.env);

  const url = "http://api.rovicorp.com/search/v2.1/music/search?apikey=" + rovi + "&sig=" + sig + "&query=" + artist + "&entitytype=artist&size=1&include=images,musicbio,discography,videos&formatid=16";

  console.log(url);

  request.get(url, (err, response, body) => {
    if (err) throw err;

    res.header('Access-Control-Allow-Origin', '*');
    res.send(JSON.parse(body));
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
