import { MouseEvent } from "react";

interface AppButtonProps {
  content: string;
  type: "button" | "reset" | "submit";
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  variant?: "primary" | "danger";
}

export default function AppButton({ content, type, onClick, variant = "primary" }: AppButtonProps) {
  return (
    <button
      className={variant === "danger" ? "btn-danger" : "btn-primary"}
      type={type}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
