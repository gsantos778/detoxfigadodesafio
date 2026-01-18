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
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Card */}
        <div className="bg-background rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
          {/* Meal Image */}
          <div className="mb-6">
            <img
              src={mealBowlImage}
              alt="Prato saudável"
              className="w-48 h-48 object-cover rounded-full"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Alimente-se bem, sinta-se leve.
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-center mb-4">
            Planos de refeições personalizados para desintoxicação do fígado:
          </p>

          {/* Benefits List */}
          <ul className="w-full space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
                <span className="text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => navigate("/height-selection")}
          className="w-full max-w-md mt-8 py-6 text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default MealPlanBenefits;