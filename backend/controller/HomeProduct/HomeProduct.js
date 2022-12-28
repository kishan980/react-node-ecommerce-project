const ProductModel = require("../../models/Product")
class HomeProducts {
    async catProducts(req, res) {
        const { name, page } = req.params;
        const perPage = 12;
        const skip = (page - 1) * perPage;
        try {
            const count = await ProductModel.find({ category: name }).countDocuments()
            const response = await ProductModel.find({ category: name }).skip(skip).limit(perPage).sort({ updatedAt: -1 })
            console.log(response)
            return res.status(200).send({products:response, perPage,count})
        } catch (error) {
            console.log(error.message)
        }

    }
}

module.exports = new HomeProducts