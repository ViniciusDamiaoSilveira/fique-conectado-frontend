import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import Home from "../pages/Home/home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    { 
        path: "/login",
        element: <Login /> 
    },
    { 
        path: "/register",
        element: <Register /> 
    },

])

export default router