// dependencias
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require('multer');
// express maneja rutas
const express = require("express");
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');

// environment vars
const authconfig = require('./auth0.env');
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

// ---- config auth0 ----

const rutas_lider = require("./routes/lider.routes");
const rutas_colab = require("./routes/colab.routes");
const rutas_coord = require("./routes/coord.routes");

app.use('/lider', requiresAuth(), rutas_lider);
app.use('/coord', requiresAuth(), rutas_coord);
app.use('/colab', requiresAuth(), rutas_colab);

// app.get('/', async (request, response, next) => {
//     const user_info = await request.oidc.fetchUserInfo();
//     res.send(`hello ${user_info.sub}`);
// });


app.listen(4000, () => console.log("http://localhost:4000/"));

