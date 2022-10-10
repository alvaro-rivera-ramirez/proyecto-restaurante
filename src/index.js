const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("ejs");
const app = express();
const expressLayouts=require('express-ejs-layouts')

app.set("port", process.env.PORT || 3000);
app.set('layout', path.join(__dirname,"views","layouts","main.ejs"));
app.set("layout extractScripts", true)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressLayouts)
//public
app.use("/public", express.static(path.join(__dirname, "/public")));


//routes

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/home", (req, res) => {
  res.render("home");
});



//starting the server

app.listen(app.get("port"), () => {
  console.log(`Iniciando servidor en puerto ${app.get("port")}`);
});
