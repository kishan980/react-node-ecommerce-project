const jwt = require("jsonwebtoken")
const env = require("../config/doteEnvConfig")
class Authorization {
    async authorization(req, res, next) {
            const headerToken = req.headers.authorization;
            if(headerToken){
                try{
                    const token = headerToken.split("Bearer")[1];
                    const verified = jwt.verify(token, env.jwt_secret_key)  
                    if(verified){
                        next()
                    } else{
                    return res.status(401).send({errors:[{msg:`Please add valid token`}]})

                    }

                }catch(error){
                    return res.status(500).send(`internal server error ${error}`)
                }
            }else {
                return res.status(401).send({errors:[{msg:'Please add a  token'}]})
            }
          
          
    }
}

module.exports = new Authorization()