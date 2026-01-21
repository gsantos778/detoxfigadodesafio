import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ageOptionsImage from "@/assets/age-options.png";
import homem1829 from "@/assets/homem-18-29.png";
import homem3039 from "@/assets/homem-30-39.png";
import homem4049 from "@/assets/homem-40-49.png";
import homem50 from "@/assets/homem-50.png";
import QuizHeader from "@/components/QuizHeader";

// Preload images immediately on module load
[ageOptionsImage, homem1829, homem3039, homem4049, homem50].forEach(src => {
  const img = new Image();
  img.src = src;
});

const AgeSelection = () => {
  const navigate = useNavigate();
  const [userGender, setUserGender] = useState<'male' | 'female'>('female');

  useEffect(() => {
    const storedGender = localStorage.getItem('userGender') as 'male' | 'female' | null;
    if (storedGender) {
      setUserGender(storedGender);
    }
  }, []);

  const ageGroups = [
    { label: "18-29", maleImage: homem1829 },
    { label: "30-39", maleImage: homem3039 },
    { label: "40-49", maleImage: homem4049 },
    { label: "50+", maleImage: homem50 },
  ];

  // Female version - single image with overlay buttons
  if (userGender === 'female') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <QuizHeader backRoute="/" currentStep={1} />

        <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center max-w-2xl leading-tight mb-2">
            desafio de desintoxicação do fígado
          </h1>

          <p className="text-muted-foreground text-center mb-6">
            De acordo com sua idade e IMC.
          </p>

          <p className="text-primary text-center mb-8 text-sm font-semibold uppercase tracking-wide">
            Teste de <span className="text-secondary">1 minuto</span>
          </p>

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
              
              <div className="absolute -bottom-6 md:-bottom-8 left-0 right-0 grid grid-cols-4 gap-0.5 md:gap-2 px-1">
                {ageGroups.map((age, index) => (
                  <button
                    key={age.label}
                    onClick={() => navigate("/goal-selection")}
                    className={`quiz-button justify-center py-2 md:py-3 text-sm md:text-base px-2 md:px-4 ${
                      index === 0 ? '-translate-x-1 md:-translate-x-3' : index === 2 ? 'translate-x-0.5 md:translate-x-1' : index === 3 ? 'translate-x-1 md:translate-x-3' : ''
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
  }

  // Male version - grid of individual images
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader backRoute="/" currentStep={1} />

      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center max-w-2xl leading-tight mb-2">
          desafio de desintoxicação do fígado
        </h1>

        <p className="text-muted-foreground text-center mb-6">
          De acordo com sua idade e IMC.
        </p>

        <p className="text-primary text-center mb-8 text-sm font-semibold uppercase tracking-wide">
          Teste de <span className="text-secondary">1 minuto</span>
        </p>

        <div className="w-full max-w-4xl px-2 sm:px-0">
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {ageGroups.map((age) => (
              <button
                key={age.label}
                onClick={() => navigate("/goal-selection")}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={age.maleImage}
                    alt={`Homem ${age.label} anos`}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="eager"
                    decoding="sync"
                  />
                </div>
                <span className="quiz-button justify-center py-2 md:py-3 text-sm md:text-base px-3 md:px-6 w-full">
                  {age.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgeSelection;
