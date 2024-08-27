import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import Genre from "../../models/genre/genre";
import colors from "../../utils/colors";

function RadioGroupComp({type, listRadio, onChange} : {type: string, listRadio: any[], onChange: any}) {

    const [genres, setGenres] = useState<Genre[]>([])
    const [duration, setDuration] = useState<any[]>([])

    useEffect(() => {
        if (type == 'Genêro') {
            setGenres(listRadio)
        } else if (type == 'Duração') {
            setDuration(listRadio)
        }
    }, [listRadio])

    return (
        <FormControl>
            <RadioGroup
                defaultValue=""
                name="radio-buttons-group"
                onChange={(event: any) => onChange((event.target as HTMLInputElement).value)}
            >
                <FormControlLabel value='' key={0} label='Nenhum' style={{ color: colors.White }} control={
                            <Radio sx={{color: '#F1F1F1', '&.Mui-checked': {color: '#FFBF15'}}}/>} />
                
                {
                    duration?.length > 0 &&
                    duration?.map(duration => 
                        <FormControlLabel style={{ color: colors.White }} key={duration.key} value={duration.value} label={duration.key} control={
                            <Radio sx={{color: '#F1F1F1', '&.Mui-checked': {color: '#FFBF15'}}}/>} />
                    )
                }

                {
                    genres?.length > 0 &&
                    genres?.map(genre => 
                        <FormControlLabel style={{ color: colors.White }} key={genre.id} value={`&with_genres=${genre.id}`} label={genre.name} control={
                            <Radio sx={{color: '#F1F1F1', '&.Mui-checked': {color: '#FFBF15'}}}/>} />
                    )
                }
                

            </RadioGroup>
        </FormControl>
    );
}

export default RadioGroupComp;