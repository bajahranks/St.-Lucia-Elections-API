const express = require('express');
const router = express.Router();
const District = require("../models/District");
const Party = require("../models/Party");

router.get("/district_party", ((req, res, next) => {
  Party.find({})
    .sort({ name: 1})
    .then(parties => {
      District.find({})
        .sort({ name: 1 })
        .then(districts => {
          let result = {parties, districts}
          res.status(200).send(result);
        })
    }).catch(err => {
      res.status(500).send({ message: err.message || "Error retrieving information" });
  });
}));

module.exports = router;