var express = require('express');
var router = express.Router();
const https = require('https');
var negotiate = require('express-negotiate');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Bienvenue sur petits emprunts bientôt en react !');
    console.log(req.headers)
  });

router.get('/dep', function (req, res, next) {
    url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code'
    let data = ''
    https.get(url, (resp) => {



        console.log(res.headers)// On récupère le param du file format

        console.log('statusCode:', resp.statusCode);
        //console.log('headers:', resp.headers);

        resp.on('data', (chunk) => {
            data += chunk;
        });


        resp.on('end', () => {
            //console.log(data);
            res.send(data)
            //console.log(JSON.parse(data));

        });

        //en fonction de req, faire le set
        console.log(req.headers.accept)

        //res.setHeader('Content-Type', 'xxx');
        //res.setHeader('Content-Encoding', 'xxx')
        //res.setHeader('Content-Encoding', 'xxx')
});


});


router.get('/pop', function(req, res, next) {
    const options = {
        hostname: 'https://public.opendatasoft.com',
        path: '/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code',
        method: 'GET'
    }

    https.get(options, (response) => {

        var result = ''
        response.on('data', function (chunk) {
            result += chunk;
        });

        response.on('end', function () {
            res.send(result)
        });

    });
});


module.exports = router;
