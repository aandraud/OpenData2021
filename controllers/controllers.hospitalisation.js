const functions = require('../public/javascript/fonction_share')
const contentTypeHandler = require('../public/javascript/convert')
const data_process = require('../public/javascript/process_data')
const https = require('https');
const { response } = require('express');


// exports.test_promise_2 =async function(req, res){
//     let result = await functions.get_from_opendata('(dep_code%3D'+req.query['dep']+')',' ');
//     res.status(200).send(result)
// }


exports.get_number_hospitalisation_by_dep = async function (req, res) {
    /**
     * Permet de récupérer les information pour tout les départements
     */
    try {
        if (req.params.id == '') {
            return res.status(400).send("Erreur requête ! Spécifiez le département");
        }
        
        let result = await functions.get_from_opendata('(dep_code%3D' + req.params.id + ')', ' ');
        dict = json_head_creation(result.data)
        try {
            data = contentTypeHandler(dict, req.headers.accept, "hosp")
            res.setHeader('Content-Type', data["content-type"])
            res.status(200).send(data["data"]);
        } catch {
            res.send("Erreur fonction de conversion")
        }

    } catch {
        res.status(400).json("Veuillez préciser le code du département");
    }

}

exports.get_number_recall = function (req, res) {
    // configuration Header
    set_content_type = 'json'
    res.setHeader('Content-Type', 'text/' + set_content_type);
    console.log(req.headers['accept-language']);
    console.log(req);
}


function json_head_creation(json) {
    /**
     * Return json object type match to project defined format
     * json : json object
     */
    file_json = {

        "dep_name": json.records[0].fields.nom_dep_min,
        "dep_code": json.records[0].fields.dep_code,
        "source": {
            "dataset_id": json.parameters.dataset,
            "source_url": "https://public.opendatasoft.com",
            "data": []
        }
    }

    let data_clean = json['records'].map(obj => {
        let data = obj.fields;
        var jObjt = {};
        // jObjt['record_id']=obj.recordid;
        // jObjt['dep_code']=data.dep_code;
        // jObjt['dep_name']=data.dep_name;
        jObjt['day_hosp'] = data.day_hosp;
        jObjt['day_intcare'] = data.day_intcare;
        jObjt['date'] = data.date;
        // jObjt['variable'] = data.variable;
        return jObjt;
    });
    file_json.source.data = data_clean[0];
    return file_json;
}