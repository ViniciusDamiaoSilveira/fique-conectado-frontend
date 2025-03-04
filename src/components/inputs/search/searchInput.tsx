import "./searchInput.css"

interface SearchInputProps {
    id: string,
    placeholder: string,
    value: string, 
    setValue: any,
    icon?: any,
    type?: string
}

export default function SearchInput(props: SearchInputProps) {
    return (
        <div className="search-container">
            <input
                className="search-input"
                type={props.type ? props.type : "text"}
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