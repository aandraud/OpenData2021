const { rejects } = require("assert");
let http = require("http"),https = require("https");
const { resolve } = require("path");


exports.get_dep_info = function(id_dep) {
    /**
     * Permet de récupérer l'ensemble des information pour un département
     */
    console.log("Je suis dans get région",id_dep);

    let url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-france-vaccinations-age-sexe-dep&q=&sort=date&rows=1000&refine.dep_code='+id_dep;

    /*
    let options = {json: true};

    let response = request(url, options, (error, res, body) =>{
        if(error){
            resolve(error)
        } else {
            console.log(body);
            resolve(body);
        }
    })

    console.log(response);
    */
    
    /*
    let req = https.get(url, function(res){
        let data = ''; 
        let json_data;
        res.on('data', function(stream){
            data += stream
        });
        res.on('end', function(){
            resolve(JSON.parse(data))
            json_data = JSON.parse(data)
            datas = json_data
        })
    })

    req.on('error', function(e){
        console.log(e.message);
    })
    */
    
   /*   
    getJSON(url, function(error, response){
    console.log(response);
})
*/


    /*
    console.log(url);

    https.get(url, function(res){
        var body = '';
        res.on('data', function(chunk){
            body = +chunk;
        })
        res.on('end', function(){
            console.log(body);
            var Response = JSON.parse(body);
            console.log("Got a response: ", Response);
        });
    }).on('error', function(e){
        console.log(e.message);
    })
    */


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

exports.getJSON = function(option){
    console.log('rest::getJson');
    let req = https.get(option, (resp)=>{
        let output = '';
        resp.setEncoding('utf-8')
        resp.on('data',function(chunk) {
            output += chunk;
        })
        resp.on('end', () =>{
            try {
                let obj = JSON.parse(output);
                resolve({
                    statusCode : resp.statusCode,
                    data : obj
                });
            } catch (err){
                reject(err);
            }
        })
    })
}
