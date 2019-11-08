const express = require("express");
const Restaurant = require("../models/restaurants.js");
const User = require("../models/users.js");
const router = express.Router();

router.get("/seed", (req, res) => {
	Restaurant.create(
		[
			{
				name: "Meet Fresh",
				img:
					"https://s3-media2.fl.yelpcdn.com/bphoto/NDzaVnG3KtWZK1s_1Z1olA/l.jpg",
				cuisine: "Dessert",
				city: "Daly City",
				address: "148C Serramonte Ctr, Daly City, CA 94015",
				dishes: "Q Mochi, Hot Grass Jelly"
			},
			{
				name: "Cheese Board Pizza",
				img:
					"https://s3-media3.fl.yelpcdn.com/bphoto/ZKFWsPKioIppHqJWPo2bVw/o.jpg",
				cuisine: "Pizza",
				city: "Berkeley",
				address: "1512 Shattuck Ave, Berkeley, CA 94709",
				dishes: "Vegetarian Pizza, Corn Pizza"
			},
			{
				name: "Demiya",
				img:
					"https://s3-media4.fl.yelpcdn.com/bphoto/NOyuTiqQCDeZzDtbFL-_7g/o.jpg",
				cuisine: "Japanese",
				city: "San Jose",
				address: "375 Saratoga Ave Ste G, San Jose, CA 95129",
				dishes: "Japanese Curry, Chicken Katsu Curry"
			}
		],
		(err, data) => {
			res.redirect("/restaurants");
		}
	);
});

// Route to get to New page
router.get("/new", (req, res) => {
	res.render("restaurants/new.ejs");
});

// Route to get to Edit page
router.get("/:id/edit", (req, res) => {
	Restaurant.findById(req.params.id, (err, foundRestaurant) => {
		res.render("restaurants/edit.ejs", {
			restaurant: foundRestaurant
		});
	});
});

// Route to get to Show page
router.get("/:id", (req, res) => {
	Restaurant.findById(req.params.id, (err, foundRestaurant) => {
		// check if the user is logged in
		if (!req.session.user) {
			// redirect to the login page
		}

		let favorited = false;

		if (req.session.user) {
			console.log("req.session: ", req.session);

			if (req.session.user.favorites.indexOf(req.params.id) === -1) {
				favorited = false;
			} else {
				favorited = true;
			}
		}

		res.render("restaurants/show.ejs", {
			restaurant: foundRestaurant,
			username: req.session.username,
			favorited
		});
	});
});

// Route to get to Index Page
router.get("/", (req, res) => {
	Restaurant.find({}, (error, allRestaurants) => {
		res.render("restaurants/index.ejs", {
			restaurants: allRestaurants
		});
	});
});

// Route to edit entries in the collection
router.put("/:id", (req, res) => {
	Restaurant.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, updatedRestaurant) => {
			res.redirect("/restaurants/" + req.params.id);
		}
	);
});

router.put("/:id/favorite", (req, res) => {
	// if (req.session)

	// 1. Find the restaurant by id and return restaurant object
	// 2. Find the current logged in user's object to update
	console.log("session.user: ", req.session.user);
	console.log("req.params.id: ", req.params.id);
	if (req.session.user.favorites.indexOf(req.params.id) === -1) {
		User.findByIdAndUpdate(
			req.session.user._id,
			{ $addToSet: { favorites: req.params.id } },
			(err, updatedUser) => {
				console.log("updatedUser ADD favorite: ", updatedUser);
				res.redirect('/restaurants/' + req.params.id)
				return updatedUser;
			}
		);
	} else {
		User.findByIdAndUpdate(
			req.session.user._id,
			{ $pull: { favorites: req.params.id } },
			(err, updatedUser) => {
				console.log("updatedUser REMOVE favorite: ", updatedUser);
				return updatedUser;
			}
		);
	}
});

// Route to create entries in the collection
router.post("/", (req, res) => {
	Restaurant.create(req.body, (err, createdRestaurant) => {
		res.redirect("/restaurants");
	});
});

// Route to delete entries in the collection
router.delete("/:id", (req, res) => {
	Restaurant.findByIdAndRemove(req.params.id, (err, deletedRestaurant) => {
		res.redirect("/restaurants");
	});
});

module.exports = router;
