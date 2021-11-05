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

    console.log(result['data']);

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
        jObjt['variable'] = obj.fields.variable;
        jObjt['variable_label'] = obj.fields.variable_label;
        //console.log("Nouvelle entrée", obj.fields.n_cum_rappel);
        //json["data"].push(jObjt)
        return jObjt;
    });
    json['data']=data_clean;

    let parse = await functions.parse_to(json.data,'xml')
    res.setHeader('Content-Type', 'text/'+parse.type);
    res.status(200).send(parse.data)
}