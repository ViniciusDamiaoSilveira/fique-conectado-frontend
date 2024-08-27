import { useParams } from "react-router-dom";
import TmdbAxios from "../../api/tmdb/movieAPI";
import { useEffect, useState } from "react";
import { VITE_TMDB_IMG } from "../../utils/constants";
import Header from "../../components/Header/header";
import colors from "../../utils/colors";
import ButtonDefault from "../../components/Button/ButtonDefault";
import ModalMovie from "../../components/Modal/modalMovieRating";
import { IoTimeOutline } from "react-icons/io5";
import { BiMovie } from "react-icons/bi";
import ModalMovieRating from "../../components/Modal/modalMovieRating";
import ModalMovieList from "../../components/Modal/modalMovieList";
import MovieInformations from "../../components/MovieInformations/movieInformations";
import Movie from "../../models/movie/movie";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { CiCalendar } from "react-icons/ci";
import { GoCalendar } from "react-icons/go";
import { jwtDecode } from "jwt-decode";
import { UserLocalAxios } from "../../api/local/userAPI";

function MoviePage() {
    const { id } = useParams()
    const [movie, setMovie] = useState<Movie>()
    const [comment, setComment] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [ratingId, setRatingId] = useState<string>('');
    const [openModalRating, setOpenModalRating] = useState(false)
    const [openModalRatingEdit, setOpenModalRatingEdit] = useState(false)
    const [openModalList, setOpenModalList] = useState(false)
    const [token, setToken] = useState<string>('')
    const [editButton, setEditButton] = useState<boolean | undefined>()



    async function getMovie() {
        const response = await TmdbAxios(`/movie/${id}?language=pt-BR`)
        setMovie(response.data)
    }

    async function getRating() {
        try {
            const user = jwtDecode<any>(token);
            
            const response = await UserLocalAxios('/Rating/verify', 'POST', token, {userId: user.id, entertainmentId: id})
            setEditButton(true)
            setComment(response?.data.comment)
            setRating(response?.data.numRating)
            setRatingId(response?.data.id)

        } catch(ex: any) {
            setEditButton(false)
        }
    }

    function handleOpenRating() {
        setOpenModalRating(true);
    };

    function handleOpenRatingEdit() {
        setOpenModalRatingEdit(true);
    };

    function handleCloseRatingEdit() {
        setOpenModalRatingEdit(false);
    };

    const handleCloseRating = () => {
        setOpenModalRating(false);
    };

    function handleOpenList() {
        setOpenModalList(true);
    };

    const handleCloseList = () => {
        setOpenModalList(false);
    };


    useEffect(() => {
        setToken(localStorage.getItem('Token')!)
        getMovie()
        getRating()
    }, [])

    useEffect(() => {
        setToken(localStorage.getItem('Token')!)
        getMovie()
        getRating()
    }, [id])

    useEffect(() => {
        setToken(localStorage.getItem('Token')!)
        getMovie()
        getRating()
    }, [editButton])

    return (
        <div>
            <Header />
            
            {
                movie != undefined && (
                    <div>
                        <div style={{ 
                            width: 'calc(100% - 25px)',
                            display: 'flex',
                            alignItems: 'flex-end', 
                            height: 400, 
                            position: 'absolute', 
                            zIndex: 2,
                            left: 25
                        }}>
                        
                            <MovieInformations 
                                poster={`${VITE_TMDB_IMG + movie.poster_path}`} 
                                title={movie.title} 
                                description={movie.overview}
                                rating={(movie.vote_average / 2)}
                            />

                        </div>

                        <div style={{ 
                            width: '100%', 
                            height: 400, 
                            backgroundImage: `url(${VITE_TMDB_IMG + movie.backdrop_path})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            filter: 'blur(8px)',
                            opacity: 0.50,
                            zIndex: 1
                            }} />
                        
                        <div style={{ 
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: 10,
                         }}>
                            <div style={{
                                display: 'flex',
                                marginLeft: 25,
                                fontSize: 18,
                                gap: 25,

                             }}>

                            <div>
                            
                            {
                                !editButton && (
                                    <ButtonDefault bgColor={''} 
                                        width={220} 
                                        height={60} 
                                        borderRadius={0} 
                                        border={'2px solid ' + colors.Yellow}
                                        onClick={handleOpenRating}
                                        text={'Adicionar crítica'}  
                                        fontSize={'17px'}
                                        icon={true}
                                        typeIcon="plus"
                                    />
                                )
                            }
                            
                            {
                                editButton && (
                                    <ButtonDefault bgColor={colors.Yellow} 
                                        width={220} 
                                        height={60} 
                                        borderRadius={0} 
                                        border={'2px solid ' + colors.Yellow}
                                        onClick={handleOpenRatingEdit}
                                        text={'Editar crítica'}  
                                        fontSize={'17px'}
                                        icon={true}
                                        typeIcon="edit"
                                    />
                                )
                            }   

                            </div>

                                {
                                    movie.genres.map(genre => 
                                        <div key={genre.id} 
                                            style={{
                                            height: 45,
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                            borderRadius: 8,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px solid ' + colors.White,
                                            color: colors.White,
                                        }}>
                                            {genre.name}
                                        </div>
                                )}
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: 20,
                                fontSize: 20,
                                marginRight: 25
                            }}>

                                <div style={{
                                    height: 45,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    borderRadius: 10,
                                    fontSize: 20,
                                    display: 'flex',
                                    gap: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: colors.White,
                                }}> 
                                    <RxCounterClockwiseClock /> {movie.runtime}min 
                                </div>

                                <div style={{
                                    height: 45,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    display: 'flex',
                                    gap: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: colors.White,
                                }}> 
                                    <GoCalendar /> {movie.release_date.split('-')[1]}/{movie.release_date.split('-')[0]}
                                </div>
                            </div>

                            <ModalMovieRating
                                comment={comment}
                                rating={rating}
                                setComment={setComment}
                                setRating={setRating}
                                handleClose={handleCloseRating} 
                                open={openModalRating} 
                                edit={false} 
                                />
                            <ModalMovieRating 
                                comment={comment}
                                rating={rating}
                                setComment={setComment}
                                setRating={setRating}
                                handleClose={handleCloseRatingEdit} 
                                open={openModalRatingEdit} 
                                edit={true}
                                ratingId={ratingId}/>

                        </div>
                    </div>
            )}
        </div>
    )
}

export default MoviePage;