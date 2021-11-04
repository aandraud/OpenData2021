const { rejects } = require("assert");
let http = require("http"),https = require("https");
const { resolve } = require("path");
let xmlJ=require('xml-js');


exports.get_json = async function(id_dep){
    let url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&rows=1000&refine.dep_code='+id_dep;
    console.log(url);
    return new Promise((resolve)=>{
        https.get(url, res =>{
            let data = "";
            res.on('data', chunk => { data += chunk });
            res.on('end',()=>{
                json_data = JSON.parse(data);
                resolve(json_data["records"]);
            })
        })
    })
}

exports.parse_to= function(data) {
    return new Promise(resolve => {
        var options = {compact: true, ignoreComment: true, spaces: 4};
        var result = xmlJ.json2xml(data, options);
        resolve(result);
    })
    /**
     * Permet de renvoyer le format souhaité passé en paramètre
     */
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
