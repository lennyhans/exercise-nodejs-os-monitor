var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const dateTime = req.query.datetime !== undefined ? req.query.datetime : null;
  
  router.controller.get(dateTime).then(r => {
    res.status(200).send(r);
    //next();
  }).catch(e => {res.status(500).send({message:"Something does not work", error: e})});

});

module.exports = (controller) => {
  router.controller = controller;
  return router;
};
