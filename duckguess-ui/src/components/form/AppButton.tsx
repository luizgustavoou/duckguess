import "./AppButton.css";
import { MouseEvent } from "react";

interface AppButtonProps {
  content: string;
  type: "button" | "reset" | "submit";
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

export default function AppButton({ content, type, onClick }: AppButtonProps) {
  return (
    <button className="button" type={type} onClick={onClick}>
      {content}
    </button>
  );
}
