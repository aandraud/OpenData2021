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

exports.get_infos_by_dep = async function(req, res){
    /**
     * Permet de récupérer les information pour tout les départements
     */
    let result = await functions.get_from_opendata('(dep_code%3D'+req.query['dep']+')','vac');
    let parse = await functions.parse_to(result.data,'xml')
    res.setHeader('Content-Type', 'text/json')

    let result1 = await functions.get_from_opendata('(dep_code%3D'+req.query['dep']+')',' ');
    let parse1 = await functions.parse_to(result.data,'xml')
    res.setHeader('Content-Type', 'text/json')



    var dict={};
    dict.n_cum_dose1= result.data[0].fields.n_cum_dose1;
    dict.day_couve_dose1= result.data[0].fields.couv_dose1;
    dict.dep_name= result.data[0].fields.dep_name;
    dict.reg_name= result.data[0].fields.reg_name;
    dict.date=result.data[0].fields.date;
    dict.n_cum_complet= result.data[0].fields.n_cum_complet;
    dict.couv_complet= result.data[0].fields.couv_complet;
    dict.dep_code= result.data[0].fields.dep_code;

    dict.day_intcare_new= result1.data[0].fields.day_intcare_new;
    dict.day_hosp_new= result1.data[0].fields.day_hosp_new;
    dict.nom_dep_min= result1.data[0].fields.nom_dep_min;
    dict.day_death_new= result1.data[0].fields.day_death_new;
    dict.day_hosp=result1.data[0].fields.day_hosp;
    dict.day_intcare= result1.data[0].fields.day_intcare;
    dict.tot_out= result1.data[0].fields.tot_out;
    dict.tot_death= result1.data[0].fields.tot_death;




    
    

    res.status(200).send(dict)
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