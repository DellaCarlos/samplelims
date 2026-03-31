import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import AppHeader from "./components/AppHeader";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Teste</h1>
      <AppHeader />
      <button
        onClick={() => navigate(`/second`)}
        className="bg-slate-400 p-2 rounded-md text-white"
      >
        Segunda pagina
      </button>
    </div>
  );
}

export default App;
