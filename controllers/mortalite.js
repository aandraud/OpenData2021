const functions = require('../public/javascript/fonction_share')
const data_process = require('../public/javascript/process_data')

exports.number_vac = (req ,res) => {
    var num_dep = req.params.id;
    var data_set_1 = functions.get_dep_info(req.params.id);
    var data_set_2 = functions.get_dep_info(req.params.id);
    // Reception de records
    var json = [{ 
        "id" : 5,
        "name" : "Jemmy overy",
        "data" : 10,
        "link" : "http:...",
    },
    { 
        "id" : 6,
        "name" : "John Smith",
        "data" : 12,
        "link" : "http:...",
    }]
    console.log(json);
    console.log("deb");

    data_process.process_json(json, 'name')

    console.log("fin");
    // Traitement
    for (var [cle, valeur] of Object.entries(json)){
        console.log(cle + ' attention ' + valeur.name);
    }
    var json_data;
    console.log(json.keys("name"));
    console.log(functions.parse_to("tut","trux"));
    // Parsing
    var preference_type = functions.get_file_type_requested(req.headers);
    res.status(201).send(functions.parse_to(preference_type,json_data))
}

exports.test = function(req, res) {
    console.log(functions.get_dep_info(34));

}



