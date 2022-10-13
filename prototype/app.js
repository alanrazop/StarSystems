// dependencias
const ejs = require("ejs");
//const alert = Window.alert();
const bodyParser = require("body-parser");
const path = require("path");
const multer = require('multer');
// express maneja rutas
const express = require("express");
const app = express();

const csrf = require('csurf');
const csrfProtection = csrf();

const session = require('express-session');




// view engine es ejs, views es views por default
app.set("view engine", "ejs");
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
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

// app.get("/", (req, res) => {
//     res.render("index.ejs", { foo: "FOO" });
// });



app.use(session({
    secret: 'lknaeañco3pom4ñi3jrcñlawjomxñi3iq3mc4rsejf0438cnf83h4cknh43ui', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));


app.use(csrfProtection); 
app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});


const rutas_natdev = require("./routes/natdev.routes");
const  rutas_usuario = require("./routes/user.routes");


app.use('/home', rutas_natdev);
app.use('/user', rutas_usuario);

app.use((request, response, next) => {
    response.status(404).send('¡Error 404! El recurso solicitado no existe'); //Manda la respuesta
});

app.listen(4000, () => console.log("http://localhost:4000/"));
