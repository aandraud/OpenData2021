const { rejects } = require("assert");
let http = require("http"),https = require("https");
const { resolve } = require("path");
let xmlJ=require('xml-js');

function url_creation(req,database){
    if(database=='vac'){
        return 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q='+req+'&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code'
    } else {
        return 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=donnees-hospitalieres-covid-19-dep-france&q='+req+'&facet=date&facet=countrycode_iso_3166_1_alpha3&facet=region_min&facet=nom_dep_min&facet=sex';
    } 
}

exports.get_from_opendata = async function(request,database){
    let url = url_creation(request,database);
    return new Promise((resolve)=>{
        https.get(url, res =>{
            let data = "";
            res.on('data', chunk => { data += chunk });
            res.on('end',()=>{
                json_data = JSON.parse(data);
                resolve({statusCode : res.statusCode, data : json_data["records"]})
            })
        })
    })
}

exports.parse_to= function(data, type) {
        /**
     * Permet de renvoyer le format souhaité passé en paramètre
     */
    return new Promise(resolve => {
        var options = {compact: true, ignoreComment: true, spaces: 4};
        var result = xmlJ.json2xml(data, options);
        resolve(result);
    })
}


exports.get_file_type_requested = function (header_object) {
    /**
     * Renvois un tableau contenant l'ensemble des valeurs indispensable sous forme d'un tableau
     */
    var language;
    var encoding;
    var content_type;
}

exports.set_header = function() {
    //
}

exports.getJSON = function(option){
    console.log('rest::getJson');
    let req = https.get(option, (resp)=>{
        let output = '';
        resp.setEncoding('utf-8')
        resp.on('data',function(chunk) {
            output += chunk;
        })
        resp.on('end', () =>{
            try {
                let obj = JSON.parse(output);
                resolve({
                    statusCode : resp.statusCode,
                    data : obj
                });
            } catch (err){
                reject(err);
            }
        })
    })
}
