const mongoose = require('mongoose')

// Creating the schema for any new restaurant
const restaurantSchema = new mongoose.Schema({
	name: { type: String, required: true},
	img: { type: String, required: true},
	cuisine: {type: String, required: true},
	city: {type: String, required: true},
	address: {type: String, required: true},
	dishes: {type: String}
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant