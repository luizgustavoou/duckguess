import "./App.css";
import { LayoutMain } from "./components/LayoutMain";
import AppButton from "./components/form/AppButton";
import Home from "./components/pages/Home";
import SelectPlayers from "./components/pages/SelectPlayers";

export default function App() {
  return <LayoutMain header={<></>} main={<SelectPlayers />} footer={<></>} />;
}
