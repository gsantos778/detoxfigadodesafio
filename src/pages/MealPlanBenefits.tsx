import { useNavigate } from "react-router-dom";
import mealBowlImage from "@/assets/meal-bowl.jpg";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import QuizHeader from "@/components/QuizHeader";

const MealPlanBenefits = () => {
  const navigate = useNavigate();

  const benefits = [
    "Apoie a perda de peso saudável",
    "Reduzir a inflamação",
    "Melhora a digestão",
    "Elimina a fadiga e o cansaço",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader backRoute="/ingredients-selection" currentStep={17} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-3 sm:px-6 py-6 sm:py-8">
        {/* Card */}
        <div className="bg-background rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-8 max-w-md w-full flex flex-col items-center">
          {/* Meal Image */}
          <div className="mb-4 sm:mb-6">
            <img
              src={mealBowlImage}
              alt="Prato saudável"
              className="w-36 h-36 sm:w-48 sm:h-48 object-cover rounded-full"
              loading="eager"
              decoding="sync"
            />
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-center mb-3 sm:mb-4">
            Alimente-se bem, sinta-se leve.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-muted-foreground text-center mb-3 sm:mb-4">
            Planos de refeições personalizados para desintoxicação do fígado:
          </p>

          {/* Benefits List */}
          <ul className="w-full space-y-1.5 sm:space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary-foreground" />
                </div>
                <span className="text-sm sm:text-base text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => navigate("/height-selection")}
          className="w-full max-w-md mt-6 sm:mt-8 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default MealPlanBenefits;