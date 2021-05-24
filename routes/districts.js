const express = require('express');
const router = express.Router();
const districtCtlr = require("../controllers/district");
const verify = require('../verifyToken');

router.get("/", districtCtlr.findAll);
router.post("/", verify, districtCtlr.create);
router.get("/:id", districtCtlr.findOne);
router.put("/edit/:id", verify, districtCtlr.update);
router.delete("/delete/:id", verify, districtCtlr.delete);
router.delete("/delete", verify, districtCtlr.deleteAll);

module.exports = router;