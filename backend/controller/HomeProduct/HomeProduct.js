const { where } = require("../../models/Product");
const ProductModel = require("../../models/Product");
class HomeProducts {
  async catProducts(req, res) {
    const { name, page } = req.params;
    const parPage = 5;
    const skip = (page - 1) * parPage;
    try {
      const count = await ProductModel.find({ category: name })
        .where("stock")
        .gt(0)
        .countDocuments();
      const response = await ProductModel.find({ category: name })
        .where("stock")
        .gt(0)
        .skip(skip)
        .limit(parPage)
        .sort({ updatedAt: -1 });
      return res.status(200).send({ products: response, parPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new HomeProducts();
