import { useEffect, useState } from "react";
import UploadProducts from "../../Components/UploadProducts/UploadProducts";
import SummaryApi from "../../common";
import AdminProductCard from "../../Components/AdminProductCard/AdminProductCard";

const AllProducs = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.getProduct.url);
    const responseData = await response.json();

    setAllProduct(responseData?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  console.log(allProduct);
  return (
    <div>
      <div className="bg-white px-8 py-2 flex justify-between items-center">
        <h2 className="font-bold text-xl">All Products: {allProduct.length}</h2>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className="border-2 rounded-full px-3 py-1 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all"
        >
          Upload Products
        </button>
      </div>

      {/**All product */}

      <div className="flex items-center flex-wrap gap-5 px-4 py-4 h-[calc(100vh-190px)] bg--500 overflow-y-scroll">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              fetchProduct={fetchAllProduct}
              data={product}
              key={index + "all product"}
            ></AdminProductCard>
          );
        })}
      </div>

      {/*upload product component*/}
      {openUploadProduct && (
        <UploadProducts
          fetchProduct={fetchAllProduct}
          onClose={() => setOpenUploadProduct(false)}
        ></UploadProducts>
      )}
    </div>
  );
};

export default AllProducs;
