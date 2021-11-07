var js2xmlparser = require("js2xmlparser");

function convertData(data, headersTypeAcepted, reqType) {
  // Convert data to specific format requested. Prefered format is rdf+xml. Default format is Json. 
  // Parameters:
  // data, json object : processed data
  // headersTypeAcceped, String : request.hearders.accept 
  // reqType, String: id of the request type. Values accepted are "vac", "hosp", "both"
  // Returns:
  // Dictionary with data and content-type informations

  const xmlRegex = new RegExp('\/xml');
  const xmlrdfRegex = new RegExp('rdf');
  let contentType = "application/json"; //default content type
  try {
    if (xmlrdfRegex.test(headersTypeAcepted)) {
      try {
        data = to_RDF(data, reqType);
      } catch {
        console.log("Erreur pendant la conversion en format RDF")
      }
      contentType = "application/rdf+xml";
    }
    else if (xmlRegex.test(headersTypeAcepted)) {
      try {
        data = js2xmlparser.parse("result", data);

      } catch {
        console.log("Erreur pendant la conversion au format XML")
      }
      contentType = "application/xml";
    };
  } catch {
    console.log("Erreur durant la conversion du format")
  }
  return { "data": data, "content-type": contentType }
};


function to_RDF(data, reqType) {
  if (reqType == "vac") { return vaccination_to_RDF(data) }
  else if (reqType == "hosp") { return hospitalisation_to_RDF(data) }
  else if (reqType == "both") { return hosp_vacc_to_RDF(data) }
  else { console.log("Error: Please select 'vac' 'hosp' or 'both' value for reqType parameter") };
};

function rdf(body) {
  return `<rdf:RDF 
    xlmns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns' 
    xlmns:igeo='http://rdf.insee.fr/def/geo
    xlmns:covidstats=':https://opendata2021.herokuapp.com/public/rdf/rdf_vocab'>
      ${body}
    </rdf>`
};

vaccination_to_RDF = function (resp) {
  body = `<igeo:Departement igeo:codeDepartement="${resp?.dep_code}" igeo:nom="${resp?.dep_name}">
  <covidstats:has_statistique covidstats:from_url="${resp?.source.source_url}" covidstats:dataset_id="${resp?.source.dataset_id}">
      <covidstats:Count covidstats:keyword="vaccination complete" covidstats:dateEffet="${resp?.source.data.date}" covidstats:has_count="${resp?.source.data.sourcen_cum_complet}" />
      <covidstats:Taux covidstats:keyword="vaccination complete" covidstats:dateEffet="${resp?.source.data.date}" covidstats:has_rate="${resp?.source.data.couv_complet}" />
  </covidstats:has_statistique>
  </igeo:Departement>`
  return rdf(body)
};

hospitalisation_to_RDF = function (resp) {
  body = `<igeo:Departement igeo:codeDepartement="${resp?.dep_code}" igeo:nom="${resp?.dep_name}">
  <covidstats:has_statistique covidstats:from_url="${resp?.source.source_url}" covidstats:dataset_id="${resp?.source.dataset_id}">
      <covidstats:Count covidstats:keyword="hospitalisation" covidstats:dateEffet="${resp?.source.data.date}" covidstats:has_count="${resp?.source.data.day_hosp}" />
      <covidstats:Count covidstats:keyword="soin intensif" covidstats:dateEffet="${resp?.source.data.date}" covidstats:has_count="${resp?.source.data.day_intcare}" />
  </covidstats:has_statistique>
</igeo:Departement>`
  return rdf(body)
};

hosp_vacc_to_RDF = function (resp) {
  const vaccination = resp?.data?.vaccination;
  const hospitalisation = resp?.data?.hospitalisation;
  body = `  <igeo:Departement igeo:codeDepartement="${resp?.dep_code}" igeo:nom="${resp?.dep_name}">
<covidstats:has_statistique>
       <covidstats:from_url="${resp?.data?.vaccination?.dataset_id}" covidstats:dataset_id="${resp?.data?.vaccination?.source_url}">
            <covidstats:Count covidstats:keyword="vaccination complete" covidstats:dateEffet="${resp?.data?.date}" covidstats:has_count="${vaccination?.n_cum_complet}" />
            <covidstats:Taux covidstats:keyword="vaccination complete" covidstats:dateEffet="${resp?.data?.date}" covidstats:has_rate="${vaccination?.couv_complet}" />
        </covidstats:from_url>
      <covidstats:from_url=${resp?.data?.hospitalisation?.dataset_id} covidstats:dataset_id=${resp?.data?.hospitalisation?.source_url}>
        <covidstats:Count covidstats:keyword="hospitalisation" covidstats:dateEffet="${resp?.data.date}" covidstats:has_count="${hospitalisation?.day_hosp}" />
        <covidstats:Count covidstats:keyword="soin intensif" covidstats:dateEffet="${resp?.data.date}" covidstats:has_count="${hospitalisation?.day_intcare}" />
        <covidstats:Count covidstats:keyword="total deces" covidstats:dateEffet="${resp?.data.date}" covidstats:has_count="${hospitalisation?.tot_death}" />
        <covidstats:Count covidstats:keyword="total sorties" covidstats:dateEffet="${resp?.data.date}" covidstats:has_count="${hospitalisation?.tot_out}" />
      </covidstats:from_url>
      <covidstats:from_url="${resp?.data?.temperature?.dataset_id}" covidstats:dataset_id="${resp?.data?.temperature?.source_url}">
        <covidstats:Mean covidstats:keyword="temperature" covidstats:dateEffet="${resp?.data?.date}" covidstats:has_mean="${resp?.data?.temperature?.temp_moy}" />
    </covidstats:from_url>
</covidstats:has_statistique>
</igeo:Departement>`;
  return rdf(body);
}
module.exports = convertData;