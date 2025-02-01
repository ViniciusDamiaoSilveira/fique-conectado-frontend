import { useEffect, useState } from 'react'
import './autocomplete.css'
import TmdbAxios from '../../../api/tmdb/movieAPI'
import MovieSearch from '../../../models/movie/movieSearch'
import { useDebounce } from 'use-debounce'
import { CiSearch } from 'react-icons/ci';
import { NavLink } from 'react-router-dom'
import { VITE_TMDB_IMG } from '../../../utils/constants'
import NotFound from '../../../images/Image-not-found.png' 


interface autocompleteProps { 
    value: string,
    setValue: any,
}

const urlPoster = VITE_TMDB_IMG

export default function Autocomplete(props: autocompleteProps) {

    const [listMovies, setListMovies] = useState<MovieSearch[]>([])
    const [searchMovie] = useDebounce(props.value, 500)
  
    async function searchMovieRequest(text: string) {
        const url = `/search/movie?query=${text}&include_adult=false&language=pt-BR&page=1`
        const response = await TmdbAxios(url)
        setListMovies(response.data.results)
    }

    useEffect(() => {
        if (searchMovie != '') {
        searchMovieRequest(searchMovie)
        }
    }, [searchMovie])

    console.log(listMovies);

    return (
        <div className="autocomplete-container">
            <input className="autocomplete-input"
                type='text'
                placeholder='Pesquisar...'
                value={props.value}
                onChange={(e) => {
                    props.setValue(e.currentTarget.value)
                    if (e.currentTarget.value === '') {
                    setListMovies([])
                    } 
                }}
                onBlur={() => {
                setTimeout(() => {
                    setListMovies([])
                    props.setValue('')
                }, 200);
                }}
                />

            <div className='icon-search'>
                <CiSearch size={23} color={'#6E6E6E'}/>
            </div>

            { listMovies && (
                <ul className={`list-search-container ${listMovies.length > 1 ? 'long-list' : ''}`}>
                {
                    listMovies.map(movies => {
                        return (
                        <NavLink to={'/Filme/' + movies.id} className='list-search'>
                            <img style={{ width: 80, height: 120 }} 
                                src={`${movies.poster_path ? `${urlPoster}${movies.poster_path}` : NotFound}`} 
                                alt="poster" 
                            />
                                <p className="search-title"> 
                                    {movies.title} </p>
                            </NavLink>
                        )
                    })
                }
                </ul>

            )}
            
        </div>
    )
}