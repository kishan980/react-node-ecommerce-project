require("dotenv").config()

module.exports ={
    port:process.env.PORT,
    db:process.env.MONGO_DB_URL,
    jwt_secret_key:process.env.JWT_SECRET_KEY,
    jwt_expire_in:process.env.JWT_EXPIRE_IN,
}