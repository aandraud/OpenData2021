"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ;

// add router
var indexRouter = require('./routes/index');

app.get('/', function (req, res, next) {
  console.log(req);
  res.json('Bienvenue sur petits emprunts bientôt en react !');
});

app.use("/", indexRouter);
app.use("/mortalite",require('./routes/mortalite'))

app.listen(PORT, function () {
  console.log('Petits emprunts lancé sur le port :' + PORT);
});