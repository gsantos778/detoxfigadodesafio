import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import beforeAfterImage from "@/assets/before-after.png";
import { ChevronLeft } from "lucide-react";

const WhyItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center relative px-4">
        <button 
          onClick={() => navigate("/symptoms-selection")}
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
          <div className="h-1 bg-primary rounded-full w-4/6"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Card */}
        <div className="w-full max-w-md bg-background border border-border rounded-2xl p-6 shadow-sm">
          {/* Before/After Image */}
          <div className="w-full mb-6">
            <img
              src={beforeAfterImage}
              alt="Antes e depois da desintoxicação"
              className="w-full h-auto rounded-lg"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-foreground text-center mb-4">
            Por que a desintoxicação do fígado funciona
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-center leading-relaxed">
            Seu fígado processa <span className="text-primary font-medium">toxinas</span>, <span className="text-primary font-medium">hormônios</span> e <span className="text-primary font-medium">gordura</span>. Quando ele está lento, todo o seu corpo sente — especialmente a <span className="text-primary font-medium">pele</span>, o <span className="text-primary font-medium">humor</span> e o <span className="text-primary font-medium">metabolismo</span>.
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={() => navigate("/quiz-step-6")}
          className="quiz-button justify-center mt-8 w-full max-w-md"
        >
          Próximo
        </button>
      </main>
    </div>
  );
};

export default WhyItWorks;
