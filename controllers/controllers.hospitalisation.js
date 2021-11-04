const functions = require('../public/javascript/fonction_share')
const data_process = require('../public/javascript/process_data')
const https = require('https');

exports.test_promise_2 =async function(req, res){
    console.log("Fonction : Promise 2 OK");
    let result = await functions.get_from_opendata('(dep_code%3D'+req.query['dep']+')',' ');
    res.status(200).send(result)
    //console.log(result);
    //console.log("Resultat de la fonction", result);
}

exports.get_number_hospitalisation_by_dep = async function(req, res){
    /**
     * Permet de récupérer les information pour tout les départements
     */
    let result = await functions.get_from_opendata('(dep_code%3D'+req.query['dep']+')',' ');
    let parse = await functions.parse_to(result.data)
    res.setHeader('Content-Type', 'text/json')
    var dict={};
    dict.nom_dep_min= result.data[0].fields.nom_dep_min;
    dict.day_hosp= result.data[0].fields.day_hosp;
    dict.day_intcare= result.data[0].fields.day_intcare;
    dict.dep_code= result.data[0].fields.dep_code;
    dict.date=result.data[0].fields.date;
   
   

    res.status(200).send(dict);
}

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
    } else if(request_info.variable == "Homme" || request_info.variable =="Femme" ) {
        variable_query=request_info.variable
    } else if (request_info.variable == 'tous') {
        variable_query = request_info.variable
    } else {
        res.status(406).send('Rejet de la requête ! Spécifiez entre sexe = ["homme","femme"] et tous ages = ["age"]');
    }
    let id_dep = request_info.dep;

     //type requêtes : département et variable label > {dep:34,variable:"sexe"}
    let url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=donnees-hospitalieres-covid-19-dep-france&q=&facet=day_intcare&refine.dep_code="+id_dep+"&refine.date="+variable_query;
    let http_req = https.get(url, (resp)=>{
        let data = '';
        resp.on('data', (chunk)=>{
            data += chunk;
        })
        resp.on('end', ()=>{
            data = JSON.parse(data)
            //console.log(data.records);
            let tab = [];
            tab.push(data.records[0].fields.day_intcare);
            tab.push(data.records[0].fields.day_hosp);
            tab.push(data.records[0].fields.date);
            tab.push(data.records[0].fields.dep_code);
            //resolve(global_data);
            //return global_data;
            res.status(200).json(tab)
        })
    })

    //res.status(201).send(req.query);
}


// const functions = require('../public/javascript/fonction_share')
// const data_process = require('../public/javascript/process_data')
// const https = require('https');

// exports.test_promise_2 =async function(req, res){
//     console.log("Fonction : Promise 2 OK");
//     let result = await functions.get_from_opendata('(dep_code%3D'+req.query['dep']+')',' ');
//     res.status(200).send(result)
//     //console.log(result);
//     //console.log("Resultat de la fonction", result);
// }

// exports.get_number_hospitalisation_by_dep = async function(req, res){
//     /**
//      * Permet de récupérer les informations pour tous les départements
//      */
//     let result = await functions.get_from_opendata('(dep_code%3D'+req.query['dep']+')',' ');
//     let parse = await functions.parse_to(result.data)
//     res.setHeader('Content-Type', 'text/json')
//     res.status(200).send(result)
// }

// exports.get_number_recall = function(req, res){
//     // configuration Header
//     set_content_type = 'json'
//     res.setHeader('Content-Type', 'text/'+set_content_type);
//     console.log(req.headers['accept-language']);
//     console.log(req);

//     request_info=req.query;
//     let variable_query;
//     if(request_info.variable == '' ){
//         res.status(406).send('Rejet de la requête ! Spécifiez entre sexe = ["homme","femme"] et tous ages = ["age"]');
//     } else if(request_info.variable == "Homme" || request_info.variable =="Femme" ) {
//         variable_query=request_info.variable
//     } else if (request_info.variable == 'tous') {
//         variable_query = request_info.variable
//     } else {
//         res.status(406).send('Rejet de la requête ! Spécifiez entre sexe = ["homme","femme"] et tous ages = ["age"]');
//     }
//     let id_dep = request_info.dep;

//     //type requêtes : département et variable label > {dep:34,variable:"sexe"}
//     let url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=donnees-hospitalieres-covid-19-dep-france&q=&facet=day_intcare&refine.dep_code="+id_dep+"&refine.date="+variable_query;
//     let http_req = https.get(url, (resp)=>{
//         let data = '';
//         resp.on('data', (chunk)=>{
//             data += chunk;
//         })
//         resp.on('end', ()=>{
//             data = JSON.parse(data)
//             //console.log(data.records);
//             var global_data=data.records;
//             //resolve(global_data);
//             //return global_data;
//             res.status(200).json(global_data)
//         })
//     })

//     //res.status(201).send(req.query);
// }