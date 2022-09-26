// dependencias
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
// express maneja rutas
const express = require("express");
const app = express();
// view engine es ejs, views es views por default
app.set("view engine", "ejs");
app.set('views', 'views');

//ruta estatica
app.use(express.static(path.join(__dirname, 'public')));

//body parser settings
app.use(bodyParser.urlencoded({ extended: false }));
//manipular fácilmente las peticiones que llegan en formato JSON
app.use(bodyParser.json());

// ---- config auth0 ----
const { auth } = require('express-openid-connect');

// ESTA CONFIG LA VOY ABORRAR, SOLO ES PARA PROBAR
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:4000',
  clientID: 'ebjmTkCRasIP7rZTr94JMv30LylM148G',
  issuerBaseURL: 'https://dev-fx-x8vee.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (request, response) => {
  response.send(request.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// ---- config auth0 ----


app.get("/", (request, response) => {
    response.render("index.ejs", { foo: "FOO" });
});

const rutas_natdev = require("./routes/natdev.routes");

app.use('/home', rutas_natdev);

app.use((request, response, next) => {
    response.status(404).send('¡Error 404! El recurso solicitado no existe'); //Manda la respuesta
});

app.listen(4000, () => console.log("http://localhost:4000/"));
