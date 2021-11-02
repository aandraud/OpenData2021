"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ;

// add router
var indexRouter = require('./routes/index');
app.use("/", indexRouter);

app.listen(PORT, function () {
  console.log('Petits emprunts lancé sur le port :' + PORT);
});