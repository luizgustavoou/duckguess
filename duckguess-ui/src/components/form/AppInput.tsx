import { forwardRef } from "react";
import "./AppInput.css";

interface AppInputProps {
  type: string;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ type, placeholder, ...props }, ref) => {
    return <input type={type} placeholder={placeholder} ref={ref} {...props} />;
  }
);
