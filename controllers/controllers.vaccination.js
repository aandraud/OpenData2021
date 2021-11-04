const functions = require('../public/javascript/fonction_share')
const data_process = require('../public/javascript/process_data')
const https = require('https');

exports.get_number_vaccination_by_dep = async function(req, res){
    /**
     * Permet de récupérer les information pour tout les départements
     */

    console.log(req.get('content-type'));// Liste de fonction application et tout.
    let result = await functions.get_from_opendata('(dep_code%3D'+req.query['dep']+')','vac');
    let json={
        "dep_id":req.query['dep'],
        "data" : []
    }

    var data_clean = result['data'].map(obj => {
        var jObjt = {}
        jObjt['record_id']=obj.recordid
        jObjt['n_cum_d2']=obj.fields.n_cum_complet;
        jObjt['couv_complet'] = obj.fields.couv_complet;
        jObjt['date'] = obj.fields.date;
        //console.log("Nouvelle entrée", obj.fields.n_cum_rappel);
        //json["data"].push(jObjt)
        return jObjt;
    });
    json['data']=data_clean;

    let parse = await functions.parse_to(json.data,'xml')
    res.setHeader('Content-Type', 'text/'+parse.type);
    res.status(200).send(parse.data)
}

/*
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

}
*/