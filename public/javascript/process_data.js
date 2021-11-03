exports.process_json = function(json_object, attribut){
    for (var [cle, valeur] of Object.entries(json_object)){
        console.log(cle + ' attention ' + valeur[attribut]);
    }
}