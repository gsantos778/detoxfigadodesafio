import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import { useEffect, useState } from "react";

const LoadingAnalysis = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000; // 4 segundos para completar
    let startTime: number | null = null;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      
      const elapsed = timestamp - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(currentProgress);

      if (currentProgress < 100) {
        animationId = requestAnimationFrame(animate);
      } else {
        // Navegar para página de captura de email após completar
        setTimeout(() => {
          navigate("/email-capture");
        }, 500);
      }
    };

    // Pequeno delay para garantir que o componente renderize primeiro com 0%
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [navigate]);

  // Calcular o stroke-dashoffset para o círculo de progresso
  const circumference = 2 * Math.PI * 45; // raio de 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center px-4">
        <img
          src={logoImage}
          alt="Detox Fígado Desafio"
          className="h-20 w-auto"
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Circular Progress */}
        <div className="relative w-40 h-40 mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#22C55E"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-800">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-gray-800">
            Analisando seus dados...
          </h2>
          <p className="text-gray-600 text-sm max-w-xs">
            Estamos preparando seu plano personalizado
          </p>
        </div>

        {/* Loading dots animation */}
        <div className="flex gap-2 mt-8">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </main>
    </div>
  );
};

export default LoadingAnalysis;