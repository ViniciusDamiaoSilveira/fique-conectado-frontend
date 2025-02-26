import { useEffect, useState } from "react"
import "./selectInput.css"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"

interface SelectInputProps {
    id: string,
    title: string,
    listSelect: any[],
    value: any,
    setValue: any,
    icon?: any,
}

export default function SelectInput(props: SelectInputProps) {
    const [items, setItems] = useState<any[]>([])

    function showSelectList() {
        if (items.length > 0) {
            setItems([])
        } else {
            setItems(props.listSelect)
        }
    }

    return (
        <div className="custom-select">
            <button 
                className="input-select" 
                onClick={showSelectList}
                onBlur={() => setTimeout(() => {
                    setItems([])
                }, 200)}
                > 
                {props.value ? props.value.name : props.title}
            </button>
            
            {items.length > 0 && (
                <div className="select-items">
                    {items.map((item: any) => 
                        <div key={item.id} 
                            className="select-item" 
                            onClick={() => props.setValue(item)}>
                            {item.name}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}