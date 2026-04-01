import { ReactElement } from "react";

interface GameProps {
  children: ReactElement;
}

export default function Game({ children }: GameProps) {
  return (
    <div className="w-full max-w-4xl mx-auto my-6 rounded-3xl glass-dark
                    shadow-2xl shadow-black/60 overflow-auto min-h-[560px]
                    flex items-center justify-center animate-fade-in-up">
      {children}
    </div>
  );
}
