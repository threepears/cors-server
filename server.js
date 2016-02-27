"use strict";

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// API page with CORS header
app.get('/api', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send({hello: 'world'});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
