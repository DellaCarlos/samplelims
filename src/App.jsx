import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/AppHeader";
import SecondP from "./pages/SecondP";
import FirstP from "./pages/FirstP";
import SampleHome from "./pages/SampleHome";

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <main className="container py-8">
        <Routes>
          <Route path="/" element={<SampleHome />} />
          <Route path="/samples" element={<FirstP />} />
          <Route path="/samples/new" element={<SecondP />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
