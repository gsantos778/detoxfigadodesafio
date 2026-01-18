import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SleepSelection = () => {
  const navigate = useNavigate();

  const options = [
    "Muito ruim",
    "Inconsistente",
    "Decente",
    "Excelente",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center relative px-4">
        <button 
          onClick={() => navigate("/skin-selection")}
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
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center max-w-md leading-tight mb-8">
          Como você avaliaria a qualidade do seu sono?
        </h1>

        {/* Options */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-between px-6 py-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors text-left"
            >
              <span className="text-foreground">{option}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SleepSelection;
