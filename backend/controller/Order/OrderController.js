const { validationResult } = require("express-validator");
const OrderModel = require("../../models/Order");
const ReviewsModel = require("../../models/Reviwes");
const productModel = require("../../models/Product");
class OrderController {
  async getOrders(req, res) {
    const query = req.query;
    const parPage = 10;
    const skip = (query.page - 1) * parPage;
    const optional = query.userId ? { userId: query.userId } : {};
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
        .sort({ createdAt: -1 });
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
      return res.status(200).json({ details });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "internal server error", error: error });
    }
  }

  async deliverOrder(req, res) {
    const { id, status } = req.query;
    let option = {};
    if (status === "delivered") {
      option = { status: true };
    } else if (status === "received") {
      option = { received: true };
    }
    try {
      const updateProduct = await OrderModel.findByIdAndUpdate(id, option, {
        new: true,
      });
      return res
        .status(200)
        .send({
          msg:
            status === "delivered"
              ? "Order has delivered"
              : status === "received" && "Order received",
        });
    } catch (error) {
      return res.status(500).send({ errors: error.message });
    }
  }

  async creatingRating(req, res) {
    const errors = validationResult(req);
    const { rating, message, user, product, id } = req.body;
  
    if (errors.isEmpty()) {
      try {
        const createReview = await ReviewsModel.create({
          rating: parseInt(rating),
          comment: message,
          userId:user,
          productId:product,
        });
        await OrderModel.findByIdAndUpdate(
           id ,
           { review: true } ,
        );
        await productModel.findOneAndUpdate(
          { _id: product },
          { $push: { reviewsId: createReview._id } }
        );
        return res.status(200).send({ msg: "Review has created successfully" });
      } catch (errors) {
        return res.status(500).send({ errors: errors.message });
      }
    } else {
      return res.status(500).send({ errors: errors.array() });
    }
  }
}

module.exports = new OrderController();
