"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ;

app.get('/', function (req, res, next) {
  res.json('Bienvenue dans notre API');
});

app.use("/mortalite",require('./routes/mortalite'))

app.listen(PORT, function () {
  console.log('Petits emprunts lancé sur le port :' + PORT);
});