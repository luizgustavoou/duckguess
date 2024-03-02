import logo from "../../assets/duck-sing-removebg-preview.png";

export default function Home () {
    return(
        <div className="main">
            <div className="image-reference">
            <img alt="PatoMarketero" src={logo} />
            <p>
                <span>Duck</span>
                Guess
            </p>
            </div>
        </div>
    )
}
