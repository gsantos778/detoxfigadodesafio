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
import EnergySelection from "./pages/EnergySelection";
import WeightGainSelection from "./pages/WeightGainSelection";
import DigestionSelection from "./pages/DigestionSelection";
import SkinSelection from "./pages/SkinSelection";
import SleepSelection from "./pages/SleepSelection";
import BenefitsPage from "./pages/BenefitsPage";
import AlcoholSelection from "./pages/AlcoholSelection";
import ProcessedFoodSelection from "./pages/ProcessedFoodSelection";
import WaterIntakeSelection from "./pages/WaterIntakeSelection";
import LiverHabits from "./pages/LiverHabits";
import MeatSelection from "./pages/MeatSelection";
import IngredientsSelection from "./pages/IngredientsSelection";
import MealPlanBenefits from "./pages/MealPlanBenefits";
import HeightSelection from "./pages/HeightSelection";
import CurrentWeightSelection from "./pages/CurrentWeightSelection";
import DesiredWeightSelection from "./pages/DesiredWeightSelection";
import AgeInputSelection from "./pages/AgeInputSelection";
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
          <Route path="/energy-selection" element={<EnergySelection />} />
          <Route path="/weight-gain-selection" element={<WeightGainSelection />} />
          <Route path="/digestion-selection" element={<DigestionSelection />} />
          <Route path="/skin-selection" element={<SkinSelection />} />
          <Route path="/sleep-selection" element={<SleepSelection />} />
          <Route path="/benefits" element={<BenefitsPage />} />
          <Route path="/alcohol-selection" element={<AlcoholSelection />} />
          <Route path="/processed-food-selection" element={<ProcessedFoodSelection />} />
          <Route path="/water-intake-selection" element={<WaterIntakeSelection />} />
          <Route path="/liver-habits" element={<LiverHabits />} />
          <Route path="/meat-selection" element={<MeatSelection />} />
          <Route path="/ingredients-selection" element={<IngredientsSelection />} />
          <Route path="/meal-plan-benefits" element={<MealPlanBenefits />} />
          <Route path="/height-selection" element={<HeightSelection />} />
          <Route path="/current-weight-selection" element={<CurrentWeightSelection />} />
          <Route path="/desired-weight-selection" element={<DesiredWeightSelection />} />
          <Route path="/age-input-selection" element={<AgeInputSelection />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
