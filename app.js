const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bodyparser = require('body-parser')

const mongoUrl = process.env.Mongo_URL
mongoose.connect(mongoUrl);
const port = process.env.PORT || 8000;

// Define Mongoose Schema
const contactSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});

// creating mongoose model
const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use(" /public ", express.static(" public ")); // For serving static files (pubic folder);
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});
app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(() => { res.send("This item has been saved to the database") }).catch(() => { res.status(400).send("Item was not saved to database") })
});

// START THE SERVER
app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}/`);
});
