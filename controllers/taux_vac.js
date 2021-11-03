var request = require('request');
var fonction = require("../fonction/openDataSoft")

exports.get_taux = (req, res) => {
    console.log("Test");
    res.status(200).send("COUCOU")
    fonction.get_dep_info()
}

exports.test = (res, req) => {
    console.log('ttt');
    console.log(req.params.id);
    //res.status(200).send("Test")
    console.log(req);
}