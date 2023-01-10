const {Router} = require("express");
const OrderController = require("../../controller/Order/OrderController");
const Authorization = require("../../service/Authorization")
const addRating = require("../../validations/reaviewValidation");
const router = Router();

router.get("/orders", Authorization.authorization, OrderController.getOrders)
router.get("/orders-details/:id", Authorization.authorization, OrderController.getOrdersDetails)
router.get("/orders-details/:id", Authorization.authorization, OrderController.getOrdersDetails)
router.post("/add-review",[ Authorization.authorization, addRating], OrderController.creatingRating)
router.put("/orders-deliver", Authorization.authorization, OrderController.deliverOrder)

module.exports = router