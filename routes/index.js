var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Bienvenue sur petits emprunts bientôt en react !');
  });

module.exports = router;
