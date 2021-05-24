const express = require('express');
const router = express.Router();
const resultCtlr = require("../controllers/result");
const verify = require('../verifyToken');

router.get("/", resultCtlr.findAll);
router.post("/", verify, resultCtlr.create);
router.get("/:id", resultCtlr.findOne);
router.put("/edit/:id", verify, resultCtlr.update);
router.delete("/delete/:id", verify, resultCtlr.delete);
router.delete("/delete", verify, resultCtlr.deleteAll);

module.exports = router;