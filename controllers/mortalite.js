const functions = require('../public/javascript/fonction_share')

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

    // Traitement

    var json_data;
    // Parsing
    var preference_type = functions.get_file_type_requested(req.headers);
    res.status(201).send(functions.parse_to(preference_type,json_data))
}

