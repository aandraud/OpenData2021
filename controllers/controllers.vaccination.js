const functions = require('../public/javascript/fonction_share')
const data_process = require('../public/javascript/process_data')
const https = require('https');

exports.get_number_vaccination_national = async function(req,res){
    console.log(req.query);
    let result = await functions.get_from_opendata('','vac');
    res.status(200).send(result);
}

exports.get_number_vaccination_by_dep = async function(req, res){
    /**
     * Cette fonction répond à la requête du nombre de personne par département.
     * dep : int
     * variable : string
     */
    try {
        let result;
        if(Object.keys(req.query).length === 0){
            // Si la variable est vide > renvoie de l'ensemble des informations.
            result = await functions.get_from_opendata('variable_label%3D+et+Femmes','vac');
            return res.status(200).json(json_head_creation(result.data));
        } else {
            // Si la requête est supérieure à 0
            let request = "(dep_code%3D"+req.query['dep']+"+%26+variable_label%3D+et+Femmes)";
            result = await functions.get_from_opendata(request,'vac');
            result = json_head_creation(result.data);
        }
        let parse = await functions.parse_to(result,'xml')
        res.setHeader('Content-Type', 'text/'+'json');
        res.status(200).send(result)
    } catch {
        res.status(400).json("Oups, une erreur est arrivée")
    }
}


function json_head_creation(json){
    //console.log(json["records"]);
    file_json = {
        "dataset_id":json.parameters.dataset,
        "data" : []       
    }

    let data_clean=json['records'].map(obj => {
        let data = obj.fields;
        var jObjt = {};
        jObjt['record_id']=obj.recordid;
        jObjt['dep_code']=data.dep_code;
        jObjt['dep_name']=data.dep_name;
        jObjt['n_cum_complet']=data.n_cum_complet;
        jObjt['couv_complet'] = data.couv_complet;
        jObjt['date'] = data.date;
        jObjt['variable'] = data.variable;
        return jObjt;
    });
    file_json.data=data_clean;
    return file_json;   
}