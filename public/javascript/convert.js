var js2xmlparser = require("js2xmlparser");


function convertData(data, headersTypeAcepted){

    const xmlRegex = new RegExp('\/xml')

    let newData
    let contentType = "application/json"
    newData = JSON.parse(data)

    if (xmlRegex.test(headersTypeAcepted)){
      // set header
      newData = js2xmlparser.parse("result", newData)
      contentType = "application/xml"
      console.dirxml(newData)
    }
    return {"data":newData, "content_type":contentType}
};

module.exports = convertData