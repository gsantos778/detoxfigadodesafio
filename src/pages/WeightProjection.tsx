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
    
    const weightToLose = current - desired;
    
    // Calcular dias e mensagem baseado na faixa de peso a perder
    let daysNeeded: number;
    let message: string;
    
    if (weightToLose <= 10) {
      // Até 10kg: 30 dias (1 mês)
      daysNeeded = 30;
      message = `Você pode perder até 10kg em cerca de 30 dias seguindo a dieta de desintoxicação do fígado.`;
    } else if (weightToLose <= 17) {
      // 11-17kg: 2 meses (60 dias)
      daysNeeded = 60;
      message = `Você pode perder de 11 a 17kg em cerca de 2 meses seguindo a dieta de desintoxicação do fígado.`;
    } else if (weightToLose <= 25) {
      // 18-25kg: 3 meses (90 dias)
      daysNeeded = 90;
      message = `Você pode perder de 18 a 25kg em cerca de 3 meses seguindo a dieta de desintoxicação do fígado.`;
    } else if (weightToLose <= 33) {
      // 26-33kg: 4 meses (120 dias)
      daysNeeded = 120;
      message = `Você pode perder de 26 a 33kg em cerca de 4 meses seguindo a dieta de desintoxicação do fígado.`;
    } else if (weightToLose <= 41) {
      // 34-41kg: 5 meses (150 dias)
      daysNeeded = 150;
      message = `Você pode perder de 34 a 41kg em cerca de 5 meses seguindo a dieta de desintoxicação do fígado.`;
    } else {
      // 42kg+: 6 meses (180 dias)
      daysNeeded = 180;
      message = `Você pode perder mais de 41kg em cerca de 6 meses seguindo a dieta de desintoxicação do fígado.`;
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
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8 max-w-md">
          Com a dieta de desintoxicação do fígado, você atingirá o peso desejado.
        </h1>

        {/* Dynamic Weight Goal */}
        <p className="text-primary font-semibold text-lg mb-8">
          {desiredWeight} kg até {targetDate}
        </p>

        {/* Weight Chart */}
        <div className="w-full max-w-md relative animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <div className="relative">
            <img
              src={weightChartImage}
              alt="Gráfico de projeção de peso"
              className="w-full h-auto animate-scale-in"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            />
            {/* Dynamic weight labels overlay */}
            <div 
              className="absolute top-2 left-4 bg-white/80 px-2 py-1 rounded text-sm font-semibold text-orange-500 animate-fade-in"
              style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
            >
              {currentWeight} kg
            </div>
            <div 
              className="absolute bottom-4 right-4 bg-white/80 px-2 py-1 rounded text-sm font-semibold text-green-500 animate-fade-in"
              style={{ animationDelay: '0.9s', animationFillMode: 'both' }}
            >
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
