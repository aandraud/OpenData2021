const functions = require('../public/javascript/fonction_share')
const data_process = require('../public/javascript/process_data')
const https = require('https');

exports.get_number_vaccination_by_dep = async function(req, res){
    /**
     * Permet de récupérer les information pour tout les départements
     */
    let variable;
    if(req.query['variable']=="sex"){
        variable = req.query['variable'];
    } else if( req.query['variable']=="age" ) {
        variable = "tranche"
    } else {
        res.setHeader('Content-Type', 'text/json');
        return res.status(400).send("Erreur requête ! Spécifiez les variables désirées : variable=(sex/age) & dep=int");
    }
    let request = "(dep_code%3D"+req.query['dep']+"+%26+variable%3D"+variable+")"
    console.log(request);
    let result = await functions.get_from_opendata(request,'vac');

    let json={
        "dep_id":req.query['dep'],
        "dataset_id":result['data'][0].datasetid,
        "dep_name":result['data'][0].dep_name,
        "data" : []
    }

    var data_clean = result['data'].map(obj => {
        var jObjt = {}
        jObjt['record_id']=obj.recordid
        jObjt['n_cum_complet']=obj.fields.n_cum_complet;
        jObjt['couv_complet'] = obj.fields.couv_complet;
        jObjt['date'] = obj.fields.date;
        jObjt['variable'] = obj.fields.variable;
        jObjt['variable_label'] = obj.fields.variable_label;
        //console.log("Nouvelle entrée", obj.fields.n_cum_rappel);
        //json["data"].push(jObjt)
        return jObjt;
    });
    json['data']=data_clean;

    let parse = await functions.parse_to(json.data,'xml')
    res.setHeader('Content-Type', 'text/'+'json');
    res.status(200).send(json)
}

exports.get_number_vaccination_national = async function(req,res){
    let result = await functions.get_from_opendata('','vac');
    res.status(200).send(result['data'][0].dep_name);
}