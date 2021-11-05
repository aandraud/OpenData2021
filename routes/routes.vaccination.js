const express = require('express');
const router = express.Router();

const controller=require("../controllers/controllers.vaccination");

router.get('/vaccination_par_dep',controller.get_number_vaccination_by_dep)

router.get('/vaccination_national',controller.get_number_vaccination_national)

router.get('/',(req, res)=>{
    res.setHeader('Content-type','text/html')
    res.status(200).send("<p>Bonjour, bienvenue dans la section hospitalisation.</p> \n <table><thead><tr><th colspan=''>Requête disponible :</th></tr></thead><tbody><tr><td>Récupérer le nombre de patients en soins intensifs (day_intcare) parmi l'ensemble des patients hospitalisés (day_hosp) dans le département sélectionné au jour J-2</td></tr><tr><th colspan=''>URL : </th></tr><td><a>https://opendata2021.herokuapp.com/hospitalisation/hospitalisation_par_dep</a></td></tbody></table>");
})

module.exports=router;
