import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";

const router = createBrowserRouter([
    {
        path: '/',
        element: <div />,
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