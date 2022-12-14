const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const {socketController}=require("./sockets/controller")
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);
    this.paths = {
      auth: "/api/auth",
      user: "/api/user",
      category: "/api/category",
      table: "/api/table",
      product: "/api/producto",
      floor: "/api/pisos",
      letter: "/api/letter",
    };

    // Configuraciones
    this.config();
    // Middlewares
    this.middlewares();
    
    // Rutas de mi aplicación
    this.routes();
    
    // Sockets
    this.sockets();
  }

  config() {
    this.app.set("view engine", "ejs");
    this.app.set("layout", "layouts/main.ejs");
    this.app.set("layout extractScripts", true);
    this.app.set("layout extractStyles", true);
  }
  middlewares() {
    // CORS
    this.app.use(cors());
    this.app.use(morgan("dev"));
    // Parseo de cookies
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(expressLayouts);

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use("/public", express.static(path.join(__dirname, "/public")));
  }

  sockets() {
    this.io.on("connection", socketController );
  }
  routes() {
    this.app.use(this.paths.auth, require("./routes/auth.routes"));
    this.app.use(this.paths.user, require("./routes/user.routes"));
    this.app.use(this.paths.category, require("./routes/category.routes"));
    this.app.use(this.paths.table, require("./routes/tables.routes"));
    this.app.use(this.paths.product, require("./routes/producto.routes"));
    this.app.use(this.paths.floor, require("./routes/pisos.routes"));
    this.app.use(this.paths.letter, require("./routes/letter.routes"));
    this.app.use(require("./routes/interface/indexInterface"));
    this.app.use(require("./routes/interface/adminInterface"));
    this.app.use(require("./routes/interface/meseroInterface"));
    this.app.use(require("./routes/interface/waiterInterface"));
    this.app.use(require("./routes/interface/chefInterface"));
    this.app.use(require("./routes/interface/cashInterface"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
