const express = require("express");
const app = express();
const cors = require("cors")
const env = require("./config/doteEnvConfig");
const connect = require("./config/db");

app.use(cors())
app.post(
    "/api/webhook",
    express.json({
      verify: (req, res, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );
const userRouter = require("./routes/users/userRouters");
const routerCategory = require("./routes/category/CategoryRoutes");
const routeProduct = require("./routes/product/ProductRoute")
const routerPayment= require("./routes/payment")
const orderRoutes = require("./routes/order/OrderRouter")
app.get("/", (req, res) =>{
    res.send("hello")
})
connect()
app.use(express.json())
app.use('/api/user', userRouter)
app.use("/api/category", routerCategory)
app.use("/api/product", routeProduct)
app.use("/api", routerPayment)
app.use("/api/order", orderRoutes)
const port = env.port || 7000
app.listen(port, ()=>{
    console.log(`server is running ${port} `)
})