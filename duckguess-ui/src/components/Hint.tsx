import { IHint } from "../entities/IHint";
import "./Hint.css";
interface HintProps {
  hint: IHint;
  numberPoints: number;
}
export default function Clue({ hint, numberPoints }: HintProps) {
  return (
    <div className="hint">
      <div className="circle">{numberPoints}</div>
      <div className="body">
        <h2>{hint.text}</h2>
      </div>
    </div>
  );
}
