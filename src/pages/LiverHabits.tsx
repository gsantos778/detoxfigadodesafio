import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import liverHabitsImage from "@/assets/liver-habits.png";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const LiverHabits = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center relative px-4">
        <button 
          onClick={() => navigate("/water-intake-selection")}
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
          <div className="h-1 bg-primary rounded-full w-full"></div>
        </div>
      </div>

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
