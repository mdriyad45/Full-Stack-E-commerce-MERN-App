import { CgClose } from "react-icons/cg";

const DisplayImage = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white rounded shadow-sm max-w-5xl mx-auto ">
      <div
            onClick={onClose}
            className="w-fit ml-auto cursor-pointer p-4 text-xl hover:text-red-700"
          >
            <CgClose></CgClose>
          </div>
        <div className=" max-w-[80vh] max-h-[80vh]">
        
          <img
            src={imageUrl}
            alt=""
            width={100}
            height={100}
            className="w-full h-full"
          />
          
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
