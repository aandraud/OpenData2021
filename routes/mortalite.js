const express = require('express');
const router = express.Router();

const controller=require("../controllers/mortalite");

router.get('/test/:dep_id', controller.test)

router.get("/essaie",controller.essaie_fonction)

router.get('/:id', controller.number_vac);

module.exports=router;