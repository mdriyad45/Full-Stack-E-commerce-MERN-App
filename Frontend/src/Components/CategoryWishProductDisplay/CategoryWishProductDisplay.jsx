import { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../../Helper/fetchCategoryWiseProduct";
import displayCurrency from "../../Helper/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../../Helper/addToCart";
import Context from "../../Context";
import scrollTop from "../../Helper/scrollTop";

const CategoryWishProductDisplay = ({ category, heading }) => {
  const { fetchAddToCartCount } = useContext(Context);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadingList = new Array(6).fill(null); // Multiple of 3 for better grid layout

  const fetchData = async () => {
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      if (categoryProduct?.data) {
        setData(categoryProduct.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">{heading}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {(loading ? loadingList : data).map((product, index) => (
          <div
            key={product?._id || index}
            data-aos="zoom-in"
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {loading ? (
              <div className="animate-pulse">
                <div className="h-60 bg-gray-200 rounded-t-xl" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-10 bg-gray-200 rounded-lg" />
                </div>
              </div>
            ) : (
              <>
                <Link
                  to={`/product/${product?._id}`}
                  className="block"
                  onClick={() => scrollTop}
                >
                  <div className="h-60 p-4 bg-gray-100 rounded-t-xl relative overflow-hidden">
                    <img
                      src={product.productImage[0]}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                      alt={product.productName}
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {Math.round(
                        ((product.price - product.sellingPrice) /
                          product.price) *
                          100
                      )}
                      % OFF
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  <Link to={`product/${product?._id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
                      {product.productName}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize mb-2">
                      {product.category}
                    </p>
                  </Link>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-red-600">
                        {displayCurrency(product.sellingPrice)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {displayCurrency(product.price)}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        handleAddToCart(e, product?._id);
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryWishProductDisplay;
