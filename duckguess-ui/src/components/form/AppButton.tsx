import "./AppButton.css";

interface AppButtonProps {
  content: string;
  type: "button" | "reset" | "submit";
}
export default function AppButton({ content, type }: AppButtonProps) {
  return (
    <button className="button" type={type}>
      {content}
    </button>
  );
}
