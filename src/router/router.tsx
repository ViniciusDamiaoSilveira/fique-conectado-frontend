import { createBrowserRouter, Navigate } from "react-router-dom";
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
        path: "*",
        element: <Navigate to="/filmes" replace />
    }
])

export default router