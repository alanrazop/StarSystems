// dependencias
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
// express maneja rutas
const express = require("express");
const app = express();
// view engine es ejs, views es views por default
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:4000",
  clientID: "atG2tlYdfbLvnTyWJHqSFx4fCkbtmani",
  issuerBaseURL: "https://dev-fx-x8vee.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


const rutas_natdev = require("./routes/natdev.routes");
app.use("/home", rutas_natdev);

// User profile page
const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});


app.listen(4000, () => console.log("http://localhost:4000/"));
