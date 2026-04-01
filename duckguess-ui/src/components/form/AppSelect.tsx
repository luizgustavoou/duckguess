interface AppSelectProps {
  content: string[];
}

export default function AppSelect({ content }: AppSelectProps) {
  return (
    <div className="w-full">
      <select className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none">
        {content &&
          content.map((element) => (
            <option key={element} value={element} className="bg-navy-800 text-white">
              {element}
            </option>
          ))}
      </select>
    </div>
  );
}
