const {body} = require("express-validator")
module.exports.productValidation =[
    body('description').not().isEmpty().trim().escape().withMessage("description is required!"),
    body('title').not().isEmpty().trim().escape().withMessage("title is required!"),
    body('price').custom((value)=>{
        if(parseInt(value)<1){
            throw new Error("price should be above at list $1")
        }else {
            return value
        }
    }).trim().escape(),
    body('category').not().isEmpty().trim().escape().withMessage("category is required!"),
    body('stock').custom((value) =>{
        if(parseInt(value)<20){
            throw new Error("please enter stock value above 20")
        }else {
            return value
        }
    }).trim().escape(),
    body('discount').custom((value) =>{
        if(parseInt(value)<0){
                throw new Error("must be enter discount value positive")
        }else{
            return value
        }
    }).trim().escape(),

]