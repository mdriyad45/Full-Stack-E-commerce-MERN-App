import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "../AdminEditProduct/AdminEditProduct";
import displayCurrency from "../../Helper/displayCurrency";

const AdminProductCard = ({ data, fetchProduct }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            width={120}
            height={120}
            className="ml-auto object-fill h-full"
          ></img>
        </div>
        <h1 className=" text-ellipsis line-clamp-2">{data?.productName}</h1>

        <div>
          <p>{displayCurrency(data.sellingPrice)}</p>
          <div
            className="w-fit ml-auto p-2 cursor-pointer bg-green-100 hover:bg-green-600 hover:text-white rounded-full"
            onClick={() => {
              setEditProduct(true);
            }}
          >
            <MdModeEditOutline></MdModeEditOutline>
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          fetchProduct={fetchProduct}
          productData={data}
          onClose={() => {
            setEditProduct(false);
          }}
        ></AdminEditProduct>
      )}
    </div>
  );
};

export default AdminProductCard;
