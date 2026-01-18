import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import { ChevronLeft } from "lucide-react";

const SymptomsSelection = () => {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const symptoms = [
    "Névoa mental",
    "Inchaço",
    "erupções cutâneas",
    "Acordar à noite",
    "Rosto ou olhos inchados",
    "Outro",
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center relative px-4">
        <button 
          onClick={() => navigate("/goal-selection")}
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
          <div className="h-1 bg-primary rounded-full w-3/6"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center max-w-md leading-tight mb-8">
          Quais desses sinais você notou recentemente?
        </h1>

        {/* Symptom Options */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {symptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={() => toggleSymptom(symptom)}
              className="w-full flex items-center justify-between px-6 py-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors text-left"
            >
              <span className="text-foreground">{symptom}</span>
              <div className={`w-5 h-5 border-2 rounded ${
                selectedSymptoms.includes(symptom) 
                  ? 'bg-primary border-primary' 
                  : 'border-muted-foreground'
              }`}>
                {selectedSymptoms.includes(symptom) && (
                  <svg className="w-full h-full text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => navigate("/why-it-works")}
          className="quiz-button justify-center mt-8 w-full max-w-md"
        >
          Próximo
        </button>
      </main>
    </div>
  );
};

export default SymptomsSelection;
