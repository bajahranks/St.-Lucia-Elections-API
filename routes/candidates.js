const express = require('express');
const router = express.Router();
const candidateCtlr = require("../controllers/candidate");
const verify = require('../verifyToken');

router.get("/", candidateCtlr.findAll);
router.post("/", verify, candidateCtlr.create);
router.get("/:id", candidateCtlr.findOne);
router.put("/edit/:id", verify, candidateCtlr.update);
router.delete("/delete/:id", verify, candidateCtlr.delete);
router.delete("/delete", verify, candidateCtlr.deleteAll);

module.exports = router;