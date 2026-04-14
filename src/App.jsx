import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { AppHeader } from "./components/AppHeader";
import "./App.css";

import Index from "./pages/Index";
import SampleCreate from "./pages/SampleCreate";
import SampleDetail from "./pages/SampleDetail";
import NotFound from "./pages/NotFound";
import SectorCreate from "./pages/SectorCreate";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppHeader />
        <main className="container py-8">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/samples/new" element={<SampleCreate />} />
            <Route path="/samples/:id" element={<SampleDetail  />} />
            <Route path="/samples/sectornew" element={<SectorCreate  />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;