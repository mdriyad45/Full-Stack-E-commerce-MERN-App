import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import SummaryApi from "./common";
import Context from "./Context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./Store/userSlice";


function App() {
  const dispatch = useDispatch();

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

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user detail fetch
        }}
      >
        <Header></Header>
        <main className="min-h-[calc(100vh-88px)] p-16">
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
        <ToastContainer />
      </Context.Provider>
    </>
  );
}

export default App;
