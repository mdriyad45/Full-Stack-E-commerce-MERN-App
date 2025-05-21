import { AddToCart } from "../models/addToCartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      throw new Error("Product id not found");
    }
    const userId = req.userId;

    if (!userId) {
      throw new Error("Please login!");
    }

    const existingProduct = await AddToCart.findOne({ productId });

    if (existingProduct) {
      throw new Error("product allready exist in addToCart");
    }

    const product = await AddToCart.create({
      productId,
      quantity: 1,
      userId,
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

export const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new Error("Authentication required");
    }

    const count = await AddToCart.countDocuments({
      userId,
    }).populate("productId");

    res.status(201).json({
      data: count,
      message: "count fetch successfull",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error?.message || error,
      sucess: false,
      error: true,
    });
  }
};

export const addToCartViewProduct = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new Error("Please Login!");
    }

    const viewProduct = await AddToCart.find({ userId });

    if (!viewProduct) {
      throw new Error("Not found addToCart product");
    }
    const cartWithProducts = await AddToCart.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
        },
      },
    ]);

    res.status(200).json({
      message: "Get addToCart product Successfully",
      data: cartWithProducts,
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

export const updateCartProduct = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized - Please login",
        success: false,
        error: true,
      });
    }
    const { productId, quantity } = req.body;
    console.log(productId);

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
        error: true,
      });
    }

    console.log(quantity);
    if (typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({
        message: "Invalid quantity value",
        success: false,
        error: true,
      });
    }

    const updatedCartItem = await AddToCart.findOneAndUpdate(
      { _id: productId, userId }, // Ensure the item belongs to the user
      { quantity },
      { new: true } // Return the updated document
    );
    console.log(updateCartProduct);

    if (!updatedCartItem) {
      return res.status(404).json({
        message: "Cart item not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Successfully updated product quantity",
      data: updatedCartItem,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error?.message || error,
      success: false,
      error: true,
    });
  }
};

export const deleteAddToCartProduct = async (req, res) => {
  try {
    const productId = req.body;
    if (!productId) {
      throw new Error("productId not found!");
    }

    const deleteProduct = await AddToCart.findOneAndDelete({ _id: productId });

    if (!deleteProduct) {
      throw new Error("product not found");
    }
    console.log(deleteProduct);
    res.status(200).json({
      message: "Cart product delete successfully!",
      data: deleteProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: error?.message || error,
      success: false,
      error: true,
    });
  }
};
