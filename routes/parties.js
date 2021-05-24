const express = require('express');
const router = express.Router();
const partyCtlr = require("../controllers/party");
const verify = require('../verifyToken');

router.get("/", partyCtlr.findAll);
router.post("/", verify, partyCtlr.create);
router.get("/:id", partyCtlr.findOne);
router.put("/edit/:id", verify, partyCtlr.update);
router.delete("/delete/:id", verify, partyCtlr.delete);
router.delete("/delete", verify, partyCtlr.deleteAll);

module.exports = router;