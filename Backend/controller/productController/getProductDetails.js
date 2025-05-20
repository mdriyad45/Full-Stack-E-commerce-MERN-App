import productModel from "../../models/productModel.js";

export const getProductDetails = async (req, res) => {
  try {
    const  productId  = req.params._id;
    
    if (!productId) {
      throw new Error("Product Id not found");
    }
    const product = await productModel.findById(productId);

    if (!product) {
      throw new Error("Invalid product Id");
    }

    
    res.status(200).json({
      message: "get product details sucessfully",
      data: product,
      succss: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
      succss: true,
      error: false,
    });
  }
};
