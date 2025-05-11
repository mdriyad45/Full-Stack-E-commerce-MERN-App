import { AddToCart } from "../models/addToCartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      throw new Error("Product id not found");
    }
    const userId = req.userId;
    if (!userId) {
      throw new Error("User not exist");
    }

    const existingProduct = await AddToCart.findById(productId);

    if (!existingProduct) {
      throw new Error("product allready exist in addToCart");
    }

    const product = await AddToCart.create({
      productId,
      quantity: 1,
      user: userId,
    });

    const saveProduct = await product.save();

    res.status(200).json({
      data: saveProduct,
      message: "product added",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error?.message || error,
      success: false,
      error: true,
    });
  }
};
