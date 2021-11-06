const express = require('express');
const router = express.Router();

const controller=require("../controllers/controllers.vaccination");

router.get('/vaccination_par_dep',controller.get_number_vaccination_by_dep)

router.get('/',(req, res)=>{
    res.setHeader('Content-type','text/html')
    res.status(200).send("<p>Bonjour, bienvenue dans la section vaccination.</p> \n <table><thead><tr><th colspan=''>Requête disponible :</th></tr></thead><tbody><tr><td>Données à jour du schéma vaccinal complet (2 doses) selon deux variables sélectionnées (sexe et âge) \n Variable : dep = 34, variable=age</td></tr><tr><th colspan=''>URL : </th></tr><td><a href= 'https://opendata2021.herokuapp.com/vaccination/vaccination_par_dep/?dep=34&variable=age'>https://opendata2021.herokuapp.com/vaccination/vaccination_par_dep/?dep=34&variable=age</a></td></tbody></table>");
})

module.exports=router;
