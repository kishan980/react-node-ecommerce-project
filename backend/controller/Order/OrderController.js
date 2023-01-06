const OrderModel = require("../../models/Order");
class OrderController {
  async getOrders(req, res) {
    const { page } = req.params;
    const parPage = 1;
    const skip = (page - 1) * parPage;
    try {
      const count = await OrderModel.find({}).countDocuments();
      const response = await OrderModel.find({})
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
}

module.exports = new OrderController();
