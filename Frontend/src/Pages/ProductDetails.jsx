import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayCurrency from "../Helper/displayCurrency";
import HorizontalCardProduct from "../Components/HorizontalCardProduct/HorizontalCardProduct";

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
    y: 0
  })
  const [zoomImage, setZoomImage] = useState(false);

  const productImageListLoading = new Array(4).fill(null);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        SummaryApi.productDetails.url.concat("/" + params.id)
      );
      const responseData = await response.json();
      setData(responseData.data);
      setActiveImage(data?.productImage[0]);
      console.log(responseData.data);
    } catch (error) {
      console.log("fetch failed product details");
    } finally {
      setLoading(false);
    }
  };
  const handleMouseEnter = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleZoomImage = useCallback((e)=>{
    setZoomImage(true);
    const {left, top, width, height} = e.target.getBoundingClientRect();
    console.log("coordinate", left, top, width, height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
    
  },[zoomImageCoordinate]);

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false);
  }

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/**product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:w-96 bg-slate-400 relative">
            <img
              src={activeImage}
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
              className="h-full w-full py-3 object-scale-down mix-blend-multiply"
            />
            {/**product zomm */}
            {
              zoomImage && (
                <div className="hidden lg:block absolute overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[400px] top-0">
              <div className="w-full h-full min-h-[400px] min-w-[400px] bg-slate-200 mix-blend-multiply scale-150"
              style={{
                backgroundImage: `url(${activeImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
              }}>
                
              </div>
            </div>
              )
            }
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 md:flex-col overflow-scroll scrollbar-none h-full animate-pulse">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div key={index} className="h-20 w-20 bg-slate-400 rounded">
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imageUrl, index) => {
                  return (
                    <div
                      key={index}
                      className="h-20 w-20 bg-slate-400 rounded p-1"
                    >
                      <img
                        src={imageUrl}
                        onMouseEnter={() => {
                          handleMouseEnter(imageUrl);
                        }}
                        onClick={() => {
                          handleMouseEnter(imageUrl);
                        }}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/**product details */}
        {loading ? (
          
            <div className="w-full grid gap-1 ">
              <p className="w-full bg-slate-200 h-6 lg:h-8 rounded-full inline-block animation-pulse"></p>
              <h2 className="w-full text-2xl lg:text-4xl lg:h-8 rounded-lg font-meduim h-6 bg-slate-300 animate-pulse"></h2>
              <p className=" w-full capitalize text-slate-300 rounded-lg lg:h-8 bg-slate-300 min-w-[100px] animate-pulse h-6" ></p>
              <div className="w-full text-red-600 bg-slate-300 rounded-lg h-6 lg:h-8 animate-pulse flex items-center gap-1">
                
              </div>
              <div className="flex items-center gap-2 w-full bg-slate-300 rounded-lg lg:h-8 text-2xl lg:text-3xl font-medium my-1 h-6 animate-pulse">
                <p className="w-full text-red-600 bg-slate-300"></p>
                <p className="w-fulltext-slate-400 line-through bg-slate-300"></p>
              </div>

              <div className="flex items-center gap-3 my-2 w-full">
                <button className="h-6 lg:h-8 w-full bg-slate-300 rounded-lg  animate-pulse"></button>
                <button className="h-6 lg:h-8 w-full bg-slate-300 rounded-lg  animate-pulse"></button>
              </div>
              <div className="w-full">
                <p className="text-slate-600 font-medium w-full my-1 h-6 lg:h-8 bg-slate-300 rounded-lg  animate-pulse"></p>
                <p className="bg-slate-300 rounded-lg  animate-pulse h-10 lg:h-12 w-full"></p>
              </div>
            </div>
          
        ) : (
          <div>
            <p>{data?.brandName}</p>
            <h2>{data?.productName}</h2>
            <p>{data?.category}</p>
            <div>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div>
              <p>{displayCurrency(data.sellingPrice)}</p>
              <p>{displayCurrency(data.price)}</p>
            </div>

            <div>
              <button>Buy</button>
              <button>Add to cart</button>
            </div>
            <div>
              <p>Description:</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {
        data.category && (
          <HorizontalCardProduct category={data.category} heading={`Recommended Product`}></HorizontalCardProduct>
        )
      }
    </div>
  );
};

export default ProductDetails;
