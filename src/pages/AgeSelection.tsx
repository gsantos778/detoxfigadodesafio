import { useNavigate } from "react-router-dom";
import ageOptionsImage from "@/assets/age-options.png";
import QuizHeader from "@/components/QuizHeader";

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
      <QuizHeader backRoute="/" currentStep={1} />

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
        <div className="w-full max-w-4xl px-2 sm:px-0">
          <div className="relative">
            <img
              src={ageOptionsImage}
              alt="Selecione sua faixa etária"
              className="w-full h-auto"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
            
            {/* Age Buttons positioned over each woman */}
            <div className="absolute -bottom-6 sm:-bottom-8 left-0 right-0 grid grid-cols-4 gap-0.5 sm:gap-1 px-1">
              {ageGroups.map((age, index) => (
                <button
                  key={age.label}
                  onClick={() => navigate("/goal-selection")}
                  className={`quiz-button justify-center py-1.5 sm:py-2 text-xs sm:text-sm px-2 sm:px-4 ${
                    index === 0 ? '-translate-x-1 sm:-translate-x-3' : index === 2 ? 'translate-x-0.5 sm:translate-x-1' : index === 3 ? 'translate-x-1 sm:translate-x-3' : ''
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