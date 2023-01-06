const PaymentController = require("../controller/PaymentController");
const authorization =require("../service/Authorization")
const express = require("express")
const router = express.Router();

router.post("/create-checkout-session", authorization.authorization,  PaymentController.paymentProcess);

router.post('/webhook',authorization.authorization,  express.raw({type: 'application/json'}), PaymentController.checkOutSession);

router.get("/verify-payment/:id",authorization.authorization,  PaymentController.paymentVerify)
module.exports = router;
