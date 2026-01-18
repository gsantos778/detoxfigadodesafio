import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WaterIntakeSelection = () => {
  const navigate = useNavigate();

  const options = [
    { main: "Apenas café ou chá", sub: null },
    { main: "Menos de 450 g", sub: "Menos de 2 copos" },
    { main: "16 oz - 48 oz", sub: "2 a 6 copos" },
    { main: "56 oz - 80 oz", sub: "7 a 10 copos" },
    { main: "Não conte", sub: null },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center relative px-4">
        <button 
          onClick={() => navigate("/processed-food-selection")}
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
              onClick={() => navigate("/")}
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
