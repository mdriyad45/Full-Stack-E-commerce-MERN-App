const productModel = require("../../models/productModel")

const getProduct = async (req, res) =>{
    try {
        const allProduct = await productModel.find().sort({createdAt: -1});

        res.status(201).json({
            data: allProduct,
            message: "All Product",
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = getProduct