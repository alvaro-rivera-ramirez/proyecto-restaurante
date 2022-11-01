const options = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "alvaro2001",
  database: process.env.DB_DATABASE || "restaurante",
};

module.exports = options;