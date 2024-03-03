import "./App.css";
import { LayoutMain } from "./components/LayoutMain";
import AppButton from "./components/form/AppButton";
import Home from "./views/home/Home";
import SelectPlayers from "./components/SelectPlayers";

export default function App() {
  return <LayoutMain header={<></>} main={<SelectPlayers />} footer={<></>} />;
}
