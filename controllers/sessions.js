const express = require('express')
const router = express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcrypt')

router.get('/new', (req, res) => {
	res.render('sessions/login.ejs')
})

router.post('/', (req, res) => {
	User.findOne({username: req.body.username}, (err, foundUser) => {
		if (foundUser === null) {
			res.redirect('/users/new')
		} else {
			const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
			if (doesPasswordMatch) {
				req.session.username = foundUser.username
				res.redirect('/')
			} else {
				res.redirect('/sessions/new')
			}
		}
	})
})

module.exports = router