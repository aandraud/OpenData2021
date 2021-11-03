"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ;
var http = require('https')

// add router
var indexRouter = require('./routes/index');

app.get('/24', (req ,res)=>{
  var data;
  console.log("djndn");
  fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=donnees-hospitalieres-covid-19-dep-france&q=dep_code%3D88&facet=date&facet=countrycode_iso_3166_1_alpha3&facet=region_min&facet=nom_dep_min&facet=sex")
  .then((data)=>{
    console.log("cojc", data);
    data = data;
    res.send(data);
  }).catch((err)=>{
    console.log(err);
  });
})

app.get('/54',(req,res)=>{
  var data;
  http.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=donnees-hospitalieres-covid-19-dep-france&q=dep_code%3D57&facet=date&facet=countrycode_iso_3166_1_alpha3&facet=region_min&facet=nom_dep_min&facet=sex',(data)=>{
    var datas = data.headers;
    console.log(datas["content-type"]);
  })
})

app.get('/', function (req, res, next) {
  console.log(req);
  res.json('Bienvenue sur petits emprunts bientôt en react !');
});

app.use("/", indexRouter);
app.use("/mortalite",require('./routes/mortalite'))

app.listen(PORT, function () {
  console.log('Petits emprunts lancé sur le port :' + PORT);
});