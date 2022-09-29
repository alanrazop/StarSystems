// environment vars
const authconfig = require('./auth0.env');
// dependencias
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

const axios = require("axios").default;
const options = {
  method: 'POST',
  url: 'https://dev-fx-x8vee.us.auth0.com/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: 'ebjmTkCRasIP7rZTr94JMv30LylM148G',
    client_secret: 'dELPyfnxxVy0zoar9J6UbzsmS94L1zDtdasLwfiEsphJFrY4nGIHeGxgxGTDOmnL',
    audience: 'https://API-test.com'
  })
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

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
        callback(null, Date.now() + '-' +file.originalname);
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

app.get( '/', claimCheck(({ isAdmin }) => isAdmin),
    (req, res) => res.send(`Hello ${req.oidc.user.sub}, this is the payroll section.`)
  );

// ---- config auth0 ----

const rutas_lider = require("./routes/lider.routes");
const rutas_colab = require("./routes/colab.routes");
const rutas_coord = require("./routes/coord.routes");

app.use('/lider', requiresAuth(), rutas_lider);
app.use('/coord', requiresAuth(), rutas_coord);
app.use('/colab', requiresAuth(), rutas_colab);




app.listen(4000, () => console.log("http://localhost:4000/"));

