const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {jwt_secret_key} = require("../config/doteEnvConfig");
module.exports.hashPassword = async (password)=>{
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt)
        return hashed
}

module.exports.comparePassword = async(password,dbPassword)=>{
    return await bcrypt.compare(password,dbPassword)
}

module.exports.createToken = (user) =>{
    return  jwt.sign(user,jwt_secret_key,{expiresIn:"7d"})
}
