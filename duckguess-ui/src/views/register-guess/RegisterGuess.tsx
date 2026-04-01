import Game from "../game/Game";
import { useState, useEffect } from "react";
import FormRegisterGuess from "../form-register-guess/FormRegisterGuess";
import { HiPlus, HiSearch } from "react-icons/hi";
import { guessService } from "../../services";
import { IGuess } from "../../entities/IGuess";

export default function RegisterGuess() {
  const [guesses, setGuesses] = useState<IGuess[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuessId, setSelectedGuessId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuesses = async () => {
      try {
        setLoading(true);
        const data = await guessService.getAll();
        setGuesses(data);
        if (data.length > 0) {
          setSelectedGuessId(data[0].id);
        }
      } catch (error) {
        console.error("Erro ao carregar adivinhações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuesses();
  }, []);

  const handleAddNew = () => {
    setSelectedGuessId(null);
    setIsCreating(true);
  };

  const filteredGuesses = searchTerm
    ? guesses.filter(g => g.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    : guesses;

  const selectedGuess = guesses.find(g => g.id === selectedGuessId);

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
              {loading ? (
                <div className="flex-1 flex items-center justify-center text-white/40 text-sm p-4 text-center">
                  Carregando...
                </div>
              ) : filteredGuesses.length > 0 ? (
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
            ) : loading ? null : (
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
