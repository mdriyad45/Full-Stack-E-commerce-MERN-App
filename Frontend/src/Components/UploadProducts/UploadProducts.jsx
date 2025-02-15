import { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../../Helper/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../../Helper/uploadImage";
import DisplayImage from "../DisplayImage/DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../../common";
import { toast } from 'react-toastify'

const UploadProducts = ({ onClose, fetchProduct }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const handleOneChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };
  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };

  const handleSubmitUploadProduct = async(e) => {
    e.preventDefault();
    
    const response = await fetch(SummaryApi.uploadProduct.url,{
      method: SummaryApi.uploadProduct.method,
      credentials: 'include',
      headers:{
        'content-type' : 'application/json'
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json();
    console.log(data);
    console.log(responseData);

    if(responseData.success){
      toast.success(responseData?.message);
      onClose();
      fetchProduct()
    }

    if(responseData.error){
      toast.error(responseData?.message)
    }
  };
  return (
    <div className=" fixed w-full h-full left-0 top-5 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload product</h2>
          <div
            onClick={onClose}
            className="w-fit ml-auto cursor-pointer text-xl hover:text-red-700"
          >
            <CgClose></CgClose>
          </div>
        </div>
        <form
          className="grid gap-2 pb-4 overflow-y-scroll h-full"
          onSubmit={handleSubmitUploadProduct}
        >
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            name="productName"
            value={data.productName}
            onChange={handleOneChange}
            className="bg-slate-100 border-2 rounded px-2 py-1"
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name:
          </label>
          <input
            type="text"
            name="brandName"
            id="brandName"
            placeholder="Enter Brand Name"
            value={data.brandName}
            onChange={handleOneChange}
            className="bg-slate-100 border-2 rounded px-2 py-1"
          />

          <label htmlFor="category" className="mt-3">
            Category:
          </label>
          <select
            value={data.category}
            name="category"
            onChange={handleOneChange}
            className="bg-slate-100 px-2 py-1 border rounded"
          >
            <option value="">Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="price" className="mt-3">
            Price:
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter product price"
            name="price"
            value={data.price}
            onChange={handleOneChange}
            className="bg-slate-100 border-2 rounded px-2 py-1"
          />
          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price:
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter product sellingPrice price"
            name="sellingPrice"
            value={data.sellingPrice}
            onChange={handleOneChange}
            className="bg-slate-100 border-2 rounded px-2 py-1"
          />
          <label htmlFor="description" className="mt-3">
            Product Descriptin:
          </label>
          <textarea
            className="w-full h-28 border rounded resize-none p-2 bg-slate-100"
            type="text"
            id="price"
            name="description"
            value={data.description}
            onChange={handleOneChange}
            placeholder="Enter product description"
          ></textarea>
          <label htmlFor="productImage" className="mt-3">
            Product Image:
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 h-32 border rounded w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt></FaCloudUploadAlt>
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  name=""
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex justify-start flex-wrap gap-3">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group" key={index}>
                      <img
                        src={el}
                        alt="el"
                        width={80}
                        height={80}
                        onClick={() => {
                          setFullScreenImage(el);
                          setOpenFullScreenImage(true);
                        }}
                        className="bg-slate-100 border"
                      />
                      <div
                        className=" absolute bottom-0 right-0 bg-red-600 text-white rounded-full p-1 hidden group-hover:block"
                        onClick={() => {
                          handleDeleteProductImage(index);
                        }}
                      >
                        <MdDelete></MdDelete>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *please upload product image
              </p>
            )}
          </div>
          <button className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded transition-all text-white mb-10">
            Upload Product
          </button>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage
          imageUrl={fullScreenImage}
          onClose={() => {
            setOpenFullScreenImage(false);
          }}
        ></DisplayImage>
      )}
    </div>
  );
};

export default UploadProducts;
