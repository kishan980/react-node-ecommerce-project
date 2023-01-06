
const {Schema, model,Types} = require("mongoose");

const orderSchema = Schema({
    productId:{
        type: Types.ObjectId,
        ref: 'Product'
    },
    userId:{
        type: Types.ObjectId,
        ref:'User'
    },
    size:{
        type:String
    },color:{
        type:String
    },
    quantity:{
        type:Number
    },
    address:{
        required:true,
        type:Map
    },
    status:{
        default:false,
        type:Boolean
    },
    received:{
        default:false,
        type:Boolean
    }
},{timestamps:true})

const OrderModel  = model("Order", orderSchema)
module.exports =OrderModel;