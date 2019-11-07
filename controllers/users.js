const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/users.js')

// Seed data
router.get("/seed", (req, res) => {
	User.create(
		[
			{
				username: "adam",
				password: "asdf",
				moderator: true,
				favorites: []

			},
		],
		(err, data) => {
			res.redirect("/restaurants");
		}
	);
});

// Route to get to New User page
router.get('/new', (req, res) => {
	res.render('users/new.ejs')
})

// Route to create new user
router.post('/', (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
	User.create(req.body, (error, createdUser) => {
		res.redirect('/restaurants')
	})
})

module.exports = router