import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/AppHeader";
import SecondP from "./pages/SecondP";
import FirstP from "./pages/FirstP";

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <main className="container py-8">
        <Routes>
          <Route path="/" element={<FirstP />} />
          <Route path="/samples" element={<SecondP />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
