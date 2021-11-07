"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ;
const fs = require('fs');
//const file = require('./public/rdf/rdf_vocab.xml')

// add router
app.use('/vaccination', require('./routes/routes.vaccination'))
app.use('/hospitalisation', require('./routes/routes.hospitalisation'))
app.use('/dep', require('./routes/routes.dep'))


app.get('/rdf_vocab',(req,res) => {
  try{
    fs.readFile(__dirname + '/public/rdf/rdf_vocab.xml', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      res.status(200).send("<textarea style='border: none; margin: 0px; width: 894px; height: 870px;'>"+ data + "</textarea>")
    });
  }
  catch(error) {
    res.status(400).send("Erreur dans le chargement du fichier vocab rdf : " + error)
  }


})


app.listen(PORT, function () {
  console.log('API OpenData2021 démarrée sur le port:' + PORT);
});
