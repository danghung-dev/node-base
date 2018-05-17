require("dotenv").config()
module.exports = {
    env: envVars.NODE_ENV,
    port: process.env.PORT || 8080,
    bodyLimit: process.env.bodyLimit || "100kb",
    jwt_secret: process.env.JWT_KEY || "",
    username: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    database: process.env.DB_DATABASE || "",
    host: process.env.DB_HOST || "",
    dialect: "mysql"
}
