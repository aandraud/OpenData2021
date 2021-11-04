const functions = require('../public/javascript/fonction_share')
const data_process = require('../public/javascript/process_data')
const https = require('https');

exports.test_promise_2 =async function(req, res){
    console.log("Fonction : Promise 2 OK");
    let result = await functions.get_from_opendata('(dep_code%3D'+req.query['dep']+')','vac');
    res.status(200).send(result)
    //console.log(result);
    //console.log("Resultat de la fonction", result);
}

exports.get_number_vaccination_by_dep = async function(req, res){
    /**
     * Permet de récupérer les information pour tout les départements
     */
    let result = await functions.get_from_opendata('(dep_code%3D'+req.query['dep']+')','vac');
    let json={
        "dep_id":req.query['dep'],
        "dataset_id":"covid-19-france-vaccinations-age-sexe-dep",
        "data" : {}

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
    })
    //json["data"].push(data_clean);
    

    json.data=data_clean
    console.log(json.data);


    //console.log(Object.values(Object.values(result.data)));

    //console.log(Object.values(result.data));
    //console.log(result_data);


    let parse = await functions.parse_to(result.data,'xml')
    res.setHeader('Content-Type', 'text/json')
    res.status(200).send(result)
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