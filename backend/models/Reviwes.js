const { Schema, model, Types} = require("mongoose")
const reviewSchema = Schema({
    rating:{
        type:Number,
        default:1
    },
    comment:{
        type:String,
    },
    status:{
        type:Number,
        default:0
    },
    productId:{
        type:Types.ObjectId, ref:"product"
    },userId:{
        type:Types.ObjectId, ref:"user"
    }
},{
    timestamps:true
})

module.exports = model("review", reviewSchema)