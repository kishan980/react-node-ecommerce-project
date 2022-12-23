const express = require("express");
const app = express();
const cors = require("cors")
const env = require("./config/doteEnvConfig");
const connect = require("./config/db");

app.use(cors())
const userRouter = require("./routes/users/userRouters");
const routerCategory = require("./routes/category/CategoryRoutes");
const routeProduct = require("./routes/product/ProductRoute")
app.get("/", (req, res) =>{
    res.send("hello")
})
connect()
app.use(express.json())
app.use('/api/user', userRouter)
app.use("/api/category", routerCategory)
app.use("/api/product", routeProduct)
const port = env.port || 7000
app.listen(port, ()=>{
    console.log(`server is running ${port} `)
})