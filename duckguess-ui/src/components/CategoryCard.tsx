import { IconType } from "react-icons";

interface CategoryCardProps {
  name: string;
  count: number;
  icon: IconType;
  onClick: () => void;
}

export function CategoryCard({ name, count, icon: Icon, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center p-8 rounded-3xl 
                 bg-white/5 border border-white/10 backdrop-blur-xl 
                 hover:bg-indigo-600/20 hover:border-indigo-500/50 
                 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20"
    >
      <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 mb-4">
        <Icon size={40} />
      </div>
      <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
      <span className="text-sm font-semibold text-white/40 group-hover:text-white/60">
        {count} {count === 1 ? 'adivinhação' : 'adivinhações'}
      </span>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-600/0 to-indigo-600/0 group-hover:from-indigo-600/5 group-hover:to-indigo-600/10 pointer-events-none transition-all duration-300" />
    </button>
  );
}
