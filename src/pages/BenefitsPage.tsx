import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import { ChevronLeft } from "lucide-react";
const BenefitsPage = () => {
  const navigate = useNavigate();
  const benefits = ["Gordura reduzida", "Pele mais clara", "Hormônios equilibrados", "Melhor digestão", "Melhora do humor e da energia"];
  return <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center relative px-4">
        <button onClick={() => navigate("/sleep-selection")} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:opacity-70 transition-opacity">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <img src={logoImage} alt="Detox Fígado Desafio" className="h-20 w-auto" />
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
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center max-w-md leading-tight mb-8">Veja o que a desintoxicação do fígado pode melhorar</h1>

        {/* Benefits List */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {benefits.map(benefit => <div key={benefit} className="w-full flex items-center gap-4 px-6 py-4 bg-background border border-border rounded-lg">
              <span className="text-xl flex-shrink-0">✅</span>
              <span className="text-foreground font-medium">{benefit}</span>
            </div>)}
        </div>

        {/* Next Button */}
        <button onClick={() => navigate("/alcohol-selection")} className="mt-8 w-full max-w-md bg-primary text-primary-foreground py-4 px-8 rounded-full font-semibold hover:opacity-90 transition-opacity">
          Próximo
        </button>
      </main>
    </div>;
};
export default BenefitsPage;