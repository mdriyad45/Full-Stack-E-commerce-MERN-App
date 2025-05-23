import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import AdminPanel from "../Pages/AdminPanel/AdminPanel";
import AllUsers from "../Pages/AllUsers/AllUsers";
import AllProducs from "../Pages/AllProducts/AllProducs";

import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart/Cart";
import SearchProduct from "../Pages/SearchProduct/SearchProduct";
import CategoryProduct from "../Pages/CategoryProduct/CategoryProduct";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword></ForgotPassword>
            },
            {
                path: '/sign-up',
                element: <SignUp></SignUp>
            },
            {
                path: "product-category",
                element: <CategoryProduct></CategoryProduct>
            },
            {
                path: "product/:id",
                element: <ProductDetails></ProductDetails>
            },
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            {
                path: '/search',
                element: <SearchProduct></SearchProduct>
            },
            {
                path: '/admin-panel',
                element: <AdminPanel></AdminPanel>,
                children: [
                    {
                        path: 'all-users',
                        element: <AllUsers></AllUsers>
                    },
                    {
                        path: 'all-products',
                        element: <AllProducs></AllProducs>
                    }
                ]
            }
        ]
    }
])

export default router;