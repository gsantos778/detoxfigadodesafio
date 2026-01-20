import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import logoImage from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const WeightImpactChart = () => {
  const navigate = useNavigate();
  const [animationProgress, setAnimationProgress] = useState(0);

  // Usar a mesma lógica de cálculo do WeightProjection
  const { currentWeight, desiredWeight, after4Weeks, daysNeeded, weeksNeeded } = useMemo(() => {
    const current = parseInt(localStorage.getItem("currentWeight") || "80");
    const desired = parseInt(localStorage.getItem("desiredWeight") || "65");
    
    const weightToLose = current - desired;
    
    // Calcular dias baseado na faixa de peso a perder (mesma lógica do WeightProjection)
    let days: number;
    
    if (weightToLose <= 10) {
      days = 30;
    } else if (weightToLose <= 17) {
      days = 60;
    } else if (weightToLose <= 25) {
      days = 90;
    } else if (weightToLose <= 33) {
      days = 120;
    } else if (weightToLose <= 41) {
      days = 150;
    } else {
      days = 180;
    }
    
    const weeks = Math.round(days / 7);
    
    // Calcular peso na metade do programa (sempre 50% do tempo)
    const progressAtHalfway = 0.5;
    
    // Curva exponencial decrescente para simular perda de peso realista (mesma fórmula do WeightProjection)
    const weightLostAtHalfway = weightToLose * (1 - Math.pow(1 - progressAtHalfway, 1.5));
    const halfwayWeight = Math.round(current - weightLostAtHalfway);
    
    return {
      currentWeight: current,
      desiredWeight: desired,
      after4Weeks: halfwayWeight,
      daysNeeded: days,
      weeksNeeded: weeks,
    };
  }, []);

  useEffect(() => {
    // Animar o gráfico
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Calcular peso intermediário baseado no progresso real
  const weightDifference = currentWeight - desiredWeight;
  
  // Pontos do gráfico baseados nos pesos reais
  const maxWeight = currentWeight + 5;
  const minWeight = desiredWeight - 5;
  const weightRange = maxWeight - minWeight;

  const getYPosition = (weight: number) => {
    return ((maxWeight - weight) / weightRange) * 180 + 20;
  };

  // Posições Y para cada ponto
  const y1 = getYPosition(currentWeight);
  const y2 = getYPosition(currentWeight - weightDifference * 0.15);
  const y3 = getYPosition(after4Weeks);
  const y4 = getYPosition(desiredWeight + weightDifference * 0.1);
  const y5 = getYPosition(desiredWeight);

  // Calcular progresso de animação para cada segmento
  const getSegmentProgress = (segmentIndex: number) => {
    const segmentStart = segmentIndex * 25;
    const segmentEnd = (segmentIndex + 1) * 25;
    if (animationProgress <= segmentStart) return 0;
    if (animationProgress >= segmentEnd) return 1;
    return (animationProgress - segmentStart) / 25;
  };

  // Texto dinâmico: sempre metade do período total
  const halfWeeks = Math.round(weeksNeeded / 2);
  const midPointLabel = `Após ${halfWeeks} semanas`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center px-3 sm:px-4">
        <img
          src={logoImage}
          alt="Detox Fígado Desafio"
          className="h-12 sm:h-16 w-auto"
          loading="eager"
          decoding="sync"
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-3 sm:px-4 pt-6 sm:pt-8">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8 max-w-md leading-tight px-2">
          Um plano de emagrecimento de {weeksNeeded} semanas pode causar um impacto duradouro!
        </h1>

        {/* Animated Chart */}
        <div className="w-full max-w-md bg-[#e8f4f0] rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
          <svg viewBox="0 0 350 220" className="w-full h-auto">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#cde4dc" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="350" height="220" fill="url(#grid)" rx="8" />
            
            {/* Animated path segments */}
            {/* Segment 1: Red/Orange (Seu peso) */}
            <path
              d={`M 30 ${y1} Q 60 ${y1 + 5} 90 ${y2}`}
              fill="none"
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={100 - (getSegmentProgress(0) * 100)}
              className="transition-all duration-100"
            />
            
            {/* Segment 2: Orange to Yellow */}
            <path
              d={`M 90 ${y2} Q 130 ${(y2 + y3) / 2} 170 ${y3}`}
              fill="none"
              stroke="#f97316"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="120"
              strokeDashoffset={120 - (getSegmentProgress(1) * 120)}
              className="transition-all duration-100"
            />
            
            {/* Segment 3: Yellow (Após 4 semanas) */}
            <path
              d={`M 170 ${y3} Q 210 ${(y3 + y4) / 2} 250 ${y4}`}
              fill="none"
              stroke="#eab308"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="120"
              strokeDashoffset={120 - (getSegmentProgress(2) * 120)}
              className="transition-all duration-100"
            />
            
            {/* Segment 4: Green (Mantendo-o afastado) */}
            <path
              d={`M 250 ${y4} Q 290 ${(y4 + y5) / 2} 320 ${y5}`}
              fill="none"
              stroke="#22c55e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={100 - (getSegmentProgress(3) * 100)}
              className="transition-all duration-100"
            />

            {/* Animated dots */}
            {/* Point 1: Start (Red) */}
            <circle
              cx="30"
              cy={y1}
              r="8"
              fill="#ef4444"
              className="transition-all duration-300"
              style={{ opacity: animationProgress > 0 ? 1 : 0, transform: `scale(${animationProgress > 0 ? 1 : 0})`, transformOrigin: '30px ' + y1 + 'px' }}
            />
            
            {/* Point 2: Orange */}
            <circle
              cx="90"
              cy={y2}
              r="6"
              fill="#f97316"
              className="transition-all duration-300"
              style={{ opacity: animationProgress > 25 ? 1 : 0 }}
            />
            
            {/* Point 3: Yellow (After 4 weeks) */}
            <circle
              cx="170"
              cy={y3}
              r="8"
              fill="#eab308"
              className="transition-all duration-300"
              style={{ opacity: animationProgress > 50 ? 1 : 0 }}
            />
            
            {/* Point 4: Light green */}
            <circle
              cx="250"
              cy={y4}
              r="6"
              fill="#84cc16"
              className="transition-all duration-300"
              style={{ opacity: animationProgress > 75 ? 1 : 0 }}
            />
            
            {/* Point 5: End (Green) */}
            <circle
              cx="320"
              cy={y5}
              r="8"
              fill="#22c55e"
              className="transition-all duration-300"
              style={{ opacity: animationProgress >= 100 ? 1 : 0 }}
            />

            {/* Labels */}
            {/* Seu peso label */}
            <g style={{ opacity: animationProgress > 5 ? 1 : 0 }} className="transition-opacity duration-500">
              <rect x="35" y={y1 - 30} width="70" height="22" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1" />
              <text x="70" y={y1 - 15} textAnchor="middle" className="text-xs font-medium" fill="#ef4444">
                Seu peso
              </text>
            </g>

            {/* Após X semanas label */}
            <g style={{ opacity: animationProgress > 55 ? 1 : 0 }} className="transition-opacity duration-500">
              <rect x="125" y={y3 + 10} width="100" height="22" rx="4" fill="#fefce8" stroke="#eab308" strokeWidth="1" />
              <text x="175" y={y3 + 25} textAnchor="middle" className="text-xs font-medium" fill="#ca8a04">
                {midPointLabel}
              </text>
            </g>

            {/* Mantendo-o afastado label */}
            <g style={{ opacity: animationProgress >= 100 ? 1 : 0 }} className="transition-opacity duration-500">
              <rect x="205" y={y5 + 10} width="115" height="22" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1" />
              <text x="262" y={y5 + 25} textAnchor="middle" className="text-xs font-medium" fill="#16a34a">
                Mantendo-o afastado
              </text>
            </g>

            {/* Weight values */}
            <text x="30" y={y1 - 35} textAnchor="middle" className="text-sm font-bold" fill="#374151" style={{ opacity: animationProgress > 5 ? 1 : 0 }}>
              {currentWeight}kg
            </text>
            <text x="170" y={y3 - 15} textAnchor="middle" className="text-sm font-bold" fill="#374151" style={{ opacity: animationProgress > 55 ? 1 : 0 }}>
              {after4Weeks}kg
            </text>
            <text x="320" y={y5 - 15} textAnchor="middle" className="text-sm font-bold" fill="#374151" style={{ opacity: animationProgress >= 100 ? 1 : 0 }}>
              {desiredWeight}kg
            </text>
          </svg>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => navigate("/challenge-ready")}
          className="w-full max-w-md py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default WeightImpactChart;
