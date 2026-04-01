import { forwardRef } from "react";

interface AppSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "offset"> {
  options: { id: string; value: string }[];
}

const AppSelect = forwardRef<HTMLSelectElement, AppSelectProps>(
  ({ options, ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          ref={ref}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none"
          {...props}
        >
          <option value="" className="bg-navy-800 text-white">
            Selecione um tema
          </option>
          {options &&
            options.map((element) => (
              <option key={element.id} value={element.id} className="bg-navy-800 text-white">
                {element.value}
              </option>
            ))}
        </select>
      </div>
    );
  }
);

export default AppSelect;
