import { useNavigate } from "react-router-dom";
import liverHabitsImage from "@/assets/liver-habits.png";
import { Button } from "@/components/ui/button";
import QuizHeader from "@/components/QuizHeader";

const LiverHabits = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader backRoute="/water-intake-selection" currentStep={14} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Card */}
        <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-8 flex flex-col items-center">
          {/* Image */}
          <div className="w-48 h-48 rounded-full overflow-hidden mb-6">
            <img 
              src={liverHabitsImage} 
              alt="Fígado sobrecarregado" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-foreground text-center mb-4">
            Hábitos diários que sobrecarregam o fígado
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-center leading-relaxed">
            O consumo diário de álcool, alimentos processados, maus hábitos alimentares e pouca água fazem com que o fígado tenha dificuldades com a{" "}
            <span className="text-primary font-medium">desintoxicação</span>, a{" "}
            <span className="text-primary font-medium">digestão</span> e a{" "}
            <span className="text-primary font-medium">regulação hormonal</span>.
          </p>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => navigate("/meat-selection")}
          className="w-full max-w-md mt-8 py-6 text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default LiverHabits;