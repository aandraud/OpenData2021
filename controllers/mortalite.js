var functions = require("../public/javascript/fonction_share");

exports.number_vac = (res, req) => {
    var num_dep = req.params.id;
    var data_set_1 = functions.get_dep_info(req.params.id);
    var data_set_2 = functions.get_dep_info(req.params.id);
}