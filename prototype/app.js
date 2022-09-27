// dependencias
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
// express maneja rutas
const express = require("express");
const app = express();
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

// environment vars
const authconfig = require('./auth0.env');

console.log(authconfig);

app.get('/profile', requiresAuth(), (request, response) => {
  response.send(JSON.stringify(request.oidc.user));
});

// view engine es ejs, views es views por default
app.set("view engine", "ejs");
app.set('views', 'views');

//ruta estatica
app.use(express.static(path.join(__dirname, 'public')));
//body parser settings
app.use(bodyParser.urlencoded({ extended: false }));
//manipular fácilmente las peticiones que llegan en formato JSON
app.use(bodyParser.json());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(authconfig));

// req.isAuthenticated is provided from the auth router
app.get('/', (request, response) => {
  if (request.oidc.isAuthenticated()) {
    response.render(path.join('index.ejs'))
  } else {
    response.redirect('login')
  }
});

// ---- config auth0 ----

const rutas_lider = require("./routes/lider.routes");
const rutas_colab = require("./routes/colab.routes");
const rutas_coord = require("./routes/coord.routes");

app.use('/lider', requiresAuth(), rutas_lider);
app.use('/coord', requiresAuth(), rutas_coord);
app.use('/colab', requiresAuth(), rutas_colab);

app.use('/', (request, response, next) => {
    response.render(path.join('error.ejs')); //Manda la respuesta
});

app.listen(4000, () => console.log("http://localhost:4000/"));

