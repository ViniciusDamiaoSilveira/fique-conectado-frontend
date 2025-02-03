import { useEffect, useState } from 'react'
import './autocomplete.css'
import { useDebounce } from 'use-debounce'
import { CiSearch } from 'react-icons/ci';
import { NavLink, useParams } from 'react-router-dom'
import { VITE_TMDB_IMG } from '../../../utils/constants'
import NotFound from '../../../images/Image-not-found.png'
import MovieSearch from '../../../models/movie/movieSearch';
import TmdbAxios from '../../../api/tmdb/movieAPI';


interface autocompleteProps { 
    value: string,
    setValue: any,
}

const urlPoster = VITE_TMDB_IMG

export default function Autocomplete(props: autocompleteProps) {

    const [listEntertainment, setListEntertainment] = useState<any[]>([])
    const [searchEntertainment] = useDebounce(props.value, 500)
    const { type } = useParams()
  
    async function searchEntertainmentRequest(text: string) {
        let type_query;
        if (type == 'series') type_query = 'tv'
        if (type == 'filmes') type_query = 'movie'


        const url = `/search/${type_query}?query=${text}&include_adult=false&language=pt-BR&page=1`
        const response = await TmdbAxios(url)
        setListEntertainment(response.data.results)
    }

    useEffect(() => {
        if (searchEntertainment != '') {
        searchEntertainmentRequest(searchEntertainment)
        }
    }, [searchEntertainment])

    return (
        <div className="autocomplete-container">
            <input className="autocomplete-input"
                type='text'
                placeholder='Pesquisar...'
                value={props.value}
                onChange={(e) => {
                    props.setValue(e.currentTarget.value)
                    if (e.currentTarget.value === '') {
                    setListEntertainment([])
                    } 
                }}
                onBlur={() => {
                setTimeout(() => {
                    setListEntertainment([])
                    props.setValue('')
                }, 200);
                }}
                />

            <div className='icon-search'>
                <CiSearch size={23} color={'#6E6E6E'}/>
            </div>

            { listEntertainment && (
                <ul className={`list-search-container ${listEntertainment.length > 1 ? 'long-list' : ''}`}>
                {
                    listEntertainment.map(entertainment => {
                        return (
                        <NavLink to={'/Filme/' + entertainment.id} className='list-search'>
                            <img style={{ width: 80, height: 120 }} 
                                src={`${entertainment.poster_path ? `${urlPoster}${entertainment.poster_path}` : NotFound}`} 
                                alt="poster" 
                            />
                                <p className="search-title"> 
                                    {entertainment.title || entertainment.name} </p>
                            </NavLink>
                        )
                    })
                }
                </ul>

            )}
            
        </div>
    )
}