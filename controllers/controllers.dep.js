const functions = require('../public/javascript/fonction_share')
const data_process = require('../public/javascript/process_data')
const dataTypeHandler = require("../public/javascript/convert")
const https = require('https');

exports.get_infos_by_dep = async function(req, res){
    /**
     * Permet de récupérer les information pour tout les départements
     */
     try{
        if(req.params.id==''){
           return res.status(400).send("Erreur requête ! Spécifiez le département"); 
       }

    let result = await functions.get_from_opendata('(dep_code%3D'+req.params.id+')','vac');
    //let parse = await functions.parse_to(result.data,'xml')
    //res.setHeader('Content-Type', 'text/json')

    let result1 = await functions.get_from_opendata('(dep_code%3D'+req.params.id+')',' ');
    //let parse1 = await functions.parse_to(result.data,'xml')
    //res.setHeader('Content-Type', 'text/json')

    let result2 = await functions.get_from_opendata('(code_insee_departement%3D'+req.params.id+')','temp');
    

    var dict={};
    var dict1={};
    var dict2={};
    var dict3={};
    var dict4={};
    // dict2.n_cum_dose1= result.data.records[0].fields.n_cum_dose1;
    // dict2.day_couve_dose1= result.data.records[0].fields.couv_dose1;
    dict.dep_code= result.data.records[0].fields.dep_code;
    dict.dep_name= result.data.records[0].fields.dep_name;
    // dict.reg_name= result.data.records[0].fields.reg_name;
    dict1.date=result.data.records[0].fields.date;
    dict2.n_cum_complet= result.data.records[0].fields.n_cum_complet;
    dict2.couv_complet= result.data.records[0].fields.couv_complet;
    dict2.dataset_id = result.data.parameters.dataset;
    dict2.source_url = "https://public.opendatasoft.com";
    
    dict4.temp_moy=result2.data.records[0].fields.tmoy;
    dict4.source_url = "https://opendata.reseaux-energies.fr";
    dict4.dataset_id = result2.data.parameters.dataset;

    // dict3.day_intcare_new= result1.data.records[0].fields.day_intcare_new;
    // dict3.day_hosp_new= result1.data.records[0].fields.day_hosp_new;
    // dict3.day_death_new= result1.data.records[0].fields.day_death_new;
    dict3.day_hosp=result1.data.records[0].fields.day_hosp;
    dict3.day_intcare= result1.data.records[0].fields.day_intcare;
    dict3.tot_out= result1.data.records[0].fields.tot_out;
    dict3.tot_death= result1.data.records[0].fields.tot_death;
    dict3.dataset_id = result1.data.parameters.dataset;
    dict3.source_url = "https://public.opendatasoft.com"
    dict.data=dict1;
    dict1.vaccination=dict2;
    dict1.hospitalisation=dict3;
    dict1.temperature=dict4;
    
    try{
        data = dataTypeHandler(dict, req.headers.accept, "both")
        res.setHeader('Content-Type', data["content-type"]);
        res.status(200).send(data["data"])
    }catch{
        res.status(400).send("Erreur dans la conversion des données")
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