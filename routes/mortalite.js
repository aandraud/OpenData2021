const express = require('express');
const router = express.Router();

const controller=require("../controllers/mortalite");

router.get('/:id', controller.number_vac);

router.get('/test/:dep_id', controller.test)

module.exports=router;