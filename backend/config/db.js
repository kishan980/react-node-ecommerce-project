const mongoose = require("mongoose")
const env =require("../config/doteEnvConfig")
const connect = async()=>{
    try{
        await mongoose.connect(env.db)
        console.log("Database connection done")
    }catch(error){
            console.log(error)
            console.log("Database disconnect")
    }
}

module.exports = connect