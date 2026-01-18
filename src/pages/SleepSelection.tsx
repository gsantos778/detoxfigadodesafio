import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import QuizHeader from "@/components/QuizHeader";

const SleepSelection = () => {
  const navigate = useNavigate();

  const options = [
    "Muito ruim",
    "Inconsistente, acordando muito",
    "Bom, mas poderia ser melhor",
    "Excelente",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader backRoute="/skin-selection" currentStep={9} />

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
              onClick={() => navigate("/benefits")}
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