import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useEffect, useState } from "react";

const image1 = new URL("../../assets/banner/img1.webp", import.meta.url).href;
const image2 = new URL("../../assets/banner/img2.webp", import.meta.url).href;
const image3 = new URL("../../assets/banner/img3.jpg", import.meta.url).href;
const image4 = new URL("../../assets/banner/img4.jpg", import.meta.url).href;
const image5 = new URL("../../assets/banner/img5.webp", import.meta.url).href;

const image1Mobile = new URL("../../assets/banner/img1_mobile.jpg", import.meta.url).href;
const image2Mobile = new URL("../../assets/banner/img2_mobile.webp", import.meta.url).href;
const image3Mobile = new URL("../../assets/banner/img3_mobile.jpg", import.meta.url).href;
const image4Mobile = new URL("../../assets/banner/img4_mobile.jpg", import.meta.url).href;
const image5Mobile = new URL("../../assets/banner/img5_mobile.png", import.meta.url).href;

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];

  const nextImage = () => {
    setCurrentImage((prev) => (prev === desktopImages.length - 1 ? 0 : prev + 1));
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev === 0 ? desktopImages.length - 1 : prev - 1));
  };

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextImage, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, currentImage]);

  // Handle swipe on mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);
    const deltaX = touchStartX - e.changedTouches[0].clientX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        nextImage(); // Swipe left
      } else {
        previousImage(); // Swipe right
      }
    }
  };

  return (
    <div
      className="container mx-auto px-4 rounded-xl overflow-hidden shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative aspect-video md:aspect-[3/1] bg-gray-100 group"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Arrows */}
        <button
          onClick={previousImage}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/80 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
        >
          <FaAngleLeft className="text-2xl text-gray-800" />
        </button>

        <button
          onClick={nextImage}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/80 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
        >
          <FaAngleRight className="text-2xl text-gray-800" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {desktopImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentImage === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Desktop Images */}
        <div className="hidden md:block relative h-full w-full overflow-hidden">
          {desktopImages.map((imageUrl, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                currentImage === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={imageUrl}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          ))}
        </div>

        {/* Mobile Images with Swipe */}
        <div className="md:hidden relative h-full w-full overflow-hidden">
          {mobileImages.map((imageUrl, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                currentImage === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={imageUrl}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
    </div>
  );
};

export default BannerProduct;
