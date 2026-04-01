import { forwardRef } from "react";

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
        className="input-field"
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  }
);
