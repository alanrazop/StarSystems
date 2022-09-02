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

app.get("/", (req, res) => {
    res.render("actividades.ejs", { foo: "FOO" });
});

// -------- TEMPORAL TESTING -----------
app.get("/reporte", (req, res) => {
    res.render("reportes.ejs", { foo: "FOO" });
});

app.get("/colabs", (req, res) => {
    res.render("colaboradores.ejs", { foo: "FOO" });
});
// -------- TEMPORAL TESTING -----------

const rutas_natdev = require("./routes/natdev.routes");
app.use("/home", rutas_natdev);

app.listen(4000, () => console.log("http://localhost:4000/"));
