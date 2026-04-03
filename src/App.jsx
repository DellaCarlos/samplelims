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
