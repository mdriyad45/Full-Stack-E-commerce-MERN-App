import productModel from "../../models/productModel.js";


export const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    console.log(query);

    const regex = new RegExp(query, "gi");

    const searchProduct = await productModel.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
        {
          brandName: regex,
        },
      ],
    });
    console.log(searchProduct)

    res.status(200).json({
      message: "Search product list",
      data: searchProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: error.message || error,
      succss: false,
      error: true,
    });
  }
};
