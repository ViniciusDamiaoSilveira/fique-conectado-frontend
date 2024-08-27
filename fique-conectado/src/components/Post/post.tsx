import { Rating } from "@mui/material";
import colors from "../../utils/colors";
import { useEffect, useState } from "react";
import TmdbAxios from "../../api/tmdb/movieAPI";
import { VITE_TMDB_IMG } from "../../utils/constants";
import { HiHeart } from "react-icons/hi";
import { BiHeart, BiShare } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { IoStar } from "react-icons/io5";
import Movie from "../../models/movie/movie";

function Post({username, comment, rating, entertainment} : 
    {username: string, comment: string, rating: number, entertainment: string }) {
    
    const [movie, setMovie] = useState<Movie>()
    const [type, setType] = useState<string>()    
        
    async function getMovies() {
        const response = await TmdbAxios(`/movie/${entertainment}?language=pt-BR`)
        setMovie(response.data)
    }

    useEffect(() => {
        getMovies()
        setType('Filme')
    }, [])

    return (
        <div style={{ width: '100%', height: 300, backgroundColor: colors.GreyPost, borderRadius: 5, marginBottom: 30, paddingBottom: 15 }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' , alignItems: 'center' , marginLeft: 20, marginTop: 10}}>
                
                <div style={{ display: "flex", alignItems: 'center', gap: 15, marginTop: 15}}>
                    <div style={{ width: 45, height: 45, backgroundColor: colors.Yellow, borderRadius: 30 }}></div>
                    <div style={{ height: 45, marginTop: 8}}>
                        <p style={{ marginTop: 0, marginBottom: 0, color: colors.White, fontSize: 20, fontWeight: 'bold' }}> {username} </p>
                        <p style={{ marginTop: 0, color: colors.White, fontSize: 16, fontWeight: 'normal' }}> <i> {type}  </i> </p>
                    </div>

                </div>

                <div style={{ marginRight: 20 }}>
                    <Rating defaultValue={rating} precision={0.5} readOnly 
                    emptyIcon={<IoStar style={{ opacity: 0.55 }} fontSize="inherit" />}/>
                </div>

            </div>

            <div style={{ display: 'flex', marginLeft: 20, marginTop: 30 }}>
                <div style={{ height: 170, maxHeight: 220, width: 'fit-content' }}> 
                    <img src={`${VITE_TMDB_IMG}${movie?.poster_path}`} style={{ height: '100%'}} /> 
                </div>
                <div>
                    <h1 style={{ marginTop: 0, marginLeft: 20, marginBottom: 0, fontSize: 28 , color: colors.White }}> {movie?.title} </h1>
                    <p style={{ marginTop: 10, marginLeft: 20, fontSize: 18 , color: colors.White, fontWeight: 'normal', paddingRight: 30 }}> {comment} </p>
                </div>
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 20}}>
                <div style={{ display: 'flex', alignItems: 'center', color: colors.White, gap: 5 }}> <BiHeart size={23} style={{ marginLeft: 20 }}/> {20} </div>
                <BiShare color={colors.White} size={23} style={{ marginRight: 20 }}/>
            </div>
        </div>
    )
}

export default Post;