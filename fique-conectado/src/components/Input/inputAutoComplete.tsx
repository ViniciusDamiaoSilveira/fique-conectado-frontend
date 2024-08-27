import colors from '../../utils/colors';
import { CiSearch } from 'react-icons/ci';
import TmdbAxios from '../../api/tmdb/movieAPI';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import MovieSearch from '../../models/movie/movieSearch';
import { VITE_TMDB_IMG } from '../../utils/constants';
import './inputAutoComplete.css'
import { NavLink } from 'react-router-dom';

const urlPoster = VITE_TMDB_IMG

function InputAutoComplete({value, setValue} : {value: string, setValue: any}) {

  const [listMovies, setListMovies] = useState<MovieSearch[]>([])
  const [searchMovie] = useDebounce(value, 500)
  
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'
    }}>
        <input
            type='text'
            placeholder='Pesquisar...'
            style={{ 
              backgroundColor: colors.GreyInput,
              border: 'none',
              outline: 'none',
              color: colors.White,
              width: 370,
              height: 40,
              fontSize: 15,
              paddingLeft: 15,
             }}
            value={value}
            onChange={(e) => {
                setValue(e.currentTarget.value)
                if (e.currentTarget.value === '') {
                  setListMovies([])
                } 
            }}
            onBlur={() => {
              setTimeout(() => {
                setListMovies([])
                setValue('')
              }, 200);
            }}
        />
        <div style={{ backgroundColor: colors.GreyInput, height: 42, display: 'flex', alignItems: 'center', position: 'absolute', marginLeft: `calc(390px - 20px)`, paddingRight: 10, paddingLeft: 10}}>
          <CiSearch size={20} color={colors.GreyFont}/>
        </div>

        {listMovies?.length === 1 && (
          <ul style={{
            position: 'absolute',
            width: 410,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            zIndex: 2000,
            listStyle: 'none',
            textDecoration: 'none',
            overflow: 'auto',
            backgroundColor: colors.GreyInput,
            maxHeight: 250,
            minHeight: 'fit-content',
            padding: 0,
            margin: 0,
            marginTop: 165,
            color: colors.White
          }}
          >

            {
              listMovies.map(movies => {
                return (
                  <NavLink to={'/Filme/' + movies.id} 
                    className='searchMovies'
                    style={{
                      maxHeight: 200, 
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      backgroundClip: colors.GreyInput,
                      transition: '0.5s',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      color: colors.White,
                      gap: 20,
                    }}>
                        <img
                        style={{ width: 80 }} 
                        src={`${urlPoster}${movies.poster_path}`} 
                        alt="poster" />
                        <p style={{ marginTop: 0, marginBottom: 0 }}> {movies.title} </p>
                    </NavLink>
                )
              })
            }
          </ul>
        )}

        {listMovies?.length > 1 && (
          <ul style={{
            position: 'absolute',
            width: 410,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            zIndex: 2000,
            listStyle: 'none',
            overflow: 'auto',
            textDecoration: 'none',
            backgroundColor: colors.GreyInput,
            maxHeight: 250,
            minHeight: 'fit-content',
            padding: 0,
            margin: 0,
            marginTop: 295,
            color: colors.White
          }}
          >

            {
              listMovies.map(movies => {
                return (
                    <NavLink to={'/Filme/' + movies.id} 
                      className='searchMovies'
                      style={{
                        maxHeight: 200, 
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundClip: colors.GreyInput,
                        transition: '0.5s',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: colors.White,
                        gap: 20,
                      }}>
                          <img
                          style={{ width: 80 }} 
                          src={`${urlPoster}${movies.poster_path}`} 
                          alt="poster" />
                          <p style={{ marginTop: 0, marginBottom: 0, textDecorationLine: 'none' }}> {movies.title} </p>
                      </NavLink>
                )
              })
            }
          </ul>
        )}

            

    </div>
  );
}

export default InputAutoComplete;