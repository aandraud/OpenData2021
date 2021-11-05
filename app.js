"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ;


// add router


app.use('/vaccination', require('./routes/routes.vaccination'))

app.use('/hospitalisation', require('./routes/routes.hospitalisation'))

app.use('/dep', require('./routes/routes.dep'))



// add region
var regionRouter = require('./routes/regions');
app.use("/regions", regionRouter)

app.listen(PORT, function () {
  console.log('Petits emprunts lancé sur le port :' + PORT);
});
