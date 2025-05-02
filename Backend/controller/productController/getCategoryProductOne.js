import productModel from "../../models/productModel.js";

export const getCategoryProductOne = async (req, res) => {
  try {
    const productCatagory = await productModel.distinct("category");

    console.log("category: ", productCatagory);

    //array to store one product from each category
    const productByCategory = [];
    for (const category of productCatagory) {
      const product = await productModel.findOne({ category });
      console.log(product);

      if (product) {
        productByCategory.push(product);
      }
    }
    res.status(200).json({
      message: "product category",
      data: productByCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
