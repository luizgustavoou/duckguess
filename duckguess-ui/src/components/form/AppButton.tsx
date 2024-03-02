import "./AppButton.css";

interface AppButtonProps {
  content: string;
}
export default function AppButton({ content }: AppButtonProps) {
  return <button className="button">{content}</button>;
}
