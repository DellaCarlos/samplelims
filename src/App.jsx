import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";

import "./App.css";
import AppHeader from "./components/AppHeader";
import SampleHome from "./pages/SampleHome";
import SampleCreate from "./pages/SampleCreate";
import SampleDetail from "./pages/SampleDetail"

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
            <Route path="/samples/:id" element={<SampleDetail />} />
            <Route path="/samples/new" element={<SampleCreate />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
