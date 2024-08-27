import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import Home from "../pages/Home/home";
import Profile from "../pages/Profile/profile";
import Movies from "../pages/Movies/movies";
import MoviePage from "../pages/MoviePage/moviePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
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
        element: <Login /> 
    },
    { 
        path: "/register",
        element: <Register /> 
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/Filmes/:type",
        element: <Movies />
    },
    {
        path: "/Filme/:id",
        element: <MoviePage />
    },
])

export default router