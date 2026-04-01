import { IHint } from "../entities/IHint";

interface HintProps {
  hint: IHint;
  numberPoints: number;
  index: number;
}

export default function Clue({ hint, numberPoints, index }: HintProps) {
  const isOdd = index % 2 === 0;
  return (
    <div
      className={`relative flex items-center w-full max-w-xl ${
        isOdd ? "animate-hint-odd" : "animate-hint-even"
      }`}
    >
      {/* Points badge */}
      <div className="absolute -left-5 z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                      bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-900/50 shrink-0">
        {numberPoints}
      </div>

      {/* Hint content */}
      <div className="w-full ml-6 px-5 py-3 rounded-2xl glass border border-white/10
                      text-center text-white text-base font-medium leading-snug">
        {hint.text}
      </div>
    </div>
  );
}
