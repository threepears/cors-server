"use strict";

const express = require("express");
const app = express();

// install request
const request = require('request');

const PORT = process.env.PORT || 3000;
const rovi = process.env.ROVI_APIKEY || '';


// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


// Request artist information from Rovi API
app.get('/api/:artist/:sig', (req, res) => {
  const artist = req.params.artist;
  const sig = req.params.sig;

  const url = "http://api.rovicorp.com/search/v2.1/music/search?apikey=" + rovi + "&sig=" + sig + "&query=" + artist + "&entitytype=artist&size=1&include=images,musicbio,discography,videos&formatid=62&type=main";

  console.log(url);

  request.get(url, (err, response, body) => {
    if (err) throw err;

    // res.header('Access-Control-Allow-Origin', '*');
    res.send(JSON.parse(body));
  });
});

http://api.rovicorp.com/data/v1.1/name/videos?format=json&apikey=utdr8pu2t7j6fprtfkuyb2ct&nameid=MN0000139026

// Request artist's video information from Rovi API
app.get('/videos/:nameid/:sig', (req, res) => {
  const nameId = req.params.nameid;
  const sig = req.params.sig;

  const url = "http://api.rovicorp.com/data/v1.1/name/videos?format=json&apikey=" + rovi + "&sig=" + sig + "&nameid=" + nameId;

  console.log(url);

  request.get(url, (err, response, body) => {
    if (err) throw err;

    res.send(JSON.parse(body));
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
