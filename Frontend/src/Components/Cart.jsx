import { useContext } from "react";
import addToCart from "../Helper/addToCart";
import Context from "../Context";
import { Link } from "react-router-dom";
import displayCurrency from "../Helper/displayCurrency";

const Cart = ({ loading, data = [] }) => {
  const { fetchAddToCartCount } = useContext(Context);
  const loadingList = new Array(6).fill(null);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
  };

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <h1 className="text-lg sm:text-xl font-semibold p-4">
        Product Items: {data.length}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {(loading ? loadingList : data).map((product, index) => (
          <div
            key={product?._id || index}
            data-aos="zoom-in"
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {loading ? (
              <div className="animate-pulse">
                <div className="h-48 sm:h-56 md:h-60 bg-gray-200 rounded-t-xl" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-10 bg-gray-200 rounded-lg" />
                </div>
              </div>
            ) : (
              <Link to={`/product/${product?._id}`}>
                <div className="block" onClick={() => window.scrollTo(0, 0)}>
                  <div className="h-48 sm:h-56 md:h-60 p-4 bg-gray-100 rounded-t-xl relative overflow-hidden">
                    <img
                      src={product.productImage[0]}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                      alt={product.productName}
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {Math.round(
                        ((product.price - product.sellingPrice) / product.price) * 100
                      )}
                      % OFF
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
                      {product.productName}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 capitalize mb-2 truncate">
                      {product.category}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-base md:text-lg font-bold text-red-600">
                        {displayCurrency(product.sellingPrice)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {displayCurrency(product.price)}
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(e, product?._id)}
                      className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default Cart;
