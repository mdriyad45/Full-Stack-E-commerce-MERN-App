import productModel from '../../models/productModel.js';

export const filterProducts = async(req, res)=>{
    try {
        const categoryList = req?.body?.category ;
        console.log(categoryList);
        
        const product = await productModel.find({
            category: {
                "$in": categoryList
            }
        })
        console.log(product)

        res.status(200).json({
            message: "product filter successfully",
            data: product,
            success: true,
            error: false
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}