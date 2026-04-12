
import { useState, useEffect, useCallback, useMemo } from "react";
import FormRegisterGuess from "../form-register-guess/FormRegisterGuess";
import FormRegisterTheme from "../form-register-theme/FormRegisterTheme";
import {
  HiPlus, HiSearch, HiOutlineTrash, HiOutlinePencil, HiOutlineCheck,
  HiOutlineX, HiOutlinePlus, HiChevronLeft, HiLibrary,
  HiGlobeAlt, HiBeaker, HiChip, HiLightBulb
} from "react-icons/hi";
import { guessService, hintService, themeService } from "../../services";
import { IGuess } from "../../entities/IGuess";
import { ITheme } from "../../entities/ITheme";
import { CategoryCard } from "../../components/CategoryCard";

// Mock icon mapping
const getThemeIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("tecnologia")) return HiChip;
  if (lower.includes("biologia") || lower.includes("animais")) return HiBeaker;
  if (lower.includes("história") || lower.includes("mundo")) return HiGlobeAlt;
  if (lower.includes("cultura") || lower.includes("geral")) return HiLibrary;
  return HiLightBulb;
};

export default function RegisterGuess() {
  const [guesses, setGuesses] = useState<IGuess[]>([]);
  const [themes, setThemes] = useState<ITheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingTheme, setIsCreatingTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuessId, setSelectedGuessId] = useState<string | null>(null);

  // Navigation states
  const [activeView, setActiveView] = useState<'categories' | 'guesses'>('categories');
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);

  // Hint editing states
  const [editingHintId, setEditingHintId] = useState<string | null>(null);
  const [editingHintText, setEditingHintText] = useState("");
  const [isAddingHint, setIsAddingHint] = useState(false);
  const [newHintText, setNewHintText] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const themesData = await themeService.getAllThemes();

      const allGuesses: IGuess[] = themesData.flatMap(t => {
        if (!t.guesses) return [];
        return t.guesses.map(g => ({ ...g, theme: t }));
      });

      setGuesses(allGuesses);
      setThemes(themesData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectTheme = (themeId: string) => {
    setSelectedThemeId(themeId);
    setActiveView('guesses');
    setSelectedGuessId(null);
  };

  const handleGoBack = () => {
    setActiveView('categories');
    setSelectedThemeId(null);
    setSelectedGuessId(null);
    setSearchTerm("");
  };

  const handleAddNew = () => {
    setIsCreating(true);
  };

  const handleCreateTheme = () => {
    setIsCreatingTheme(true);
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

  // Group guesses by theme for categories view
  const themesWithStats = useMemo(() => {
    return themes.map(theme => ({
      ...theme,
      guessCount: guesses.filter(g => g.theme?.id === theme.id).length
    }));
  }, [themes, guesses]);

  const filteredGuesses = useMemo(() => {
    let result = guesses;
    if (selectedThemeId) {
      result = result.filter(g => g.theme?.id === selectedThemeId);
    }
    if (searchTerm) {
      result = result.filter(g => g.answer.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return result;
  }, [guesses, selectedThemeId, searchTerm]);

  const selectedTheme = themes.find(t => t.id === selectedThemeId);
  const selectedGuess = guesses.find(g => g.id === selectedGuessId);

  return (
    <div className="min-h-screen bg-game-gradient px-6 md:px-12 lg:px-16 py-10">
      <div className="flex flex-col items-start gap-8 w-full max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between w-full pb-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            {activeView === 'guesses' && (
              <button
                onClick={handleGoBack}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/5 hover:border-white/10"
              >
                <HiChevronLeft size={24} />
              </button>
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {activeView === 'categories' ? 'Adivinhações' : selectedTheme?.value}
              </h1>
              <p className="text-white/40 text-sm mt-1">
                {activeView === 'categories'
                  ? 'Escolha um tema para gerenciar os itens'
                  : `Gerencie as adivinhações do tema ${selectedTheme?.value}`
                }
              </p>
            </div>
          </div>

          <button
            onClick={activeView === 'categories' ? handleCreateTheme : handleAddNew}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500
                       text-white text-sm font-bold transition-all duration-200 active:scale-95
                       shadow-xl shadow-indigo-900/40 relative z-10"
          >
            <HiPlus size={20} /> {activeView === 'categories' ? 'Novo Tema' : 'Novo Registro'}
          </button>
        </div>

        {/* View Switch */}
        {loading ? (
          <div className="w-full h-[50vh] flex items-center justify-center text-white/40 font-medium">
            Carregando sua coleção...
          </div>
        ) : activeView === 'categories' ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {themesWithStats.map(theme => (
              <CategoryCard
                key={theme.id}
                name={theme.value}
                count={theme.guessCount}
                icon={getThemeIcon(theme.value)}
                onClick={() => handleSelectTheme(theme.id)}
              />
            ))}

            {/* Create Theme "Card" */}
            <button
              onClick={handleCreateTheme}
              className="flex flex-col items-center justify-center p-8 rounded-3xl 
                         bg-white/5 border-2 border-dashed border-white/10 text-white/20
                         hover:bg-white/10 hover:border-indigo-500/50 hover:text-indigo-400
                         transition-all duration-300 group"
            >
              <HiPlus size={40} className="mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm">Adicionar Tema</span>
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col lg:flex-row gap-6 flex-1 min-h-[600px] max-h-[calc(100vh-180px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Split List View */}
            <div className="w-full lg:w-1/3 flex flex-col bg-navy-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-white/5 bg-white/5">
                <div className="relative">
                  <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="text"
                    placeholder="Filtrar por nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-2">
                {filteredGuesses.length > 0 ? (
                  filteredGuesses.map((guess) => (
                    <button
                      key={guess.id}
                      onClick={() => {
                        setEditingHintId(null);
                        setIsAddingHint(false);
                        setSelectedGuessId(guess.id);
                      }}
                      className={`w-full text-left px-5 py-4 rounded-2xl transition-all flex items-center justify-between group
                        ${selectedGuessId === guess.id
                          ? 'bg-indigo-600/90 shadow-lg shadow-indigo-900/40 text-white'
                          : 'hover:bg-white/10 text-white/50 hover:text-white border border-transparent hover:border-white/5'
                        }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-sm leading-tight">{guess.answer}</span>
                        <span className={`text-[10px] mt-0.5 font-medium opacity-60`}>
                          ID: {guess.id.slice(0, 8)}
                        </span>
                      </div>
                      <span className={`text-xs px-2.5 py-1.5 rounded-lg font-black tracking-tighter transition-all
                        ${selectedGuessId === guess.id
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/30 group-hover:bg-indigo-500/20 group-hover:text-indigo-300'
                        }`}
                      >
                        {guess.hints.length} DICAS
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-white/20 text-xs p-8 text-center italic">
                    <HiSearch size={32} className="mb-2 opacity-50" />
                    Nenhuma adivinhação encontrada para este tema.
                  </div>
                )}
              </div>
            </div>

            {/* Hint Details Panel */}
            <div className="w-full lg:w-2/3 flex flex-col bg-navy-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
              {selectedGuess ? (
                <>
                  <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-400 font-bold rounded-full border border-indigo-500/30">ATIVO</span>
                        <h2 className="text-3xl font-black text-white">{selectedGuess.answer}</h2>
                      </div>
                      <p className="text-white/30 text-sm font-medium">Cadastre e edite as pistas desta resposta</p>
                    </div>
                    <button
                      onClick={() => handleDeleteGuess(selectedGuess.id)}
                      className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all border border-red-500/20 group shadow-lg"
                      title="Excluir adivinhação"
                    >
                      <HiOutlineTrash size={22} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar p-8 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-black text-white/20 uppercase tracking-[0.2em]">Pistas Sequenciais</h3>
                      {!isAddingHint && selectedGuess.hints.length < 10 && (
                        <button
                          onClick={() => setIsAddingHint(true)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white font-bold text-xs transition-all border border-indigo-500/20"
                        >
                          <HiOutlinePlus size={16} /> ADICIONAR NOVA DICA
                        </button>
                      )}
                    </div>

                    {isAddingHint && (
                      <div className="flex gap-3 p-5 bg-indigo-500/5 rounded-2xl border border-indigo-500/20 mb-2 animate-in fade-in slide-in-from-top-4 duration-300">
                        <input
                          autoFocus
                          value={newHintText}
                          onChange={(e) => setNewHintText(e.target.value)}
                          placeholder="Escreva uma dica matadora..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                          onKeyDown={(e) => e.key === 'Enter' && handleAddHint()}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleAddHint}
                            className="px-4 bg-indigo-500 text-white rounded-xl hover:bg-indigo-400 transition-colors shadow-lg font-bold text-sm"
                          >
                            SALVAR
                          </button>
                          <button
                            onClick={() => { setIsAddingHint(false); setNewHintText(""); }}
                            className="p-3 bg-white/5 text-white/40 rounded-xl hover:bg-white/10 transition-colors"
                          >
                            <HiOutlineX size={20} />
                          </button>
                        </div>
                      </div>
                    )}

                    {selectedGuess.hints.map((hint, i) => (
                      <div
                        key={hint.id}
                        className="group flex items-start bg-white/2 rounded-2xl p-5 text-sm 
                                    border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-300"
                      >
                        <span className="flex items-center justify-center min-w-[32px] h-[32px] bg-indigo-500/20 rounded-xl text-indigo-400 font-black text-xs mr-5 mt-0.5 border border-indigo-500/10 group-hover:scale-110 transition-transform">
                          {i + 1}
                        </span>

                        {editingHintId === hint.id ? (
                          <div className="flex-1 flex gap-3">
                            <input
                              autoFocus
                              value={editingHintText}
                              onChange={(e) => setEditingHintText(e.target.value)}
                              className="flex-1 bg-black/40 border border-indigo-500/30 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                              onKeyDown={(e) => e.key === 'Enter' && handleSaveHintEdit(hint.id)}
                            />
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleSaveHintEdit(hint.id)}
                                className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg transition-all"
                              >
                                <HiOutlineCheck size={20} />
                              </button>
                              <button
                                onClick={() => setEditingHintId(null)}
                                className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-all"
                              >
                                <HiOutlineX size={20} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <span className="flex-1 leading-relaxed text-lg font-medium text-white/80 pt-0.5">{hint.text}</span>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                              <button
                                onClick={() => handleStartEditHint(hint.id, hint.text)}
                                className="p-2.5 text-white/20 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                title="Editar dica"
                              >
                                <HiOutlinePencil size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteHint(hint.id)}
                                className="p-2.5 text-red-500/20 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                                title="Remover dica"
                              >
                                <HiOutlineTrash size={18} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-white/10 text-center p-12">
                  <div className="w-24 h-24 bg-white/2 rounded-full flex items-center justify-center mb-6 border border-white/5">
                    <HiLightBulb size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-white/40 mb-2">Selecione uma adivinhação</h3>
                  <p className="max-w-[280px] text-sm font-medium leading-relaxed">
                    Escolha um item da lista ao lado para visualizar e gerenciar suas pistas específicas.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal for adding new GUESS */}
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <FormRegisterGuess
              handleClose={() => setIsCreating(false)}
              initialThemeId={selectedThemeId || undefined}
              onSuccess={() => {
                fetchData();
                setIsCreating(false);
              }}
            />
          </div>
        )}

        {/* Modal for adding new THEME */}
        {isCreatingTheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <FormRegisterTheme
              handleClose={() => setIsCreatingTheme(false)}
              onSuccess={() => {
                fetchData();
                setIsCreatingTheme(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
