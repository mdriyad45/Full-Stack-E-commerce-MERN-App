import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

import image1 from "../../assests/banner/img1.webp";
import image2 from "../../assests/banner/img2.webp";
import image3 from "../../assests/banner/img3.jpg";
import image4 from "../../assests/banner/img4.jpg";
import image5 from "../../assests/banner/img5.webp";

import image1Mobile from "../../assests/banner/img1_mobile.jpg";
import image2Mobile from "../../assests/banner/img2_mobile.webp";
import image3Mobile from "../../assests/banner/img3_mobile.jpg";
import image4Mobile from "../../assests/banner/img4_mobile.jpg";
import image5Mobile from "../../assests/banner/img5_mobile.png";
import { useEffect, useState } from "react";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = ()=>{
    if(desktopImages.length>currentImage){
        setCurrentImage(preve => {
            if(preve === desktopImages.length - 1){
                return 0
            }
            return preve + 1;
        });
    }
  }
  const previousImage = ()=>{
    setCurrentImage(prev => {
        if (desktopImages.length === 0) return 0;
        return prev === 0 ? desktopImages.length - 1 : prev - 1;
      });
  }
  useEffect(()=>{
    const interval = setInterval(()=>{
        if(desktopImages.length>currentImage){
            nextImage()
        }
        
    },8000)
    return ()=> clearInterval(interval)
  },[])
  return (
    <div className="container mx-auto px-4 rounded ">
        <div className="h-60 md:h-72 bg-slate-200 w-full relative">
        <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={previousImage}  className='bg-white shadow-md rounded-full p-1 hover:bg-slate-200'><FaAngleLeft/></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1 hover:bg-slate-200 transition-all'><FaAngleRight/></button> 
                    </div>
                </div>
            <div className="hidden md:flex h-full w-full overflow-hidden">
            {
                desktopImages.map((imageUrl, index)=>{
                    return(
                        <div className="w-full h-full min-w-full min-h-full" key={index} style={{transform: `translatex(-${currentImage * 100}%)`}}>
                            <img src={imageUrl} className="w-full h-full"/>
                        </div>
                    )
                })
            }
            </div>
            <div className="flex h-full w-full overflow-hidden md:hidden">
            {
                mobileImages.map((imageUrl, index)=>{
                    return(
                        <div className="w-full h-full min-w-full min-h-full" key={index} style={{transform: `translatex(-${currentImage * 100}%)`}}>
                            <img src={imageUrl} className="w-full h-full object-cover"/>
                        </div>
                    )
                })
            }
            </div>
        </div>
    </div>
  )
};

export default BannerProduct;
