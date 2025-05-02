import BannerProduct from "../../Components/BannerProduct/BannerProduct";
import HorizontalCardProduct from "../../Components/HorizontalCardProduct/HorizontalCardProduct";

import ProductList from "../../Components/ProductList";


const Home = () => {
    return (
        <div>
            <ProductList></ProductList> 
            <BannerProduct></BannerProduct>
            <HorizontalCardProduct category={"mobiles"} heading={'product'}></HorizontalCardProduct>
        </div>
    );
};

export default Home;