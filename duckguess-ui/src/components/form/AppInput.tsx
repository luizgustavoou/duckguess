import "./AppInput.css";

interface AppInputProps {
  type: string;
  placeholder?: string;
}

export default function AppInput({ type, placeholder }: AppInputProps) {
  return (
    <>
      <input type={type} placeholder={placeholder} />
    </>
  );
}
