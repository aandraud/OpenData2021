const functions = require('../public/javascript/fonction_share');
const convertData = require('../public/javascript/convert');

exports.get_number_vaccination_by_dep = async function(req, res){
    /**
     * This function send back number of complete vaccinated person by french departement
     * dep : int
     * variable : string
     */
    try {
        let result;
        let Type_Accepted = req.headers.accept;7
        console.log("here")
        if(Object.keys(req.params).length===0){
            // If query is empty > Send all data by date on every departement.
            result = await functions.get_from_opendata('variable_label%3D+et+Femmes','vac');
            // Data re-structured
            result = json_head_creation(result.data);
            //Convert data according to wishing type.
            try{
                let convert = convertData(result, Type_Accepted,'vac')
            }catch{
                console.log("Erreur pendant la conversion des données")
            }

            //Header respond and respond send to client
            res.setHeader('Content-Type',convert['content-type']);
            return res.status(200).send(convert.data);
        } else {
            // If query is not empty
            //Query
            let request = "(dep_code%3D"+req.params.id+"+%26+variable_label%3D+et+Femmes)";
            result = await functions.get_from_opendata(request,'vac');
            // Data re-structured
            result = json_head_creation(result.data);
            try{
                let convert = convertData(result, Type_Accepted,'vac')
            }catch{
                console.log("Erreur pendant la conversion du format des données")
            }

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
        "dep_name": json.records[0].fields.dep_name,
        "dep_code": json.records[0].fields.dep_code, 
        "source": {
            "source_url": "https://public.opendatasoft.com",
            "dataset_id": json.parameters.dataset
        }      
    }

    // let data_clean=json['records'].map(obj => {
    //     let data = obj.fields;
    //     var jObjt = {};
    //     jObjt['record_id']=obj.recordid;
    //     // jObjt['dep_code']=data.dep_code;
    //     // jObjt['dep_name']=data.dep_name;
    //     jObjt['n_cum_complet']=data.n_cum_complet;
    //     jObjt['couv_complet'] = data.couv_complet;
    //     jObjt['date'] = data.date;
    //     // jObjt['variable'] = data.variable;
    //     return jObjt;
    // });

    // file_json.source.data=data_clean;
    console.log(file_json)
    return file_json;   
}