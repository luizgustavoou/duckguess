import './AppButton.css'

interface AppButtonProps{content: string}
export default function AppButton ({content}:AppButtonProps) {
    return(
        <div className='div'>
            <button className='button'>
                {content}
            </button>
        </div>
    )
}
