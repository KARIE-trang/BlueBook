const mysql = require("mysql2/promise");
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.DB_hostname,
  port: process.env.DB_port,
  user: process.env.DB_user,
  password: process.env.DB_password,
  database: process.env.DB_database,
  charset: "utf8mb4",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
});
module.exports = connection;
