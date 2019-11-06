const express = require("express")
const Restaurant = require('../models/restaurants.js')
const router = express.Router()

// Route to get to New page
router.get("/new", (req, res) => {
	res.render('restaurants/new.ejs')
})

// Route to create entries in the collection
router.post('/', (req, res) => {
	Restaurant.create(req.body, (err, createdRestaurant) => {
		res.redirect("/restaurants")
	})
})

module.exports = router