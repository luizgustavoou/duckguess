interface AppInputProps {
    type: string;
    text: string;
    id: string;
}
export default function AppInput ({type, text, id}: AppInputProps) {
    return(
        <div>
            {text} <input type={type} id={id}  />
        </div>
    )
}
