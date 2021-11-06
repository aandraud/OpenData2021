const functions = require('../public/javascript/fonction_share');
const convertData = require('../public/javascript/convert');

exports.get_number_vaccination_national = async function(req,res){
    let result = await functions.get_from_opendata('','vac');
    let parse = json_head_creation(result.data);
    xml = functions.parse_to(parse)
    console.log(xml);
    res.setHeader('Content-Type', 'text/'+'xml');
    res.status(200).send("Hello");
}


exports.get_number_vaccination_by_dep = async function(req, res){
    /**
     * This function send back number of complete vaccinated person by french departement
     * dep : int
     * variable : string
     */
    try {
        let result;
        let Type_Accepted = req.headers.accept;
        if(Object.keys(req.query).length === 0){
            // If query is empty > Send all data by date on every departement.
            result = await functions.get_from_opendata('variable_label%3D+et+Femmes','vac');
            // Data re-structured
            result = json_head_creation(result.data);
            //Convert data according to wishing type.
            let convert = convertData(result.data, Type_Accepted,'vac')
            //Header respond and respond send to client
            res.setHeader('Content-Type',convert['content-type']);
            return res.status(200).send(convert.data);
        } else {
            // If query is not empty
            //Query
            let request = "(dep_code%3D"+req.query['dep']+"+%26+variable_label%3D+et+Femmes)";
            result = await functions.get_from_opendata(request,'vac');
            // Data re-structured
            result = json_head_creation(result.data);
        
        let convert = convertData(result.data, Type_Accepted,'vac')
        res.setHeader('Content-Type', convert['content-type']);
        res.status(200).send(convert.data)
        }
    } catch {
        res.status(400).json("Oups, une erreur est arrivée")
    }
}

function json_head_creation(json){
    /**
     * Return json object type match to project defined format
     * json : json object
     */
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