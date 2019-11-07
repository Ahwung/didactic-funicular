const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String},
	moderator: {type: Boolean, default: false},
	favorites: [{type:String}]
})

const User = mongoose.model("User", userSchema)

module.exports = User