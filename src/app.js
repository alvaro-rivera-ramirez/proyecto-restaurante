require('dotenv').config();
require("ejs");
const Server = require('./server');


const server = new Server();

server.listen();