import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Entertainment from "../pages/Entertainment/Entertainment";
import ListEntertainment from "../pages/ListEntertainment/ListEntertainment";
import SearchUsers from "../pages/SearchUsers/searchUsers";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import Perfil from "../pages/Perfil/Perfil";

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
        path: '/pesquisar-usuarios',
        element: <SearchUsers />
    },
    {
        path: '/perfil/:userId',
        element: <Perfil />
    },
    {
        path: '/cadastro',
        element: <Cadastro />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: "*",
        element: <Navigate to="/filmes" replace />
    },
])

export default router