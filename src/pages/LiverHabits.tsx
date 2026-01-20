import { useNavigate } from "react-router-dom";
import liverHabitsImage from "@/assets/liver-habits.png";
import { Button } from "@/components/ui/button";
import QuizHeader from "@/components/QuizHeader";

// Preload image immediately on module load
const img = new Image();
img.src = liverHabitsImage;

const LiverHabits = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader backRoute="/water-intake-selection" currentStep={14} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-3 sm:px-6 py-8 sm:py-12">
        {/* Card */}
        <div className="w-full max-w-md bg-card rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-8 flex flex-col items-center">
          {/* Image */}
          <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-4 sm:mb-6">
            <img 
              src={liverHabitsImage} 
              alt="Fígado sobrecarregado" 
              className="w-full h-full object-cover"
              loading="eager"
              decoding="sync"
            />
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-bold text-foreground text-center mb-3 sm:mb-4">
            Hábitos diários que sobrecarregam o fígado
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
            O consumo diário de álcool, alimentos processados, maus hábitos alimentares e pouca água fazem com que o fígado tenha dificuldades com a{" "}
            <span className="text-primary font-medium">desintoxicação</span>, a{" "}
            <span className="text-primary font-medium">digestão</span> e a{" "}
            <span className="text-primary font-medium">regulação hormonal</span>.
          </p>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => navigate("/meat-selection")}
          className="w-full max-w-md mt-6 sm:mt-8 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default LiverHabits;