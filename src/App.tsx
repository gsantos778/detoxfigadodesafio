import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AgeSelection from "./pages/AgeSelection";
import GoalSelection from "./pages/GoalSelection";
import SymptomsSelection from "./pages/SymptomsSelection";
import WhyItWorks from "./pages/WhyItWorks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/age-selection" element={<AgeSelection />} />
          <Route path="/goal-selection" element={<GoalSelection />} />
          <Route path="/symptoms-selection" element={<SymptomsSelection />} />
          <Route path="/why-it-works" element={<WhyItWorks />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
