const uploadProductPermission = require("../../helpers/permission");
const productModel = require ("../../models/productModel");

const updateProduct = async (req, res)=>{
    try {
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied");
        }

        const {_id, ...resBody} = req.body;
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.status(201).json({
            message: "Product update successfully",
            data: updateProduct,
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

module.exports = updateProduct;