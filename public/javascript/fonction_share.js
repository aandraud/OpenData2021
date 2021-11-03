const https = require("https");

var urls = {
    vac : "https://public.opendatasoft.com/explore/dataset/covid-19-france-vaccinations-age-sexe-dep/table/?disjunctive.variable_label&sort=date&q=dep_code%3D34&dataChart=eyJxdWVyaWVzIjpbeyJjaGFydHMiOlt7InR5cGUiOiJsaW5lIiwiZnVuYyI6IkFWRyIsInlBeGlzIjoibl9kb3NlMSIsInNjaWVudGlmaWNEaXNwbGF5Ijp0cnVlLCJjb2xvciI6IiNGRjUxNUEifV0sInhBeGlzIjoiZGF0ZSIsIm1heHBvaW50cyI6IiIsInRpbWVzY2FsZSI6InllYXIiLCJzb3J0IjoiIiwiY29uZmlnIjp7ImRhdGFzZXQiOiJjb3ZpZC0xOS1mcmFuY2UtdmFjY2luYXRpb25zLWFnZS1zZXhlLWRlcCIsIm9wdGlvbnMiOnsiZGlzanVuY3RpdmUudmFyaWFibGVfbGFiZWwiOnRydWUsInNvcnQiOiJkYXRlIiwicSI6ImRlcF9jb2RlPTM0In19fV0sImRpc3BsYXlMZWdlbmQiOnRydWUsImFsaWduTW9udGgiOnRydWUsInRpbWVzY2FsZSI6IiJ9",
    hos : "https://public.opendatasoft.com/api/records/1.0/search/?dataset=donnees-hospitalieres-covid-19-dep-france&q=dep_code%3D88&facet=date&facet=countrycode_iso_3166_1_alpha3&facet=region_min&facet=nom_dep_min&facet=sex"
}

exports.get_dep_info = function(id_dep) {
    /**
     * Permet de récupérer l'ensemble des information pour un département
     */
    var url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&rows=1000&refine.dep_code='+id_dep;

    console.log(url);
    https.get(url,resp =>{
        return resp
    })
};

exports.parse_to= function(type, data) {
    return type, data;
    /**
     * Permet de renvoyer le format souhaité passé en paramètre
     */
    
}

exports.get_file_type_requested = function (header_object) {
    /**
     * Renvois un tableau contenant l'ensemble des valeurs indispensable sous forme d'un tableau
     */
    var language;
    var encoding;
    var content_type;
}

exports.set_header = function() {
    //
}
