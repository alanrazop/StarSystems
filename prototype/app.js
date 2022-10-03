// environment vars
const authconfig = require('./auth0.env');
// dependencias
var reqprom = require("request-promise");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require('multer');
// express maneja rutas
const express = require("express");
const app = express();
const { auth,
  requiresAuth,
  claimEquals,
  claimIncludes,
  claimCheck } = require('express-openid-connect');

// ------------ AXIOS ------------ //
const axios = require("axios").default;

const optionsAxios = {
  method: 'POST',
  url: 'https://dev-fx-x8vee.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"XtD5sgtJKspUSd6Rh3FEWd2kGe0S01BK","client_secret":"kxMLS93i_cx1Y8aZ8x4z_Z2blIp711BOoHX5fnUXIZ-Uz8Msb38GxxHzHwE113I1","audience":"https://dev-fx-x8vee.us.auth0.com/api/v2/","grant_type":"client_credentials"}'
};



async function get_token(options) { 
  let opt = {
    method: "GET",
    url: "https://dev-fx-x8vee.us.auth0.com/api/v2",
    headers: { "authorization": "" }
  } 
  await reqprom(options, function (error, response, body) {
    if (error) throw new Error(error);})
      .then((result => {
        
  })). catch(error => {
        console.log(error);
  });
}

function post_token(opts) {
  axios(opts)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}



console.log('-----------ORA PERRRO CHECATE ESTE CIERRE--------------')
console.log(get_token(optionsAxios))
console.log('-------------------------')



// ------------ AXIOS ------------ //
// // ---------------------- JSON WEB TOKEN BEGIN --------------------
// const { expressjwt : jwt } = require('express-jwt');
// const jwks = require('jwks-rsa');

// const jwtCheck = jwt({
//       secret: jwks.expressJwtSecret({
//           cache: true,
//           rateLimit: true,
//           jwksRequestsPerMinute: 5,
//           jwksUri: 'https://dev-fx-x8vee.us.auth0.com/.well-known/jwks.json'
//     }),
//     audience: 'https://API-test.com',
//     issuer: 'https://dev-fx-x8vee.us.auth0.com/',
//     algorithms: ['RS256']
// });

// app.use(jwtCheck);

// app.get('/authorized', function (req, res) {
//     res.send('Secured Resource');
// });

// const jwtCheck = jwt({
//       secret: jwks.expressJwtSecret({
//           cache: true,
//           rateLimit: true,
//           jwksRequestsPerMinute: 5,
//           jwksUri: 'https://dev-fx-x8vee.us.auth0.com/.well-known/jwks.json'
//     }),
//     audience: 'http://localhost:4000',
//     issuer: 'https://dev-fx-x8vee.us.auth0.com/',
//     algorithms: ['RS256']
// });

// app.use(jwtCheck);

// app.get('/authorized', function (req, res) {
//     res.send('Secured Resource');
// });
// ---------------------- JSON WEB TOKEN END ----------------------



// console.log(authconfig);


// view engine es ejs, views es views por default
app.set("view engine", "ejs");
app.set('views', 'views');

//ruta estatica
app.use(express.static(path.join(__dirname, 'public')));
//body parser settings
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: false }));

//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    //'uploads': Es el directorio del servidor donde se subirán los archivos 
    callback(null, 'uploads');
  },
  filename: (request, file, callback) => {
    //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
    //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
    callback(null, Date.now() + '-' + file.originalname);
  },
});

//En el registro, pasamos la constante de configuración y
//usamos single porque es un sólo archivo el que vamos a subir, 
//pero hay diferentes opciones si se quieren subir varios archivos. 
//'archivo' es el nombre del input tipo file de la forma
app.use(multer({ storage: fileStorage }).single('archivo'));


//manipular fácilmente las peticiones que llegan en formato JSON
app.use(bodyParser.json());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(authconfig));

app.get('/', (req, res, next) => {
  res.send(`Hello ${req.oidc.user.sub}, this is the payroll section.`)
});

// ---- config auth0 ----

const rutas_lider = require("./routes/lider.routes");
const rutas_colab = require("./routes/colab.routes");
const rutas_coord = require("./routes/coord.routes");

app.use('/lider', requiresAuth(), rutas_lider);
app.use('/coord', requiresAuth(), rutas_coord);
app.use('/colab', requiresAuth(), rutas_colab);


app.listen(4000, () => console.log("http://localhost:4000/"));

