import Game from "../game/Game";
import "./RegisterGuess.css"
import CardGuessRegistered from "../card-guess-registered/CardGuessRegistered";

export default function RegisterGuess() {
    const guessMoc = [
        {
            id: "ac632dd8-a53d-4cd1-b58c-b032dc7aa097",
            answer: "JavaScript",
            hints: [
              {
                id: "1102f96a-332c-4156-ab3d-13cc497d16f8",
                text: "Utiliza o prototype",
              },
              {
                id: "7097349a-6920-4c8d-8ff0-16ba418b9a62",
                text: "Não é tipada",
              },
              {
                id: "d01b8088-c1e1-4027-9762-12c4bc59120e",
                text: "Uma das linguagens mais famosas",
              },
            ],
            opened: true,
          },
          {
            id: "c3fc8df0-8fbf-43ad-87b2-b638d1482b55",
            answer: "Python",
            hints: [
              {
                id: "4cf0cb85-0f38-4ab6-a400-9a040731d2e8",
                text: "Linguagem de programação de alto nível",
              },
              {
                id: "e8e9b2b6-c4a1-4811-8fa0-48d4b239bb61",
                text: "Amplamente utilizada em desenvolvimento web e científico",
              },
              {
                id: "839c7fc1-09ef-4d92-bf4c-914cc5d0fd33",
                text: "Conhecida por sua simplicidade e legibilidade",
              },
            ],
            opened: true,
          },
          {
            id: "b4054e37-4980-4d8b-8177-4bbf3fa89c02",
            answer: "Java",
            hints: [
              {
                id: "2f0465c4-c3d4-46d6-bef0-1b45a03fbd61",
                text: "Linguagem orientada a objetos",
              },
              {
                id: "0c3055c9-26b1-4a33-a2e1-1950d5d91625",
                text: "Amplamente utilizada no desenvolvimento de aplicativos móveis e empresariais",
              },
              {
                id: "1a514e57-832b-42f1-99d7-38d3835f49c2",
                text: "Possui uma máquina virtual que permite a portabilidade do código",
              },
            ],
            opened: true,
          }
    ]
    return(
        <Game>
            <div className="register-guess">
                {guessMoc && (guessMoc.map((guess) => {
                    return(
                        <>
                            <CardGuessRegistered guess={guess} />
                        </>
                    )
                }))}
            </div>
        </Game>
    )
}
