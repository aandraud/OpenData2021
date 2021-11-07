const express = require('express');
const router = express.Router();

const controller=require("../controllers/controllers.vaccination");

router.get('/dep/:id',controller.get_number_vaccination_by_dep)

router.get('/dep/',controller.get_number_vaccination_by_dep)

router.get('/',(req, res)=>{
    res.setHeader('Content-type','text/html')
    res.status(200).send("<p>Bonjour, bienvenue dans la section vaccination.</p> \n\n <table><thead><tr><th colspan=''>Requête :</th></tr></thead><tbody><tr><td>Requête : Données sur le nombre de personne ayant un shéma vaccinal complet (Octobre 2021 : 2 doses) pour une département spécifié en paramètre ou sur l'ensemble du territoire français. \n Paramètre : (int) </td></tr><tr><th colspan=''>URL : </th></tr><td><a href= 'https://opendata2021.herokuapp.com/vaccination/vaccination_par_dep/34'>https://opendata2021.herokuapp.com/vaccination/dep/:id</a></td></tbody></table>");
})

module.exports=router;