import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import ageOptionsImage from "@/assets/age-options.png";
import { ChevronLeft } from "lucide-react";

const AgeSelection = () => {
  const navigate = useNavigate();

  const ageGroups = [
    { label: "18-29", position: "left-0" },
    { label: "30-39", position: "left-1/4" },
    { label: "40-49", position: "left-2/4" },
    { label: "50+", position: "left-3/4" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center relative px-4">
        <button 
          onClick={() => navigate("/")}
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
          <div className="h-1 bg-primary rounded-full w-1/6"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center max-w-2xl leading-tight mb-2">
          desafio de desintoxicação do fígado
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-center mb-6">
          De acordo com sua idade e IMC.
        </p>

        {/* Test Duration Label */}
        <p className="text-primary text-center mb-8 text-sm font-semibold uppercase tracking-wide">
          Teste de <span className="text-secondary">1 minuto</span>
        </p>

        {/* Age Selection Grid */}
        <div className="w-full max-w-4xl">
          <div className="relative">
            <img
              src={ageOptionsImage}
              alt="Selecione sua faixa etária"
              className="w-full h-auto"
            />
            
            {/* Age Buttons positioned over each woman */}
            <div className="absolute -bottom-8 left-0 right-0 grid grid-cols-4">
              {ageGroups.map((age, index) => (
                <button
                  key={age.label}
                  onClick={() => navigate("/quiz-step-3")}
                  className={`quiz-button justify-center py-2 text-sm mx-1 ${
                    index === 3 ? 'translate-x-1' : ''
                  }`}
                >
                  {age.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgeSelection;
