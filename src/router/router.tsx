import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Entertainment from "../pages/Entertainment/Entertainment";

const router = createBrowserRouter([
    {
        path: '/:type',
        element: <Home />
    },
    {
        path: '/:type/:id',
        element: <Entertainment />
    },
    { 
        path: "/login",
    },
    { 
        path: "/register",
    },
    {
        path: "/profile",
    },
    {
        path: "/Filmes/:type",
    },
    {
        path: "/Filme/:id",
    },
])

export default router