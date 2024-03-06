import { forwardRef } from "react";
import "./AppInput.css";

interface AppInputProps {
  type: string;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
  value?: string;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ type, placeholder, value, handleOnChange, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  }
);
