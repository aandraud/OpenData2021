const functions = require('../public/javascript/fonction_share')
const contentTypeHandler = require('../public/javascript/convert')
const data_process = require('../public/javascript/process_data')
const https = require('https');
const { response } = require('express');


// exports.test_promise_2 =async function(req, res){
//     let result = await functions.get_from_opendata('(dep_code%3D'+req.query['dep']+')',' ');
//     res.status(200).send(result)
// }


exports.get_number_hospitalisation_by_dep = async function(req, res){
    /**
     * Permet de récupérer les information pour tout les départements
     */
    try{
     if(req.params.id==''){
        return res.status(400).send("Erreur requête ! Spécifiez le département"); 
    }

    let result = await functions.get_from_opendata('(dep_code%3D'+req.params.id+')',' ');
    //let parse = await functions.parse_to(result.data)

    var dict={};
    var dict1={};
    dict.dep_code= result.data.records[0].fields.dep_code;
    dict.dep_name= result.data.records[0].fields.nom_dep_min;

    dict1.day_hosp= result.data.records[0].fields.day_hosp;
    dict1.day_intcare= result.data.records[0].fields.day_intcare;
    dict1.date=result.data.records[0].fields.date;

    dict.data=dict1;

    try{
        data = contentTypeHandler(dict, req.headers.accept, "hosp")
        res.setHeader('Content-Type', data["content-type"])
        res.status(200).send(data["data"]);
    }catch{
        res.send("Erreur fonction de conversion")
    }


}catch{
    res.status(400).json("Veuillez préciser le code du département");
}

} 

exports.get_number_recall = function(req, res){
    // configuration Header
    set_content_type = 'json'
    res.setHeader('Content-Type', 'text/'+set_content_type);
    console.log(req.headers['accept-language']);
    console.log(req);

    


    

}