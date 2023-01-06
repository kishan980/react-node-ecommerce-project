const OrderModel = require("../../models/Order");
class OrderController {
  async getOrders(req, res) {
    const query = req.query;
    const parPage = 10;
    const skip = (query.page - 1) * parPage;
    const optional = query.userId ? {userId:query.userId} :{};
    try {
      const count = await OrderModel.find(optional).countDocuments();
      const response = await OrderModel.find(optional)
        .populate("userId", "-password -createdAt -updatedAt -admin")
        .populate(
          "productId",
          "-colors -sizes -createdAt -updatedAt -stock -image2 -image3"
        )
        .skip(skip)
        .limit(parPage)
        .sort({ updatedAt: -1 });
      return res.status(200).json({ orders: response, parPage, count });
    } catch (error) {
      return res.status(500).json({ msg: "internal server error" });
    }
  }
  async getOrdersDetails(req, res) {
    const { id } = req.params;
    try {
      const details = await OrderModel.findOne({ _id: id })
        .populate("productId", "-colors -sizes -createdAt -updatedAt")
        .populate("userId", "-password -createdAt -updatedAt -admin");
      return res.status(200).json( {details});
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "internal server error", error: error });
    }
  }
  
  async deliverOrder(req, res){
    const {id}= req.params;
    try{
      const updateProduct = await OrderModel.findByIdAndUpdate(id, {status:true}, {new:true})
      return res.status(200).send({msg:"Product has been send to customer and it's on the way right now"})
    }catch(error){
      return res.status(500).send({errors:error.message})
    }

  }
}

module.exports = new OrderController();
