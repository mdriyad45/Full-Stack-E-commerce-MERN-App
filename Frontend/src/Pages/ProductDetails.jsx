import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayCurrency from "../Helper/displayCurrency";
import CategoryWishProductDisplay from "../Components/CategoryWishProductDisplay/CategoryWishProductDisplay";
import addToCart from "../Helper/addToCart";
import Context from "../Context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchAddToCartCount } = useContext(Context);
  const navigate = useNavigate();

  const productImageListLoading = new Array(4).fill(null);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        SummaryApi.productDetails.url + "/" + params.id
      );
      const responseData = await response.json();
      setData(responseData.data);
    } catch (error) {
      console.log("fetch failed product details");
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleZoomImage = useCallback((e) => {
    if (!e.target) return;

    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width).toFixed(2);
    const y = ((e.clientY - top) / height).toFixed(2);

    setZoomImageCoordinate({ x, y });
    setZoomImage(true);
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  useEffect(() => {
    if (data?.productImage?.length > 0) {
      setActiveImage(data.productImage[0]);
    }
  }, [data]);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product Image and Thumbnails */}
        <div className="flex flex-col lg:flex-row-reverse gap-4">
          {/* Active Image with Zoom */}
          <div className="relative w-full max-w-md h-80 sm:h-96 bg-gray-100 border rounded">
            <img
              src={activeImage}
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
              className="h-full w-full object-scale-down p-3 mix-blend-multiply"
              alt="Product"
            />
            {zoomImage && (
              <div className="hidden lg:block absolute top-0 left-full ml-4 w-[600px] h-[400px] overflow-hidden border shadow-lg rounded">
                <div
                  className="w-full h-full bg-no-repeat bg-cover transition-all duration-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundSize: "200%",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                />
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto scrollbar-hide">
            {loading
              ? productImageListLoading.map((_, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 bg-gray-300 animate-pulse rounded hide-scrollbar"
                  />
                ))
              : data.productImage?.map((img, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 p-1 bg-white border rounded cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(img)}
                    onClick={() => handleMouseEnter(img)}
                  >
                    <img
                      src={img}
                      alt={`Thumb-${index}`}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-4">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-1/3" />
              <div className="h-8 bg-gray-300 rounded w-1/2" />
              <div className="h-6 bg-gray-300 rounded w-1/4" />
              <div className="h-6 bg-gray-300 rounded w-1/3" />
              <div className="h-8 bg-gray-300 rounded w-1/2" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 uppercase">
                {data?.brandName}
              </p>
              <h2 className="text-2xl font-semibold">{data?.productName}</h2>
              <p className="text-gray-500 capitalize">{data?.category}</p>

              <div className="flex items-center gap-1 text-yellow-500 text-lg">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className="flex items-center gap-3 text-xl font-semibold">
                <span className="text-red-600">
                  {displayCurrency(data.sellingPrice)}
                </span>
                <span className="line-through text-gray-500 text-base">
                  {displayCurrency(data.price)}
                </span>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  onClick={(e) => handleBuyProduct(e, data?._id)}
                >
                  Buy Now
                </button>
                <button
                  className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-100 transition"
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Add to Cart
                </button>
              </div>

              <div>
                <p className="font-medium text-gray-700 mt-4">Description:</p>
                <p className="text-gray-600">{data?.description}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recommended Products */}
      {data.category && !loading && (
        <div className="mt-12">
          <CategoryWishProductDisplay
            category={data.category}
            heading="Recommended Products"
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
