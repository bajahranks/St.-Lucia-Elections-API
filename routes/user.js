const express = require('express');
const router = express.Router();
const verify = require('../verifyToken');
const userCtlr = require("../controllers/user");

router.post('/register',  userCtlr.register);
router.post('/login', userCtlr.login);

router.get("/", verify, userCtlr.findAll);
router.get("/:id", verify, userCtlr.findOne);
router.put("/edit/:id", verify, userCtlr.update);
router.delete("/delete/:id", verify, userCtlr.delete);
router.delete("/delete", verify, userCtlr.deleteAll);

module.exports = router;