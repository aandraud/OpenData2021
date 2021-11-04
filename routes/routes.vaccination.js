const express = require('express');
const router = express.Router();

const controller=require("../controllers/controllers.vaccination");

router.get('/vaccination_par_dep',controller.get_number_vaccination_by_dep)

router.get('',(req, res)=>{
    res.setHeader('Content-type','text/html')
    res.status(200).send("<p>Bonjour, bienvenue dans la section vaccination. Vous pouvez effectuer de nombreuses requêtes, ces dernières sont décrites ici</p> \n <table><thead><tr><th colspan=''>Requêtes disponibles</th></tr></thead><tbody><tr><td>Récupérer les nombres de vacination</td><td>URL</td></tr></tbody></table>");
})

module.exports=router;