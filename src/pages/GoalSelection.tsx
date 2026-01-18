import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import QuizHeader from "@/components/QuizHeader";

const GoalSelection = () => {
  const navigate = useNavigate();

  const goals = [
    "Perder peso",
    "Reduz o inchaço ou o desconforto abdominal.",
    "Aumentar os níveis de energia",
    "Melhora a digestão",
    "Equilibrar os hormônios",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader backRoute="/age-selection" currentStep={2} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center max-w-md leading-tight mb-8">
          Qual é o seu principal objetivo ao fazer uma desintoxicação do fígado?
        </h1>

        {/* Goal Options */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {goals.map((goal) => (
            <button
              key={goal}
              onClick={() => navigate("/symptoms-selection")}
              className="w-full flex items-center justify-between px-6 py-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors text-left"
            >
              <span className="text-foreground">{goal}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GoalSelection;