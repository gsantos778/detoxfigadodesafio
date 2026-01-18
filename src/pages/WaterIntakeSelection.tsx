import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import QuizHeader from "@/components/QuizHeader";

const WaterIntakeSelection = () => {
  const navigate = useNavigate();

  const options = [
    { main: "Apenas café ou chá", sub: null },
    { main: "Menos de 450 ml", sub: "Menos de 2 copos" },
    { main: "450ml - 1350 ml", sub: "2 a 6 copos" },
    { main: "1650 ml - 2350 ml", sub: "7 a 10 copos" },
    { main: "3 litros ou mais", sub: null },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader backRoute="/processed-food-selection" currentStep={13} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center max-w-md leading-tight mb-2">
          Quanta água você bebe por dia?
        </h1>
        
        {/* Subtitle */}
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Referimo-nos à água limpa, excluindo café, chá e outras bebidas.
        </p>

        {/* Options */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => navigate("/liver-habits")}
              className="w-full flex items-center justify-between px-6 py-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors text-left"
            >
              <div className="flex flex-col">
                <span className="text-foreground">{option.main}</span>
                {option.sub && (
                  <span className="text-sm text-muted-foreground">{option.sub}</span>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default WaterIntakeSelection;