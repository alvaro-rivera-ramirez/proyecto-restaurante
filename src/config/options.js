const options = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "usuario",
  password: process.env.DB_PASS || "usuario",
  database: process.env.DB_DATABASE || "restaurante",
};
module.exports = options;