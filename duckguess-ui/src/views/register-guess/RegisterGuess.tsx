import Game from "../game/Game";
import { useState } from "react";
import FormRegisterGuess from "../form-register-guess/FormRegisterGuess";
import { HiPlus, HiSearch } from "react-icons/hi";

export default function RegisterGuess() {
  const guessMoc = [
    {
      id: "ac632dd8-a53d-4cd1-b58c-b032dc7aa097",
      answer: "JavaScript",
      hints: [
        { id: "1102f96a-332c-4156-ab3d-13cc497d16f8", text: "Utiliza o prototype" },
        { id: "7097349a-6920-4c8d-8ff0-16ba418b9a62", text: "Não é tipada" },
        { id: "d01b8088-c1e1-4027-9762-12c4bc59120e", text: "Uma das linguagens mais famosas" },
      ],
      opened: true,
    },
    {
      id: "c3fc8df0-8fbf-43ad-87b2-b638d1482b55",
      answer: "Python",
      hints: [
        { id: "4cf0cb85-0f38-4ab6-a400-9a040731d2e8", text: "Linguagem de programação de alto nível" },
        { id: "e8e9b2b6-c4a1-4811-8fa0-48d4b239bb61", text: "Amplamente utilizada em desenvolvimento web e científico" },
        { id: "839c7fc1-09ef-4d92-bf4c-914cc5d0fd33", text: "Conhecida por sua simplicidade e legibilidade" },
      ],
      opened: true,
    },
    {
      id: "b4054e37-4980-4d8b-8177-4bbf3fa89c02",
      answer: "Java",
      hints: [
        { id: "2f0465c4-c3d4-46d6-bef0-1b45a03fbd61", text: "Linguagem orientada a objetos" },
        { id: "0c3055c9-26b1-4a33-a2e1-1950d5d91625", text: "Amplamente utilizada no desenvolvimento de aplicativos móveis e empresariais" },
        { id: "1a514e57-832b-42f1-99d7-38d3835f49c2", text: "Possui uma máquina virtual que permite a portabilidade do código" },
      ],
      opened: true,
    },
  ];

  const [isCreating, setIsCreating] = useState(false);
  const handleAddNew = () => {
    setSelectedGuessId(null);
    setIsCreating(true);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuessId, setSelectedGuessId] = useState<string | null>(guessMoc[0]?.id || null);

  const filteredGuesses = searchTerm
    ? guessMoc.filter(g => g.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    : guessMoc;

  const selectedGuess = guessMoc.find(g => g.id === selectedGuessId);

  return (
    <Game>
      <div className="flex flex-col items-start gap-4 w-full px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold text-gradient">Adivinhações</h1>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500
                       text-white text-sm font-semibold transition-all duration-200 active:scale-95
                       shadow-lg shadow-indigo-900/40"
          >
            <HiPlus size={16} /> Adicionar
          </button>
        </div>

        {/* Master-Detail Layout */}
        <div className="w-full flex flex-col lg:flex-row gap-6 mt-4 h-[65vh] min-h-[500px]">
          {/* Left panel: List */}
          <div className="w-full lg:w-1/3 flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/5 bg-black/10">
              <div className="relative">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="text"
                  placeholder="Buscar adivinhação..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 flex flex-col gap-1">
              {filteredGuesses.length > 0 ? (
                filteredGuesses.map((guess) => (
                  <button
                    key={guess.id}
                    onClick={() => {
                      setIsCreating(false);
                      setSelectedGuessId(guess.id);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group
                      ${selectedGuessId === guess.id
                        ? 'bg-indigo-600 shadow-md shadow-indigo-900/20 text-white'
                        : 'hover:bg-white/10 text-white/70 hover:text-white'
                      }`}
                  >
                    <span className="font-semibold truncate text-sm">{guess.answer}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-md font-bold transition-colors
                      ${selectedGuessId === guess.id
                        ? 'bg-black/20 text-white'
                        : 'bg-white/10 text-white/50 group-hover:text-white/70'
                      }`}
                    >
                      {guess.hints.length}
                    </span>
                  </button>
                ))
              ) : (
                <div className="flex-1 flex items-center justify-center text-white/40 text-sm p-4 text-center">
                  Nenhum registro encontrado.
                </div>
              )}
            </div>
          </div>

          {/* Right panel: Details */}
          <div className="w-full lg:w-2/3 flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl relative">
            {isCreating ? (
              <div className="flex-1 overflow-y-auto custom-scrollbar flex items-center justify-center p-6 relative z-10 w-full h-full">
                <FormRegisterGuess handleClose={() => setIsCreating(false)} />
              </div>
            ) : selectedGuess ? (
              <>
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="p-6 border-b border-white/5 bg-black/10 flex justify-between items-start relative z-10">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedGuess.answer}</h2>
                    <p className="text-white/50 text-sm">Detalhes e dicas cadastradas</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 relative z-10 flex flex-col gap-3">
                  {selectedGuess.hints.map((hint, i) => (
                    <div
                      key={hint.id}
                      className="flex items-start bg-black/20 rounded-xl p-4 text-sm text-white/80
                                 border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <span className="flex items-center justify-center min-w-[28px] h-[28px] bg-indigo-500/20 rounded-full text-indigo-400 font-bold text-sm mr-4 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed text-base pt-0.5">{hint.text}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-white/30">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <HiSearch size={28} className="opacity-50" />
                </div>
                <p>Selecione um registro ao lado para ver as dicas.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </Game>
  );
}
