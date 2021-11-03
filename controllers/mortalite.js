var functions = require("../public/javascript/fonction_share");

exports.number_vac = (res, req) => {
    var num_dep = req.params.id;
    var data_set_1 = functions.get_dep_info(req.params.id);
    var data_set_2 = functions.get_dep_info(req.params.id);
    // Reception de records
    var json = { 
        "name": "Sara",
        "age": 23,
        "gender": "Female",
        "department": "History",
        "car": "Honda"
    }

    console.log(json.age);
}