const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
	res.render('login', { error: undefined });
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.render('login', {
				error: info.message,
			});
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			var back = req.session.redirectTo || '/';
			delete req.session.redirectTo;
			return res.redirect(back);
		});
	})(req, res, next);
});

module.exports = router;
