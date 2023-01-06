const {Router} = require("express");
const OrderController = require("../../controller/Order/OrderController");
const Authorization = require("../../service/Authorization")
const router = Router();

router.get("/orders", Authorization.authorization, OrderController.getOrders)
router.get("/orders-details/:id", Authorization.authorization, OrderController.getOrdersDetails)
router.put("/orders-deliver/:id", Authorization.authorization, OrderController.deliverOrder)

module.exports = router