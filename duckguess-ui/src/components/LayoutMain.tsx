import { ReactNode } from "react";

interface LayoutMainProps {
  header: ReactNode;
  main: ReactNode;
  footer: ReactNode;
}

export function LayoutMain({ header, main, footer }: LayoutMainProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-game-gradient">
      <div className="flex-grow w-full min-h-[60px]">{header}</div>
      <div className="w-full flex justify-center text-white">{main}</div>
      <div className="flex-grow w-full min-h-[60px] flex flex-col gap-4">{footer}</div>
    </div>
  );
}
