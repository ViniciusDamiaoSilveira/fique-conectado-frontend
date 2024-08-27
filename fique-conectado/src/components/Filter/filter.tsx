import { Accordion, AccordionDetails, AccordionSummary, FormControl } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import colors from "../../utils/colors";
import TmdbAxios from "../../api/tmdb/movieAPI";
import { useEffect, useState } from "react";
import Genre from "../../models/genre/genre";
import RadioGroupComp from "../RadioGroup/radioGroup";

function Filter({title, handleRadio} : {title: string, handleRadio : any}) {

    const [genres, setGenres] = useState<Genre[]>([])
    const duration = [
        {
            key: 'Até 60min',
            value: '&with_runtime.lte=60'
        },
        {
            key: 'Até 90min',
            value: '&with_runtime.lte=90'
        },
        {
            key: 'Até 120min',
            value: '&with_runtime.lte=120'
        },
        {
            key: 'Mais de 120min',
            value: '&with_runtime.gte=120'
        },
    ]
    

    async function getCategories() {
        const response = await TmdbAxios('/genre/movie/list?language=pt-BR');
        console.log(response.data.genres);
        
        setGenres(response.data.genres);  
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div style={{ width: '100%' }}>
            <Accordion>
                <AccordionSummary
                expandIcon={<IoIosArrowDown color={colors.White}/>}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{ height: 70, backgroundColor: colors.GreyComponent, color: colors.White }}
                >
                {title}
                </AccordionSummary>
                <AccordionDetails
                style={{ backgroundColor: colors.GreyComponent }}>
                    <FormControl>
                        { title == 'Genêro' && (
                            <RadioGroupComp type={title} listRadio={genres} onChange={handleRadio}/>
                        )}
                        { title == 'Duração' && (
                            <RadioGroupComp type={title} listRadio={duration} onChange={handleRadio}/>
                        )}
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Filter;