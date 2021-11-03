exports.number_vac = (req ,res) => {
    console.log(req.params.id);
    //console.log(req.params.ids);
    /*
    var num_dep = req.params.id;
    var data_set_1 = functions.get_dep_info(req.params.id);
    var data_set_2 = functions.get_dep_info(req.params.id);
    // Reception de records
    */
    var json = { 
        "name": "Sara",
        "age": 23,
        "gender": "Female",
        "department": "History",
        "car": "Honda"
    }

    console.log(json.age);
}

