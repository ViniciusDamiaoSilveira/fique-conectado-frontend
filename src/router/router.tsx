import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Entertainment from "../pages/Entertainment/Entertainment";
import ListEntertainment from "../pages/ListEntertainment/ListEntertainment";

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
        path: '/:type/:type_list/listagem',
        element: <ListEntertainment />
    },
    {
        path: "*",
        element: <Navigate to="/filmes" replace />
    }
])

export default router