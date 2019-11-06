// ========================
// Dependencies
// ========================

const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

const app = express();
const db = mongoose.connection;

require("dotenv").config();

const restaurantsController = require('./controllers/restaurants.js')

// ========================
// Port
// ========================

const PORT = process.env.PORT;

// ========================
// Database
// ========================

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

// Error / Success
db.on("error", err => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

// ========================
// Middleware
// ========================

// Use public folder for static assets
app.use(express.static('public'))

// Populate req.body with parsed info from forms
app.use(express.urlencoded({ extended: false }))

// Be able to use delete and put routes
app.use(methodOverride('_method'))

app.use('/restaurants', restaurantsController)

// ========================
// Routes
// ========================

app.get('/', (req, res) => {
	res.send("hello world")
})

// ========================
// Listener
// ========================

app.listen(PORT, () => {
	console.log('listening on port: ', PORT)
})