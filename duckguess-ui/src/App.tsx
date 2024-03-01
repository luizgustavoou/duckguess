import './App.css'
import AppButton from './components/form/AppButton'
import char from '../public/duck-sing-removebg-preview.png'

export default function App() {

  return (
    <div className='page'>
      <div className='section'>
        <h1>
          DuckGuess
        </h1>
      </div>

      <div className='second section'>
        <img alt='PatoMarketero' src={char} />
      </div>

      <div className='section format-flex'>
        <div>
          <AppButton content='Jogar' />
        </div>
        <AppButton content='Regras' />
      </div>
    </div>
  )
}
