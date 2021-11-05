const express = require('express');
const router = express.Router();

const controller=require("../controllers/controllers.dep");

router.get('/dep/', controller.get_number_recall);

router.get('/donnees_par_dep',controller.get_infos_by_dep)

router.get('',(req, res)=>{
    res.setHeader('Content-type','text/html')
    res.status(200).send("<p>Bonjour, bienvenue dans la section département.</p> \n <table><thead><tr><th colspan=''>Requête disponible :</th></tr></thead><tbody><tr><td>Récupérer plusieurs informations pertinentes sur les hospitalisations et la vaccination dans le département sélectionné</td></tr><tr><th colspan=''>URL :</th></tr></tbody></table>");
})

module.exports=router;