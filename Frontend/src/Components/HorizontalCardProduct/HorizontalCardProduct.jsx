import { useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../../Helper/fetchCategoryWiseProduct";
import displayCurrency from "../../Helper/displayCurrency";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    console.log(categoryProduct)
    setLoading(false);
    setdata(categoryProduct.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      {data.map((product, index) => {
        return (
          <div
            key={index}
            className="w-full min-w-[320px] md:min-w-[350px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex "
          >
            <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]">
              <img src={product.productImage[1]} className=" object-scale-down h-full hover:scale-110 transition-all"/>
            </div>
            <div className="p-4 grid">
                <h2 className=" font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                <p className="capitalize text-slate-500">{product?.category}</p>
                <div className="flex gap-3 ">
                    <p className="text-red-600 font-medium">{displayCurrency(product?.sellingPrice)}</p>
                    <p className="text-slate-500 line-through">{displayCurrency(product?.price)}</p>
                </div>
                <button className="text-sm mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full">Add to Cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalCardProduct;
