"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002 ;

app.get('/', function (req, res) {
  res.send('Bienvenue sur notre api !');
});
  


app.listen(PORT, function () {
  console.log('Api lancé sur le port :' + PORT);
});


const https = require('https');

https.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&facet=date&facet=dep_name&facet=reg_name&facet=dep_code&refine.dep_code=76', (resp) => {
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

router.get('/:id', (res,req)=>{
  console.log(res.params.id);
})