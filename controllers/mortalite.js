const functions = require('../public/javascript/fonction_share')
const data_process = require('../public/javascript/process_data')
const https = require('https');
const { resolve } = require('path');

exports.number_vac = (req ,res, next) => {
    var num_dep = req.params.id;
    var data_set_1 = functions.get_dep_info(req.params.id);
    var data_set_2 = functions.get_dep_info(req.params.id);
    // Reception de records
    var json = [{ 
        "id" : 5,
        "name" : "Jemmy overy",
        "data" : 10,
        "link" : "http:...",
    },
    { 
        "id" : 6,
        "name" : "John Smith",
        "data" : 12,
        "link" : "http:...",
    }]
    console.log(json);
    console.log("deb");

    data_process.process_json(json, 'name')

    console.log("fin");
    // Traitement
    for (var [cle, valeur] of Object.entries(json)){
        console.log(cle + ' attention ' + valeur.name);
    }
    var json_data;
    console.log(json.keys("name"));
    console.log(functions.parse_to("tut","trux"));
    // Parsing
    var preference_type = functions.get_file_type_requested(req.headers);
    res.status(201).send(functions.parse_to(preference_type,json_data))
}

exports.test = function(req, res) {
    data = functions.get_dep_info(34)
    console.log(data);
}

exports.essaie_fonction = function(req, res){
    //data = functions.get_dep_info(34);
    data = functions.getJSON(34)
    console.log("Je suis dans la fonction essaie fonction");
    console.log(data);
    res.status(200).json("Terminé")
};

exports.get_number_recall = function(req, res){
    // configuration Header
    set_content_type = 'json'
    res.setHeader('Content-Type', 'text/'+set_content_type);
    console.log(req.headers['accept-language']);
    console.log(req);

    request_info=req.query;
    let variable_query;
    if(request_info.variable == '' ){
        res.status(406).send('Rejet de la requête ! Spécifiez entre sexe = ["homme","femme"] et tous ages = ["age"]');
    } else if(request_info.variable == "homme" || request_info.variable =="femme" ) {
        variable_query=request_info.variable
    } else if (request_info.variable == 'tous') {
        variable_query = request_info.variable 
    } else {
        res.status(406).send('Rejet de la requête ! Spécifiez entre sexe = ["homme","femme"] et tous ages = ["age"]');
    }
    let id_dep = request_info.dep;

    //type requêtes : département et variable label > {dep:34,variable:"sexe"}
    let url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=(variable_label+%3D+"+variable_query+"+AND+dep_code%3D"+id_dep+")&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code";
    let http_req = https.get(url, (resp)=>{
        let data = '';
        resp.on('data', (chunk)=>{
            data += chunk;
        })
        resp.on('end', ()=>{
            data = JSON.parse(data)
            //console.log(data.records);
            var global_data=data.records;
            //resolve(global_data);
            //return global_data;
            res.status(200).json(global_data)
        })
    })

    //res.status(201).send(req.query);
}