import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";

import "./App.css";
import AppHeader from "./components/AppHeader";
import FirstP from "./pages/FirstP";
import SampleHome from "./pages/SampleHome";
import SampleCreate from "./pages/SampleCreate";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Sonner />
      <Toaster />
      <BrowserRouter>
        <AppHeader />
        <main className="container py-8">
          <Routes>
            <Route path="/" element={<SampleHome />} />
            <Route path="/samples" element={<FirstP />} />
            <Route path="/samples/new" element={<SampleCreate />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
