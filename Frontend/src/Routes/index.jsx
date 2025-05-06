import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import AdminPanel from "../Pages/AdminPanel/AdminPanel";
import AllUsers from "../Pages/AllUsers/AllUsers";
import AllProducs from "../Pages/AllProducts/AllProducs";
import CategoryProduct from "../Pages/CategoryProduct";
import ProductDetails from "../Pages/ProductDetails";


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
                path: "product-category/:categoryName",
                element: <CategoryProduct></CategoryProduct>
            },
            {
                path: "product/:id",
                element: <ProductDetails></ProductDetails>
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