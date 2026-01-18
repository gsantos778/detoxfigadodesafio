import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import logoImage from "@/assets/logo.png";

interface QuizHeaderProps {
  backRoute?: string;
  currentStep?: number;
  totalSteps?: number;
  showProgress?: boolean;
}

// Total de 23 steps no quiz (AgeSelection até PersonalSummary)
const TOTAL_QUIZ_STEPS = 23;

const QuizHeader = ({ 
  backRoute, 
  currentStep, 
  totalSteps = TOTAL_QUIZ_STEPS,
  showProgress = true 
}: QuizHeaderProps) => {
  const navigate = useNavigate();
  
  const progressPercentage = currentStep ? Math.min((currentStep / totalSteps) * 100, 100) : 0;

  return (
    <>
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center relative px-4">
        {backRoute && (
          <button 
            onClick={() => navigate(backRoute)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:opacity-70 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
        )}
        <img 
          src={logoImage} 
          alt="Detox Fígado Desafio" 
          className="h-14 w-auto"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          style={{ minHeight: '56px' }}
        />
      </header>

      {/* Progress Bar */}
      {showProgress && currentStep !== undefined && (
        <div className="w-full px-4 mt-2">
          <div className="h-1 bg-muted rounded-full max-w-md mx-auto">
            <div 
              className="h-1 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default QuizHeader;
