"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ;

// add router
app.use('/vaccination', require('./routes/routes.vaccination'))
app.use('/hospitalisation', require('./routes/routes.hospitalisation'))
app.use('/dep', require('./routes/routes.dep'))

app.listen(PORT, function () {
  console.log('API OpenData2021 démarrée sur le port:' + PORT);
});
