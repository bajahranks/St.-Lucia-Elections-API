const express = require('express');
const router = express.Router();
//const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.send('respond with a resource');
});


/*router.post('/login', (req, res, next) => {
   passport.authenticate('local',
     (err, user, info) => {
        if (err) {
           return next(err);
        }

        if (!user) {
           return res.redirect('/login?info=' + info);
        }

        req.logIn(user, function(err) {
           if (err) {
              return next(err);
           }

           return res.redirect('/');
        });

     })(req, res, next);
});*/

module.exports = router;
