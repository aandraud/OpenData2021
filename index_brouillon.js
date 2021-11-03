"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003 ;

app.get('/', function (req, res) {
res.send('Bienvenue sur notre api !');
});


app.listen(PORT, function () {
console.log('Api lancé sur le port :' + PORT);
});


const https = require('https');
var dep = 76
var url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&rows=1000&refine.dep_code='+dep

console.log(url);
https.get(url, (resp) => {
let data = '';

// A chunk of data has been received.
resp.on('data', (chunk) => {
data += chunk;
});

// The whole response has been received. Print out the result.
app.get('/dep', function (req, res) { 
let r = [];
var d = JSON.parse(data);
for (let pas = 0; pas < d.records.length; pas++) {
r.push(d.records[pas]);
}
res.send(r);
});


resp.on('end', () => {
console.log(JSON.parse(data));
});

}).on("error", (err) => {
console.log("Error: " + err.message);
});

