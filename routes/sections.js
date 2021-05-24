const express = require('express');
const router = express.Router();
const sectionCtlr = require("../controllers/section");
const verify = require('../verifyToken');

router.get("/", verify, sectionCtlr.findAll);
router.post("/", verify, sectionCtlr.create);
router.get("/:id", verify, sectionCtlr.findOne);
router.put("/edit/:id", verify, sectionCtlr.update);
router.delete("/delete/:id", verify, sectionCtlr.delete);
router.delete("/delete", verify, sectionCtlr.deleteAll);

module.exports = router;