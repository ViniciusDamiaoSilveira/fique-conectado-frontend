import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/series',
        element: <Home />,
    },
    {
        path: '/jogos',
        element: <Home />,
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