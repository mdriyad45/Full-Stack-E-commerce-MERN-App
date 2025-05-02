import productModel from "../../models/productModel.js";

export const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    if(!category){
        throw new Error("Category not found");
        
    }
    const product = await productModel.find({ category });

    if(!product){
        throw new Error('Invalid category')
    }

    res.status(200).json({
      message: "Products:",
      data: product,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
