import "./button.css"

interface buttonProps {
    id: string,
    text: string,
    border: string,
    textColor: string,
    backgroundColor: string,
    fontSize: string,
    icon?: any,
}

export default function Button(props: buttonProps) {
    return (
        <button 
            id={props.id}
            className={
                `btn-prime 
                text-${props.textColor}
                border-${props.border}
                background-${props.backgroundColor}
                font-${props.fontSize}`
            }>
            {props.icon && (
                <>
                    {props.icon}
                </>
            )}

            {props.text}
        </button>
    )
}