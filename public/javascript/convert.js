var js2xmlparser = require("js2xmlparser");

function convertData(data, headersTypeAcepted){

    const xmlRegex = new RegExp('\/xml')
    const xmlrdfRegex = new RegExp('\/xmlrdf')
    let newData
    let contentType = "application/json"
    newData = JSON.parse(data)

    if (xmlRegex.test(headersTypeAcepted)){
      // set header
      newData = js2xmlparser.parse("result", newData)
      contentType = "application/xml"
      console.dirxml(newData)
    }
    if (xmlrdfRegex.test(headersTypeAcepted)){
        // set header
        newData = rdflib.parse("result", newData)
        contentType = "application/rdfxml"
        console.dirxml(newData)
    }
    return {"data":newData, "content_type":contentType}
};


function rdf (body) {
 return `<rdf:RDF 
    xlmns:rdf='https:' 
    xlmns:igeo='http://rdf.insee.fr/def/geo
    xlmns:covidstats='http://'>
      ${body}
    </rdf>`
}

exports.vaccination_to_RDF = function (data){
  body = `<igeo:Departement igeo:codeDepartement="${data["dep_code"]}" igeo:nom="${data["nom_dep_min"]}">
  <covidstats:has_statistique>
      <covidstats:Count dcat:keyword="vaccination" covidstats:dateEffet="${data["date"]}" covidstats:has_count="${data["num_complet"]}" />
      <covidstats:Taux dcat:keyword="vaccination" covidstats:dateEffet="${data["date"]}" covidstats:has_rate="${data["couv_complet"]}" />
  </covidstats:has_statistique>
  </igeo:Departement>`
  return rdf(body)
}

exports.hospitalisation_to_RDF = function(data){
  body = `<igeo:Departement igeo:codeDepartement="${data["dep_code"]}" igeo:nom="${data["nom_dep_min"]}">
  <covidstats:has_statistique>
      <covidstats:Count dcat:keyword="hospitalisation" covidstats:dateEffet="${data["date"]}" covidstats:has_count="${data["day_hosp"]}" />
      <covidstats:Count dcat:keyword="soin intensif" covidstats:dateEffet="${data["date"]}" covidstats:has_count="${data["day_intcare"]}" />
  </covidstats:has_statistique>
</igeo:Departement>`
return rdf(body)
}

module.exports = convertData