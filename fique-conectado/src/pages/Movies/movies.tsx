import { useEffect, useState } from "react";
import Filter from "../../components/Filter/filter";
import Header from "../../components/Header/header";
import { NavLink, useParams } from "react-router-dom";
import TmdbAxios from "../../api/tmdb/movieAPI";
import MovieList from "../../models/movie/movieList";
import Card from "../../components/Card/card";
import { VITE_TMDB_IMG } from "../../utils/constants";
import colors from "../../utils/colors";
import { Pagination, PaginationItem, ThemeProvider, createTheme, styled } from "@mui/material";

function Movies() {
    const [movies, setMovies] = useState<MovieList[]>()
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const [genre, setGenre] = useState('')
    const [duration, setDuration] = useState('')
    const [year, setYear] = useState(0)
    const [date, setDate] = useState('')
    const { type } = useParams()

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        getMovies(value, year, date, genre, duration)        
      };

    const CustomPaginationItem = styled(PaginationItem)(({ theme }) => ({
        '&.MuiPaginationItem-ellipsis': {
          color: 'white', // Defina a cor desejada para os três pontos
        },
        '&.MuiPaginationItem-ellipsis:hover': {
          color: 'white', // Defina a cor desejada para os três pontos
        },
        '&.Mui-selected': {
            backgroundColor: colors.Yellow, 
            color: colors.Black,
            '&:hover': {
                backgroundColor: '#f3b407'
            },
        },
        '&:hover': {
            backgroundColor: '#ffc11541', // Cor de fundo ao passar o mouse (opcional)
        },
      }));

    const updateGenre = (query: string) => {
        setGenre(query)
        getMovies(page, year, date, query, duration)
    }

    const updateDuration = (query: string) => {
        setDuration(query)
        getMovies(page, year, date, genre, query)
    }

    async function getMovies(page: number, year: number, date: string, genre: string, duration: string) {
        let response: any;
        
        if (type == 'Estreias') {
            response = await TmdbAxios(`discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&primary_release_year=${year}&primary_release_date.gte=${date}&sort_by=popularity.desc${genre}${duration}`)        
        }

        if (type == 'Populares') {
            response = await TmdbAxios(`discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&vote_average.gte=7&vote_count.gte=2000&sort_by=popularity.desc${genre}${duration}`)        
        }

        if (type == 'Melhores') {
            response = await TmdbAxios(`discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&vote_average.gte=8&vote_count.gte=2000&sort_by=popularity.desc${genre}${duration}`)        
        }
        
        setMovies(response.data.results)
        if (response.data.total_pages > 150) {
            setTotalPages(150)
        } else {
            setTotalPages(response.data.total_pages)
        }
    }

    useEffect(() => {
        const yearNow = new Date().getFullYear()
        const month = new Date().getMonth()
        const today = new Date().getDate()
        setYear(yearNow)

        if (month == 1 && today < 7) {
            setDate(`${yearNow - 1}-12-25`)
            setYear(yearNow - 1)
        } else if (today < 10) {
            setDate(`${yearNow}-${month - 1}-25`)
        } else {
            setDate(`${yearNow}-${month}-${today - 7}`)
        }
        
        getMovies(1, year, date, '', '')
        setPage(1)
    }, [])
        

    return (
        <div>
            <Header />

            <h1 style={{ color: colors.White, marginLeft: 25, marginBottom: 30}}> {type} </h1>

           <div style={{ display: 'flex' }}>
                <div style={{ width: '75%', display: 'flex', flexWrap: 'wrap', gap: 40, marginLeft: 25 }}>
                    {movies &&
                        movies.map(movie => 
                            <NavLink to={'/Filme/' + movie.id} style={{ textDecoration: 'none'}}> 
                                <Card key={movie.id} title={movie.title} poster={`${VITE_TMDB_IMG}${movie.poster_path}`} 
                                release={movie.release_date.split('-')[0]} vote={movie.vote_average / 2}/>
                            </NavLink>
                    )}
                </div>
            

                <div style={{ width: '25%', display: "flex", flexDirection: 'column', gap: 30, alignItems: 'end', marginRight: 25 }}>
                    <Filter title="Genêro" handleRadio={updateGenre} key="Gênero"/>
                    <Filter title="Duração" handleRadio={updateDuration} key="Duração"/>
                </div>
           </div>

           <div style={{ width: '75%', display: 'flex', justifyContent: 'center', marginTop: 30, marginBottom: 25 }}>
  <Pagination 
    page={page} 
    onChange={handleChange}
    count={totalPages} 
    defaultPage={1} 
    sx={{ 
      width: '60%', 
      height: 50, 
      display: 'flex', 
      justifyContent: 'center', 
      color: colors.White 
    }}
    renderItem={(item) => (
      <CustomPaginationItem 
        {...item} 
        sx={{
            color:'white',
            transition: 0.5,
          }} 
      />
    )}
  />
</div>



        </div>
    )
}

export default Movies;