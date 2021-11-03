const express = require('express');
const router = express.Router();

const controller=require("../controllers/taux_vac");

router.get('/test/:id', controller.test)

router.get('/',controller.get_taux);

module.exports=router;