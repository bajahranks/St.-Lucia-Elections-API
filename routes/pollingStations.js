const express = require('express');
const router = express.Router();
const pollingStationCtlr = require("../controllers/pollingStation");
const verify = require('../verifyToken');

router.get("/", pollingStationCtlr.findAll);
router.post("/", verify, pollingStationCtlr.create);
router.get("/:id", pollingStationCtlr.findOne);
router.put("/edit/:id", verify, pollingStationCtlr.update);
router.delete("/delete/:id", verify, pollingStationCtlr.delete);
router.delete("/delete", verify, pollingStationCtlr.deleteAll);

module.exports = router;