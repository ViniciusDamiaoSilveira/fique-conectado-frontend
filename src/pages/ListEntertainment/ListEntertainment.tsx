import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { MdKeyboardArrowDown } from "react-icons/md";
import { VITE_TMDB_IMG } from "../../utils/constants";
import { FiX } from "react-icons/fi";

import Header from "../../components/header/header";
import TmdbAxios from "../../api/tmdb/movieAPI";
import SelectInput from "../../components/inputs/select/selectInput";
import EntertainmentPoster from "../../components/entertainmentPoster/entertainmentPoster";
import PaginationList from "../../components/pagination/pagination";

import "./ListEntertainment.css"
import { getCategories } from "../../utils/requests/requestCategories";
import { GetGames, GetMovies, GetSeries } from "../../utils/requests/requestListEntertainment";


interface entertainmentsProps {
    id: string,
    name: string,
    rating: number,
    poster: string,
}

interface selectProps {
    id: string,
    name: string
}

const durations = [
    {
        id: '&with_runtime.lte=60',
        name: 'Até 60min',
    },
    {
        id: '&with_runtime.lte=90',
        name: 'Até 90min',
    },
    {
        id: '&with_runtime.lte=120',
        name: 'Até 120min',
    },
    {
        id: '&with_runtime.gte=120',
        name: 'Mais de 120min',
    },
]

export default function ListEntertainment() {
    const { type } = useParams();
    const { type_list } = useParams();
    const [genre, setGenre] = useState<selectProps | null>(null)
    const [listGenres, setListGenres] = useState<selectProps[]>([])
    const [listDuration, setListDuration] = useState<selectProps[]>([])
    const [duration, setDuration] = useState<selectProps | null>(null)
    const [date, setDate] = useState('')
    const [year, setYear] = useState(0)
    const [entertainments, setEntertainments] = useState<entertainmentsProps[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [colorPagination, setColorPagination] = useState("")

    async function getEntertainment() {
        let result: any[] = [];
        
        if (type == "filmes") {
            result = await GetMovies(type_list!, page, duration, genre, year, date)
        }

        if (type == "series") {
            result = await GetSeries(type_list!, page, genre, year, date)
        }

        if (type == "jogos") {
            result = await GetGames(type_list!, (page * 20), genre?.id!)
        }

        setEntertainments(result[0])
        setTotalPages(result[1])
    }

    async function getGenres() {
        let result = await getCategories(type!)
        setListGenres(result)
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
        
        if (type == "filmes") {
            setPage(1)
            getGenres()
            setColorPagination("#FFBF15")
            setListDuration(durations)
        }

        if (type == "series") {
            setPage(1)
            getGenres()
            setColorPagination("#2F64CF")
        }

        if (type == "jogos") {
            setPage(1)
            getGenres()
            setColorPagination("#13F54C")
        }
        getEntertainment()


    }, [])

    useEffect(() => {
        getEntertainment()
    }, [page])

    useEffect(() => {
        setPage(1)
        getEntertainment()
    }, [genre])

    useEffect(() => {
        setPage(1)
        getEntertainment()
    }, [duration])

    function returnTitle(title: string): string {
        switch (title) {
            case "lancamentos":
                return "Lançamentos";
            case "populares":
                return "Populares";
            case "melhores":
                return "Melhores";
        }

        return ""
    }

    function CleanFilter() {
        setGenre(null)
        setDuration(null)
    }



    return (
        <div className="list-container">
            <Header />
            <h1 className="title-list"> {returnTitle(type_list!)} </h1>

            <div className="inputs-filter-list">
                <div className="input-filter">
                    <SelectInput 
                        id="select-input"
                        listSelect={listGenres}
                        setValue={setGenre}
                        value={genre}
                        title="Categoria"
                        icon={<MdKeyboardArrowDown />}
                    />
                </div>

                { type == "filmes" &&
                    <div className="input-filter">
                        <SelectInput 
                            id="select-input"
                            listSelect={listDuration}
                            setValue={setDuration}
                            value={duration}
                            title="Duração"
                            icon={<MdKeyboardArrowDown />}
                        />
                    </div>
                }

                {(genre || duration) && (
                    <div className={`clean-filter filter-${type}`} onClick={CleanFilter}>
                        <FiX /> Limpar filtros
                    </div>
                )}
            </div>

            {entertainments && (
                <div className="entertainments-list">
                    {entertainments.map((entertainment: entertainmentsProps) => 
                        <EntertainmentPoster 
                            id={entertainment.id}
                            name={entertainment.name}
                            poster={entertainment.poster}
                            rating={entertainment.rating}
                        />
                    )}
                </div>
            )}

            {entertainments && (
                <div className="pagination-list">
                    <PaginationList
                        page={page}
                        color={colorPagination}
                        setPage={setPage}
                        totalPages={totalPages}
                    />
                </div>
            )}

        </div>
    )
}