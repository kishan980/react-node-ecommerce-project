const express = require("express")
const routeProduct = new express.Router()
const product = require("../../controller/product/product")
const authorization =require("../../service/Authorization")
const {productValidation} =require("../../validations/productValidation")
routeProduct.post("/create-product", [authorization.authorization,],product.create)
routeProduct.get("/products/:page", [authorization.authorization,],product.get)
routeProduct.get("/pro/:id", [authorization.authorization,],product.getProduct)
routeProduct.put("/update-product", [authorization.authorization,productValidation],product.updateProduct)
routeProduct.delete("/delete-product/:id", [authorization.authorization,],product.deleteProduct)

module.exports = routeProduct