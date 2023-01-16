const options = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "usuario",
  password: process.env.DB_PASS || "usuario",
  database: process.env.DB_DATABASE || "restaurante",
  port:process.env.DB_PORT || 3306
};
module.exports = options;