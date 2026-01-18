import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import weightChartImage from "@/assets/weight-chart.png";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

const WeightProjection = () => {
  const navigate = useNavigate();

  const { currentWeight, desiredWeight, targetDate, motivationalMessage } = useMemo(() => {
    const current = parseInt(localStorage.getItem("currentWeight") || "90");
    const desired = parseInt(localStorage.getItem("desiredWeight") || "75");
    const userAge = parseInt(localStorage.getItem("userAge") || "35");
    
    const weightToLose = current - desired;
    
    // Calcular fator metabólico baseado na idade
    // Pessoas mais jovens tendem a perder peso mais rápido
    let metabolicFactor = 1.0;
    if (userAge < 30) {
      metabolicFactor = 1.2; // 20% mais rápido
    } else if (userAge < 40) {
      metabolicFactor = 1.0; // taxa normal
    } else if (userAge < 50) {
      metabolicFactor = 0.85; // 15% mais lento
    } else {
      metabolicFactor = 0.7; // 30% mais lento
    }
    
    // Taxa base de perda: 0.75kg por semana, ajustada pelo fator metabólico
    const weeklyLossRate = 0.75 * metabolicFactor;
    
    // Calcular dias necessários
    let daysNeeded: number;
    let message: string;
    
    if (weightToLose <= 5) {
      // Até 5kg: cerca de 30 dias
      daysNeeded = Math.ceil(30 / metabolicFactor);
      message = `Você pode perder até 5kg em cerca de 30 dias seguindo a dieta de desintoxicação do fígado.`;
    } else if (weightToLose <= 9) {
      // 6-9kg: 1-2 meses
      const weeksNeeded = Math.ceil(weightToLose / weeklyLossRate);
      daysNeeded = weeksNeeded * 7;
      message = `Você pode perder de 6 a 9kg em cerca de 1 a 2 meses seguindo a dieta de desintoxicação do fígado.`;
    } else {
      // 10kg+: 2-3 meses
      const weeksNeeded = Math.ceil(weightToLose / weeklyLossRate);
      daysNeeded = weeksNeeded * 7;
      message = `Você pode perder de 10 a 18kg em cerca de 2 a 3 meses seguindo a dieta de desintoxicação do fígado.`;
    }
    
    // Calcular data alvo a partir de hoje
    const today = new Date();
    const target = new Date(today);
    target.setDate(target.getDate() + daysNeeded);
    
    const months = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    
    const formattedDate = `${target.getDate()} de ${months[target.getMonth()]} de ${target.getFullYear()}`;
    
    return {
      currentWeight: current,
      desiredWeight: desired,
      targetDate: formattedDate,
      motivationalMessage: message
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

        {/* Motivational Message */}
        <p className="text-muted-foreground text-center text-sm mb-4 max-w-md">
          {motivationalMessage}
        </p>

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
