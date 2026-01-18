import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import QuizHeader from "@/components/QuizHeader";

const EnergySelection = () => {
  const navigate = useNavigate();

  const energyLevels = [
    "Exausto o tempo todo",
    "Cansado à tarde",
    "Para cima e para baixo",
    "Firme e forte",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader backRoute="/why-it-works" currentStep={5} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center max-w-md leading-tight mb-8">
          Como você descreveria seu nível de energia atual?
        </h1>

        {/* Energy Level Options */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {energyLevels.map((level) => (
            <button
              key={level}
              onClick={() => navigate("/weight-gain-selection")}
              className="w-full flex items-center justify-between px-6 py-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors text-left"
            >
              <span className="text-foreground">{level}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EnergySelection;