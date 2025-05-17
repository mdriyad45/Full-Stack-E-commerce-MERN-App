import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./Context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./Store/userSlice";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchAddToCartCount = async () => {
    const dataResponse = await fetch(SummaryApi.countAddToProduct.url, {
      method: SummaryApi.countAddToProduct.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    console.log(dataApi.data);
    setCartProductCount(dataApi?.data);
  };

  useEffect(() => {
    //fetch data for user details
    fetchUserDetails();
    //fetch data for Count add to cart
    fetchAddToCartCount();
    //for AOS fade animation
    AOS.init({
      duration: 1500, // animation duration
      repeat: true, // whether animation should happen only once
    });
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user detail fetch
          cartProductCount, //count addToCart
          fetchAddToCartCount, // count addToCart function
        }}
      >
        <Header></Header>
        <main className="min-h-[calc(100vh-88px)] p-16">
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
        <ToastContainer 
        position="top-center"/>
      </Context.Provider>
    </>
  );
}

export default App;
