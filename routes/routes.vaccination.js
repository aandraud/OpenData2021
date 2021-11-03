const express = require('express');
const router = express.Router();

const controller=require("../controllers/controllers.vaccination");

router.get('/nombre_vacine/', controller.get_number_recall);

router.get('',(req, res)=>{
    res.setHeader('Content-type','text/html')
    res.status(200).send("<p>Bonjour, bienvenue dans la section vaccination. Vous pouvez effectuer de nombreuses requêtes, ces dernières sont décrites ici</p> \n <table><thead><tr><th colspan=''>Requêtes disponibles</th></tr></thead><tbody><tr><td>Récupérer les nombres de vacination</td><td>with two columns</td></tr></tbody></table>");
})

module.exports=router;