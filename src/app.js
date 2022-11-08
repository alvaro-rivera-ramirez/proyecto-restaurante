const express = require("express");
require('dotenv').config();
require("ejs");
const app = express();
const morgan = require("morgan");
const path = require("path");
const ejs = require("ejs");
const cors=require("cors");
const expressLayouts=require('express-ejs-layouts')
const cookieParser=require("cookie-parser");
app.set('port', process.env.port || 3000);    
app.set('view engine','ejs');
app.set('layout', "layouts/main.ejs");
app.set("layout extractScripts", true)
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(expressLayouts);
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use('/api/user',require("./routes/user.routes"))
app.use('/api/auth',require("./routes/auth.routes"))
app.use('/api/category',require("./routes/category.routes"))
app.use(require("./routes/interface/indexInterface"))

app.listen(app.get("port"), () => {
    console.log(`Iniciando servidor en puerto ${app.get("port")}`);
});