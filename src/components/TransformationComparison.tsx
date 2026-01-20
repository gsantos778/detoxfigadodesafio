import { useState, useEffect } from "react";

interface TransformationComparisonProps {
  userGender: 'male' | 'female';
}

const TransformationComparison = ({ userGender }: TransformationComparisonProps) => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [bar1Visible, setBar1Visible] = useState(false);
  const [bar2Visible, setBar2Visible] = useState(false);
  const [bar3Visible, setBar3Visible] = useState(false);
  const [bar4Visible, setBar4Visible] = useState(false);

  useEffect(() => {
    // Start animation sequence after component mounts
    const timer = setTimeout(() => {
      setAnimationStarted(true);
      
      // "Agora" bar (1 bar)
      setTimeout(() => setBar1Visible(true), 300);
      
      // "Meta" bars (3 bars sequentially)
      setTimeout(() => setBar2Visible(true), 800);
      setTimeout(() => setBar3Visible(true), 1200);
      setTimeout(() => setBar4Visible(true), 1600);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden animate-float">
      <div className="grid grid-cols-2 gap-0">
        {/* AGORA - Left Side */}
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 p-4 sm:p-6 border-r border-gray-300">
          <div className="text-center mb-4">
            <span className="inline-block bg-gray-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
              AGORA
            </span>
          </div>
          
          {/* Body silhouette placeholder */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <svg 
                viewBox="0 0 60 100" 
                className="w-16 h-28 sm:w-20 sm:h-32 text-gray-400"
                fill="currentColor"
              >
                {/* Simplified body silhouette - slightly larger */}
                <ellipse cx="30" cy="12" rx="10" ry="10" />
                <path d="M20 22 Q15 40, 18 60 Q17 80, 20 95 L25 95 L27 65 L33 65 L35 95 L40 95 Q43 80, 42 60 Q45 40, 40 22 Z" />
              </svg>
              {/* "Overweight" indicator */}
              <div className="absolute -right-1 top-1/3 w-3 h-8 bg-gray-400 rounded-full opacity-50"></div>
            </div>
          </div>

          {/* Metabolism indicator */}
          <div className="space-y-2">
            <p className="text-[10px] sm:text-xs text-gray-600 font-medium text-center">
              Metabolismo Lento
            </p>
            <div className="flex justify-center gap-1">
              <div 
                className={`h-2 sm:h-3 w-6 sm:w-8 rounded-full transition-all duration-700 ease-out ${
                  bar1Visible 
                    ? 'bg-red-400 scale-100 opacity-100' 
                    : 'bg-gray-300 scale-x-0 opacity-0'
                }`}
                style={{ transformOrigin: 'left' }}
              />
              <div className="h-2 sm:h-3 w-6 sm:w-8 rounded-full bg-gray-300" />
              <div className="h-2 sm:h-3 w-6 sm:w-8 rounded-full bg-gray-300" />
            </div>
          </div>

          {/* Status indicators */}
          <div className="mt-4 space-y-1 text-[9px] sm:text-[10px] text-gray-500">
            <div className="flex items-center gap-1">
              <span className="text-red-400">✗</span>
              <span>Energia baixa</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-400">✗</span>
              <span>Digestão lenta</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-400">✗</span>
              <span>Fígado sobrecarregado</span>
            </div>
          </div>
        </div>

        {/* META - Right Side */}
        <div className="bg-gradient-to-b from-green-50 to-emerald-100 p-4 sm:p-6">
          <div className="text-center mb-4">
            <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-md">
              META
            </span>
          </div>
          
          {/* Body silhouette placeholder - healthier */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <svg 
                viewBox="0 0 60 100" 
                className="w-16 h-28 sm:w-20 sm:h-32 text-emerald-500"
                fill="currentColor"
              >
                {/* Simplified body silhouette - slimmer */}
                <ellipse cx="30" cy="12" rx="9" ry="9" />
                <path d="M22 21 Q19 38, 21 55 Q20 75, 22 95 L26 95 L28 60 L32 60 L34 95 L38 95 Q40 75, 39 55 Q41 38, 38 21 Z" />
              </svg>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full"></div>
            </div>
          </div>

          {/* Metabolism indicator */}
          <div className="space-y-2">
            <p className="text-[10px] sm:text-xs text-emerald-700 font-medium text-center">
              Metabolismo Rápido
            </p>
            <div className="flex justify-center gap-1">
              <div 
                className={`h-2 sm:h-3 w-6 sm:w-8 rounded-full transition-all duration-700 ease-out ${
                  bar2Visible 
                    ? 'bg-emerald-500 scale-100 opacity-100' 
                    : 'bg-gray-300 scale-x-0 opacity-0'
                }`}
                style={{ transformOrigin: 'left' }}
              />
              <div 
                className={`h-2 sm:h-3 w-6 sm:w-8 rounded-full transition-all duration-700 ease-out ${
                  bar3Visible 
                    ? 'bg-emerald-500 scale-100 opacity-100' 
                    : 'bg-gray-300 scale-x-0 opacity-0'
                }`}
                style={{ transformOrigin: 'left' }}
              />
              <div 
                className={`h-2 sm:h-3 w-6 sm:w-8 rounded-full transition-all duration-700 ease-out ${
                  bar4Visible 
                    ? 'bg-emerald-500 scale-100 opacity-100' 
                    : 'bg-gray-300 scale-x-0 opacity-0'
                }`}
                style={{ transformOrigin: 'left' }}
              />
            </div>
          </div>

          {/* Status indicators */}
          <div className="mt-4 space-y-1 text-[9px] sm:text-[10px] text-emerald-700">
            <div className="flex items-center gap-1">
              <span className="text-emerald-500">✓</span>
              <span>Energia elevada</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-emerald-500">✓</span>
              <span>Digestão otimizada</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-emerald-500">✓</span>
              <span>Fígado saudável</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom arrow indicator */}
      <div className="bg-gradient-to-r from-gray-200 via-emerald-200 to-emerald-300 py-2 flex items-center justify-center gap-2">
        <span className="text-xs sm:text-sm text-gray-600 font-medium">Sua transformação</span>
        <svg className="w-4 h-4 text-emerald-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </div>
  );
};

export default TransformationComparison;
