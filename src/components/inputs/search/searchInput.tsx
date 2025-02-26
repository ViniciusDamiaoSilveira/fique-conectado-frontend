import "./searchInput.css"

interface SearchInputProps {
    id: string,
    placeholder: string,
    value: string, 
    setValue: any,
    icon?: any,
}

export default function SearchInput(props: SearchInputProps) {
    return (
        <div className="search-container">
            <input
                className="search-input"
                type="text"
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => {
                    props.setValue(e.currentTarget.value)
                }}     
            />

            {props.icon && 
                <div className="search-icon">
                    {props.icon}
                </div>
            }
        </div>
    )
} 