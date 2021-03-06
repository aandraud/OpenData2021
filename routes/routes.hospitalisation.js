const express = require('express');
const router = express.Router();

const controller=require("../controllers/controllers.hospitalisation");

router.get('/nombre_hospi/', controller.get_number_recall);

router.get('/dep/:id',controller.get_number_hospitalisation_by_dep)


router.get('',(req, res)=>{
    res.setHeader('Content-type','text/html')
    res.status(200).send("<p>Bonjour, bienvenue dans la section hospitalisation.</p> \n <table><thead><tr><th colspan=''>Requête disponible :</th></tr></thead><tbody><tr><td>Récupérer le nombre de patients en soins intensifs (day_intcare) parmi l'ensemble des patients hospitalisés (day_hosp) dans le département sélectionné au jour J-2</td></tr><tr><th colspan=''>URL : </th></tr><td><a>https://opendata2021.herokuapp.com/hospitalisation/dep/:id</a></td></tbody></table>");
})

router.get('/dep',(req, res)=>{
    res.redirect('/hospitalisation')
})
module.exports=router;