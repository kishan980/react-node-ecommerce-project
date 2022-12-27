const { validationResult } = require("express-validator")
const UserModel = require("../../models/User")
const {createToken,comparePassword,hashPassword} =require("../../service/authService");

module.exports.register = async(req,res) =>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const {email,password,name}= req.body;
        try{
            const emailExist = await UserModel.findOne({email})
            if(!emailExist){
                const hashed = await hashPassword(password);
                const user = await UserModel.create({
                    name,
                    email,
                    password:hashed,
                    // admin:true
                })
            // const token = jwt.sign({id:user._id, name:user.name },jwt_secret_key,{expiresIn:"7d"})
            const token = createToken({id:user._id, name:user.name})
            return res.status(201).send({msg:"Your account hash been created",data:user, token:token}) 
                
            }else {
                return res.status(401).send({errors:[{msg:`${email} is already taken`, param:'email'}]})              
            }
        }catch(error){
            console.log(error)
            return res.status(500).send("Internal server error")
        }

    } else {
       return res.status(400).json({errors: errors.array()})
    }
}

module.exports.login =async(req,res)=>{
    const   {email, password}= req.body;
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try{
            const user = await UserModel.findOne({email})
            if(user){
                    if(await comparePassword(password,user.password)){
                     const token = createToken({
                        id:user._id,
                        name:user.name
                     })
                      if(user.admin){

                         return res.status(200).send({data:token, admin:true})
                     }else{
                        return res.status(200).send({data:token, admin:false})

                     }
                    }else {
                        return res.status(401).send({errors: [{msg: 'password is not match', param:'password'}]})
                    }
            }else {
                return res.status(401).send({errors: [{msg:`${email} is not found`, param:'email'}]})
            }
        }catch(error){
            return res.status(500).send(`internal server error =>${error}`)
        }
    }else {
        return res.status(401).send({errors: errors.array()})
    }
}