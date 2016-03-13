"use strict";

const express = require("express");
const app = express();

// install request

const PORT = process.env.PORT || 3000;

// API page with CORS header
app.get('/api/:artist/:sig', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const artist = req.params.artist;
  const sig = req.params.sig;

  console.log(artist);
  console.log(sig);

  res.send(artist);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
