import colors from '../../utils/colors';
import { CiSearch } from 'react-icons/ci';
import UserTmdbAxios from '../../api/tmdb/movieAPI';
import { useDebounce } from 'use-debounce';
import { useEffect, useRef, useState } from 'react';
import MovieSearch from '../../models/movie/movieSearch';
import { VITE_TMDB_IMG } from '../../utils/constants';
import './inputAutoComplete.css'

const urlPoster = VITE_TMDB_IMG

function InputAutoComplete({value, setValue} : {value: string, setValue: any}) {

  const [listMovies, setListMovies] = useState<MovieSearch[]>([])
  const [searchMovie] = useDebounce(value, 500)
  
  async function searchMovieRequest(text: string) {
    const url = `/search/movie?query=${text}&include_adult=false&language=pt-BR&page=1`
    const response = await UserTmdbAxios(url)
    setListMovies(response.data.results)
    
  }

  useEffect(() => {
    if (searchMovie != '') {
      searchMovieRequest(searchMovie)
    }
  }, [searchMovie])

  return (
    <div style={{ display: 'flex', alignItems: 'center'
    }}>
        <input
            type='text'
            placeholder='Pesquisar...'
            style={{ 
              backgroundColor: colors.GreyInput,
              border: 'none',
              outline: 'none',
              color: colors.White,
              width: 380,
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
              }, 300);
            }}
        />
        <div style={{ position: 'absolute', marginLeft: `calc(380px - 20px)`}}>
          <CiSearch size={20} color={colors.GreyFont}/>
        </div>

        {listMovies?.length > 0 && (
          <ul style={{
            position: 'absolute',
            width: 398,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            zIndex: 1,
            listStyle: 'none',
            overflow: 'auto',
            backgroundColor: colors.GreyInput,
            maxHeight: 350,
            marginTop: 410,
            padding: 0,
            color: colors.White
          }}
          >

            {
              listMovies.map(movies => {
                return (
                  <li 
                  style={{ 
                    height: 200, 
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundClip: colors.GreyInput,
                    transition: '0.5s',
                    cursor: 'pointer',
                    gap: 20,
                  }}>
                      <img
                      style={{ width: 80 }} 
                      src={`${urlPoster}${movies.poster_path}`} 
                      alt="poster" />
                      <p> {movies.title} </p>
                  </li>
                )
              })
            }
          </ul>
        )}

            

    </div>
  );
}

export default InputAutoComplete;