import { useEffect, useState, useRef, useContext } from "react";
import fetchCategoryWiseProduct from "../../Helper/fetchCategoryWiseProduct";
import displayCurrency from "../../Helper/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../../Helper/addToCart";
import Context from "../../Context";

const HorizontalCardProduct = ({ category, heading }) => {
  const {fetchAddToCartCount} = useContext(Context);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const loadingList = new Array(14).fill(null);

  const fetchData = async () => {
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      if (categoryProduct?.data) {
        setData(categoryProduct.data);
      }
    } catch (err) {
      setError("Failed to load products");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };


  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  const handleAddToCart = async (e, id)=>{
    await addToCart(e, id);
     fetchAddToCartCount();
  }

  useEffect(() => {
    fetchData();
  }, [category]);

  if (error) {
    return (
      <div className="container mx-auto px-4 my-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 px-2">{heading}</h2>

      <div className="relative group">
        {/* Scroll buttons - hidden on mobile */}
        <button
          onClick={() => scroll(-400)}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:scale-110 -translate-x-1/2 active:scale-95"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => scroll(400)}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:scale-110 translate-x-1/2 active:scale-95"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 hide-scrollbar px-2 touch-pan-x"
        >
          {(loading ? loadingList : data).map((product, index) => (
            <Link to={'product/'+product?._id}
            data-aos="zoom-in-up"
              key={product?._id || index}
              className="flex-shrink-0 w-[280px] md:w-[320px] bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 group relative"
            >
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-xl" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="h-48 p-4 bg-gray-100 rounded-t-xl relative overflow-hidden">
                    <img
                      src={product.productImage[0]}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      alt={product.productName}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
                      {product.productName}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize mb-2">
                      {product.category}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-red-600">
                        {displayCurrency(product.sellingPrice)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {displayCurrency(product.price)}
                      </span>
                    </div>

                    <button onClick={(e)=>{handleAddToCart(e,product?._id)}} className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 active:scale-95">
                      Add to Cart
                    </button>
                  </div>
                </>
              )}
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HorizontalCardProduct;