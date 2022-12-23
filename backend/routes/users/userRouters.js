
const express = require("express");
const { register,login } = require("../../controller/user/userController");
const {registerValidations,loginValidation} = require("../../validations/userValidation");
const userRouter = express();

userRouter.post("/register",registerValidations, register)
userRouter.post("/login",loginValidation, login)

module.exports = userRouter 