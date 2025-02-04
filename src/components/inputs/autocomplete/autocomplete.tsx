import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { CiSearch } from 'react-icons/ci';
import { NavLink, useParams } from 'react-router-dom'
import { VITE_TMDB_IMG } from '../../../utils/constants'

import TmdbAxios from '../../../api/tmdb/movieAPI';

import './autocomplete.css'
import { SearchAutoComplete } from '../../../utils/requests/requestAutocomplete';

interface autocompleteProps { 
    value: string,
    setValue: any,
}

interface itemsProps {
    id: string,
    title: string,
    img: string,
}

export default function Autocomplete(props: autocompleteProps) {

    const [listEntertainment, setListEntertainment] = useState<itemsProps[]>([])
    const [searchEntertainment] = useDebounce(props.value, 500)
    const { type } = useParams()
  
    async function searchEntertainmentRequest(text: string) {
        const results = await SearchAutoComplete(text, type!);
        setListEntertainment(results)
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
                        <NavLink to={`/${type}/` + entertainment.id} className='list-search'>
                            <img style={{ width: 80, height: 120 }} 
                                src={`${entertainment.img}`} 
                                alt="poster" 
                            />
                                <p className="search-title"> 
                                    {entertainment.title} </p>
                            </NavLink>
                        )
                    })
                }
                </ul>

            )}
            
        </div>
    )
}