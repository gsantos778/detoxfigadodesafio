import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import beforeAfterImage from "@/assets/before-after.png";
import beforeAfterMaleImage from "@/assets/before-after-male.png";
import QuizHeader from "@/components/QuizHeader";

// Preload images immediately on module load
[beforeAfterImage, beforeAfterMaleImage].forEach((src) => {
  const img = new Image();
  img.src = src;
});

const WhyItWorks = () => {
  const navigate = useNavigate();
  const [userGender, setUserGender] = useState<'male' | 'female'>('female');

  useEffect(() => {
    const storedGender = localStorage.getItem('userGender') as 'male' | 'female' | null;
    if (storedGender) setUserGender(storedGender);
  }, []);

  const heroImage = userGender === 'male' ? beforeAfterMaleImage : beforeAfterImage;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader backRoute="/symptoms-selection" currentStep={4} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Card */}
        <div className="w-full max-w-md bg-background border border-border rounded-2xl p-6 shadow-sm">
          {/* Before/After Image */}
          <div className="w-full mb-6">
            <img
              src={heroImage}
              alt="Antes e depois da desintoxicação"
              className="w-full h-auto rounded-lg"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-6">
            Por que a desintoxicação do fígado funciona
          </h2>

          {/* Description */}
          <p className="text-foreground text-center leading-relaxed text-lg">
            Seu fígado processa <span className="text-primary font-semibold">toxinas</span>, <span className="text-primary font-semibold">hormônios</span> e <span className="text-primary font-semibold">gordura</span>. Quando ele está lento, todo o seu corpo sente — especialmente a <span className="text-primary font-semibold">pele</span>, o <span className="text-primary font-semibold">humor</span> e o <span className="text-primary font-semibold">metabolismo</span>.
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={() => navigate("/energy-selection")}
          className="quiz-button justify-center mt-8 w-full max-w-md"
        >
          Próximo
        </button>
      </main>
    </div>
  );
};

export default WhyItWorks;