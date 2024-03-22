import "./AppSelect.css"

interface AppSelectProps {
    content: string[];
}

export default function AppSelect({content}: AppSelectProps) {
    return(
        <div className="appselect">
            <select>
                {content && (
                    content.map((element) => {
                        return(
                            <option className="option" value={element}>{element}</option>
                        )
                    })
                )}
            </select>
        </div>
    )
}
