import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import weightChartImage from "@/assets/weight-chart.png";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

const WeightProjection = () => {
  const navigate = useNavigate();

  const { currentWeight, desiredWeight, targetDate } = useMemo(() => {
    const current = parseInt(localStorage.getItem("currentWeight") || "90");
    const desired = parseInt(localStorage.getItem("desiredWeight") || "75");
    
    // Calculate weeks needed (approx 0.5-1kg per week)
    const weightToLose = current - desired;
    const weeksNeeded = Math.ceil(weightToLose / 0.75);
    
    // Calculate target date
    const today = new Date();
    const target = new Date(today);
    target.setDate(target.getDate() + weeksNeeded * 7);
    
    const months = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    
    const formattedDate = `${target.getDate()} de ${months[target.getMonth()]} de ${target.getFullYear()}`;
    
    return {
      currentWeight: current,
      desiredWeight: desired,
      targetDate: formattedDate
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center relative px-4">
        <button
          onClick={() => navigate("/age-input-selection")}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <img
          src={logoImage}
          alt="Detox Fígado Desafio"
          className="h-20 w-auto"
        />
      </header>

      {/* Progress Bar */}
      <div className="w-full px-4 mt-2">
        <div className="h-1 bg-muted rounded-full max-w-md mx-auto">
          <div className="h-1 bg-primary rounded-full w-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4 max-w-md">
          Com a dieta de desintoxicação do fígado, você atingirá o peso desejado.
        </h1>

        {/* Dynamic Weight Goal */}
        <p className="text-primary font-semibold text-lg mb-8">
          {desiredWeight} kg até {targetDate}
        </p>

        {/* Weight Chart */}
        <div className="w-full max-w-md relative">
          <div className="relative">
            <img
              src={weightChartImage}
              alt="Gráfico de projeção de peso"
              className="w-full h-auto"
            />
            {/* Dynamic weight labels overlay */}
            <div className="absolute top-2 left-4 bg-white/80 px-2 py-1 rounded text-sm font-semibold text-orange-500">
              {currentWeight} kg
            </div>
            <div className="absolute bottom-4 right-4 bg-white/80 px-2 py-1 rounded text-sm font-semibold text-green-500">
              {desiredWeight} kg
            </div>
          </div>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => navigate("/")}
          className="w-full max-w-md mt-8 py-6 text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default WeightProjection;
