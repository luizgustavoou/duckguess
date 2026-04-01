import Game from "../game/Game";
import { useState, useEffect, useCallback } from "react";
import FormRegisterGuess from "../form-register-guess/FormRegisterGuess";
import { HiPlus, HiSearch, HiOutlineTrash, HiOutlinePencil, HiOutlineCheck, HiOutlineX, HiOutlinePlus } from "react-icons/hi";
import { guessService, hintService } from "../../services";
import { IGuess } from "../../entities/IGuess";

export default function RegisterGuess() {
  const [guesses, setGuesses] = useState<IGuess[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuessId, setSelectedGuessId] = useState<string | null>(null);

  // Hint editing states
  const [editingHintId, setEditingHintId] = useState<string | null>(null);
  const [editingHintText, setEditingHintText] = useState("");
  const [isAddingHint, setIsAddingHint] = useState(false);
  const [newHintText, setNewHintText] = useState("");

  const fetchGuesses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await guessService.getAll();
      setGuesses(data);
      if (data.length > 0 && !selectedGuessId) {
        setSelectedGuessId(data[0].id);
      }
    } catch (error) {
      console.error("Erro ao carregar adivinhações:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedGuessId]);

  useEffect(() => {
    fetchGuesses();
  }, [fetchGuesses]);

  const handleAddNew = () => {
    setSelectedGuessId(null);
    setIsCreating(true);
  };

  const handleDeleteGuess = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover esta adivinhação? Todas as dicas associadas serão excluídas.")) return;
    try {
      await guessService.delete(id);
      setGuesses(prev => prev.filter(g => g.id !== id));
      if (selectedGuessId === id) {
        setSelectedGuessId(null);
      }
    } catch (error) {
      console.error("Erro ao remover adivinhação:", error);
      alert("Erro ao remover adivinhação.");
    }
  };

  const handleStartEditHint = (id: string, text: string) => {
    setEditingHintId(id);
    setEditingHintText(text);
  };

  const handleSaveHintEdit = async (hintId: string) => {
    if (!editingHintText.trim()) return;
    try {
      await hintService.update(hintId, editingHintText);
      setGuesses(prev => prev.map(g => ({
        ...g,
        hints: g.hints.map(h => h.id === hintId ? { ...h, text: editingHintText } : h)
      })));
      setEditingHintId(null);
    } catch (error) {
      console.error("Erro ao editar dica:", error);
      alert("Erro ao editar dica.");
    }
  };

  const handleDeleteHint = async (hintId: string) => {
    const guess = guesses.find(g => g.id === selectedGuessId);
    if (guess && guess.hints.length <= 3) {
      alert("Uma adivinhação deve ter no mínimo 3 dicas.");
      return;
    }

    if (!confirm("Deseja remover esta dica?")) return;
    try {
      await hintService.delete(hintId);
      setGuesses(prev => prev.map(g => ({
        ...g,
        hints: g.hints.filter(h => h.id !== hintId)
      })));
    } catch (error) {
      console.error("Erro ao remover dica:", error);
      alert("Erro ao remover dica.");
    }
  };

  const handleAddHint = async () => {
    if (!newHintText.trim() || !selectedGuessId) return;
    try {
      const newHint = await hintService.create(newHintText, selectedGuessId);
      setGuesses(prev => prev.map(g => g.id === selectedGuessId ? {
        ...g,
        hints: [...g.hints, newHint]
      } : g));
      setNewHintText("");
      setIsAddingHint(false);
    } catch (error) {
      console.error("Erro ao adicionar dica:", error);
      alert("Erro ao adicionar dica.");
    }
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
                      setEditingHintId(null);
                      setIsAddingHint(false);
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
                <FormRegisterGuess
                  handleClose={() => setIsCreating(false)}
                  onSuccess={() => {
                    fetchGuesses();
                    setIsCreating(false);
                  }}
                />
              </div>
            ) : selectedGuess ? (
              <>
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="p-6 border-b border-white/5 bg-black/10 flex justify-between items-start relative z-10">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedGuess.answer}</h2>
                    <p className="text-white/50 text-sm">Gerencie as dicas desta adivinhação</p>
                  </div>
                  <button
                    onClick={() => handleDeleteGuess(selectedGuess.id)}
                    className="p-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-all border border-red-500/20"
                    title="Excluir adivinhação"
                  >
                    <HiOutlineTrash size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 relative z-10 flex flex-col gap-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">Dicas Cadastradas</h3>
                    {!isAddingHint && selectedGuess.hints.length < 10 && (
                      <button
                        onClick={() => setIsAddingHint(true)}
                        className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        <HiOutlinePlus size={16} /> Adicionar Dica
                      </button>
                    )}
                  </div>

                  {isAddingHint && (
                    <div className="flex gap-2 p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 mb-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <input
                        autoFocus
                        value={newHintText}
                        onChange={(e) => setNewHintText(e.target.value)}
                        placeholder="Digite a nova dica..."
                        className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddHint()}
                      />
                      <div className="flex gap-1">
                        <button
                          onClick={handleAddHint}
                          className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-400 transition-colors"
                        >
                          <HiOutlineCheck size={18} />
                        </button>
                        <button
                          onClick={() => { setIsAddingHint(false); setNewHintText(""); }}
                          className="p-2 bg-white/10 text-white/50 rounded-lg hover:bg-white/20 transition-colors"
                        >
                          <HiOutlineX size={18} />
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedGuess.hints.map((hint, i) => (
                    <div
                      key={hint.id}
                      className="group flex items-start bg-black/20 rounded-xl p-4 text-sm text-white/80
                                 border border-white/5 hover:border-white/10 transition-all"
                    >
                      <span className="flex items-center justify-center min-w-[28px] h-[28px] bg-indigo-500/20 rounded-full text-indigo-400 font-bold text-sm mr-4 mt-0.5">
                        {i + 1}
                      </span>

                      {editingHintId === hint.id ? (
                        <div className="flex-1 flex gap-2">
                          <input
                            autoFocus
                            value={editingHintText}
                            onChange={(e) => setEditingHintText(e.target.value)}
                            className="flex-1 bg-black/40 border border-indigo-500/30 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveHintEdit(hint.id)}
                          />
                          <button
                            onClick={() => handleSaveHintEdit(hint.id)}
                            className="p-1.5 text-green-400 hover:bg-green-400/10 rounded-md transition-colors"
                          >
                            <HiOutlineCheck size={18} />
                          </button>
                          <button
                            onClick={() => setEditingHintId(null)}
                            className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                          >
                            <HiOutlineX size={18} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="flex-1 leading-relaxed text-base pt-0.5">{hint.text}</span>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                            <button
                              onClick={() => handleStartEditHint(hint.id, hint.text)}
                              className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                              title="Editar dica"
                            >
                              <HiOutlinePencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteHint(hint.id)}
                              className="p-2 text-red-500/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                              title="Remover dica"
                            >
                              <HiOutlineTrash size={16} />
                            </button>
                          </div>
                        </>
                      )}
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
