import { useNavigate } from "react-router-dom";
import QuizHeader from "@/components/QuizHeader";

const BenefitsPage = () => {
  const navigate = useNavigate();
  const benefits = ["Gordura reduzida", "Pele mais clara", "Hormônios equilibrados", "Melhor digestão", "Melhora do humor e da energia"];
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader backRoute="/sleep-selection" currentStep={10} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center max-w-md leading-tight mb-8">
          Veja o que a desintoxicação do fígado pode melhorar
        </h1>

        {/* Benefits List */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {benefits.map(benefit => (
            <div key={benefit} className="w-full flex items-center gap-4 px-6 py-4 bg-background border border-border rounded-lg">
              <span className="text-xl flex-shrink-0">✅</span>
              <span className="text-foreground font-medium">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button 
          onClick={() => navigate("/alcohol-selection")} 
          className="mt-8 w-full max-w-md bg-primary text-primary-foreground py-4 px-8 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Próximo
        </button>
      </main>
    </div>
  );
};

export default BenefitsPage;