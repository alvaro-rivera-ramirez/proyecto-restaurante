const express = require("express");
const app = express();
const {json}=require('express/lib/response');
const morgan = require("morgan");
const path = require("path");
const ejs=require("ejs");
const flash=require('connect-flash');
const session =require('express-session');
const MySQLStore=require('express-mysql-session');

//aun no se que hace esta linea
//const expressLayouts=require('express-ejs-layouts')
//

//settings
//app.set('layout', path.join(__dirname,"views","layouts","main.ejs"));
//app.set("layout extractScripts", true)
app.set('port', process.env.port || 3000);    
app.set('view engine','ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//app.set("views", path.join(__dirname, "views"));
//middlewares

//app.use(expressLayouts);


const options = require('./config/options');
const sessionStore = new MySQLStore(options);
app.use(session({
    key: 'superusuario',
    secret: 'supercontrasenia',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.msg = req.flash('info');
    res.locals.error = req.flash('error');
    res.locals.lierror = req.flash('lierror');
    res.locals.cli_data = req.flash('cli_data');
    next();
});
//public
app.use("/public", express.static(path.join(__dirname, "/public")));


//routes
app.use(express.static('views'));
app.use(require('./routes/index.routes'));

/*
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/home", (req, res) => {
  res.render("home");
});
*/

//starting the server

app.listen(app.get("port"), () => {
  console.log(`Iniciando servidor en puerto ${app.get("port")}`);
});
