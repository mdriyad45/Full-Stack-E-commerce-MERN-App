import { MdDeleteOutline } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import SummaryApi from "../../common";

const Cart = () => {
  const context = useContext(Context);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.addToCartViewProduct.url, {
        method: SummaryApi.addToCartViewProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseData = await response.json();
      console.log(responseData.data);

      if (responseData.success) {
        setData(responseData.data);
        console.log("Data: ",data);
      }
    } catch (error) {
      console.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {data.length === 0 && !loading && (
        <div className="w-full text-center py-8">
          <p className="text-gray-600 text-lg">No products in cart!</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product List */}
        <div className="lg:w-3/4 space-y-4">
          {loading
            ? loadingCart.map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))
            : data.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0">
                      <img
                        src={product.product?.productImage[0] || "default-image.jpg"}
                        alt={product.product?.brandName}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="w-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h2 className="text-lg font-semibold text-gray-800 truncate">
                          {product.product?.productName}
                        </h2>
                        <MdDeleteOutline className="text-red-600 text-2xl cursor-pointer hover:text-red-700" />
                      </div>

                      <p className="text-gray-500 text-sm">{product.product?.category}</p>

                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <p className="text-lg font-semibold text-gray-800">
                            ₹{product.product?.sellingPrice}
                          </p>
                          {product.product?.price && (
                            <span className="text-gray-400 line-through">
                              ₹{product.product?.price}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <button className="w-8 h-8 flex items-center justify-center border-2 border-red-600 rounded-full hover:bg-red-50 transition-colors">
                            <FiMinus className="text-red-600" />
                          </button>
                          <span className="text-lg font-medium w-8 text-center">
                            {product?.quantity}
                          </span>
                          <button className="w-8 h-8 flex items-center justify-center border-2 border-red-600 rounded-full hover:bg-red-50 transition-colors">
                            <FiPlus className="text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Order Summary */}
        {data.length > 0 && (
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({data.length} items)</span>
                  <span className="font-medium">
                    ₹{data.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>
                    ₹{data.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0)}
                  </span>
                </div>
              </div>

              <button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors">
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;