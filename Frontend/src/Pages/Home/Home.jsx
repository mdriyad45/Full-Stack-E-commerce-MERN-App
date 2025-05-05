import BannerProduct from "../../Components/BannerProduct/BannerProduct";
import HorizontalCardProduct from "../../Components/HorizontalCardProduct/HorizontalCardProduct";

import ProductList from "../../Components/ProductList";


const Home = () => {
    return (
        <div>
            <ProductList></ProductList> 
            <BannerProduct></BannerProduct>
            <HorizontalCardProduct category={"airpods"} heading={`Top's Airpodes`}></HorizontalCardProduct>
            <HorizontalCardProduct category={"watches"} heading={`Popular's Watches`}></HorizontalCardProduct>
            <HorizontalCardProduct category={"mobiles"} heading={`Mobiles`}></HorizontalCardProduct>
            <HorizontalCardProduct category={"Mouse"} heading={`Mouse`}></HorizontalCardProduct>
            <HorizontalCardProduct category={"televisions"} heading={`Televisions`}></HorizontalCardProduct>
            <HorizontalCardProduct category={"camera"} heading={`Camera & Photography`}></HorizontalCardProduct>
            <HorizontalCardProduct category={"speakers"} heading={`Bluetooth Speakers`}></HorizontalCardProduct>
            <HorizontalCardProduct category={"refrigerator"} heading={`Refrigerator`}></HorizontalCardProduct>
            <HorizontalCardProduct category={"trimmers"} heading={`Trimmers`}></HorizontalCardProduct>
        </div>
    );
};

export default Home;