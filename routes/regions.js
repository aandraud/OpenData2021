var express = require('express');
var router = express.Router();
const https = require("https");
var convert = require('xml-js');
const xml2js = require('xml2js');
const converter = require('../public/javascript/convert')
var js2xmlparser = require("js2xmlparser");

/* GET home page. */
router.get('/', function (req, res, next) {

  //console.log(req.headers.accept.split(","));
  headersTypeAcepted = req.headers.accept

    
  var data = ""
    https.get( "https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&rows=5&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code&refine.reg_name=Occitanie",
      (resp) => {

        resp.on('data', (chunk) => {
          if (chunk !=  undefined) {
            data += chunk;
          }
        });

        resp.on('end', () => {
          
          result = converter(data, headersTypeAcepted)
          res.status(201).send(result["data"]);
          contentType = result["content_type"]

          //console.log(res.getHeader('accept'))
        })
      });

    console.log("regions")

    
    
  });

module.exports = router;