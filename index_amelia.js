"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3010 ;

app.get('/', function (req, res) {
  res.send('Bienvenue sur notre api !');
});
  


app.listen(PORT, function () {
  console.log('Api lancé sur le port :' + PORT);
});


const https = require('https');

https.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&facet=date&facet=dep_name&facet=reg_name&facet=dep_code&refine.dep_code=34', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  app.get('/dep', function (req, res) { 
    res.send(data)
  });


  resp.on('end', () => {
    console.log(JSON.parse(data));
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});