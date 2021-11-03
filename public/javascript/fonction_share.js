const http = require('https')

exports.get_dep_info = (data) => {
    console.log(data);
};

exports.get_open_info() => {
    url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&facet=date&facet=variable&facet=variable_label&facet=dep_name&facet=reg_code&facet=reg_name&facet=dep_area_code"
    http.get(url,(resp)=>{
        var data = resp.body
        data = JSON.parse(data)
        resp.status(200).send(data)
    })
}
