import { useState, useEffect } from "react";
import imgAgora from "@/assets/img-agora.png";
import imgMeta from "@/assets/img-meta.png";
import imgAgoraMale from "@/assets/img-agora-male.png";
import imgMetaMale from "@/assets/img-meta-male.png";

interface TransformationComparisonProps {
  userGender: 'male' | 'female';
  startAnimation?: boolean;
}

const TransformationComparison = ({ userGender, startAnimation = false }: TransformationComparisonProps) => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [bar1Visible, setBar1Visible] = useState(false);
  const [bar2Visible, setBar2Visible] = useState(false);
  const [bar3Visible, setBar3Visible] = useState(false);
  const [bar4Visible, setBar4Visible] = useState(false);

  useEffect(() => {
    // Only start animation when startAnimation prop becomes true
    if (!startAnimation) return;
    
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
  }, [startAnimation]);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden animate-float relative">
      <div className="grid grid-cols-2 gap-0">
        {/* Center arrows overlay */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-0">
          <svg 
            viewBox="0 0 24 60" 
            className="w-10 h-24 sm:w-14 sm:h-32"
            fill="none" 
            stroke="currentColor"
          >
          {/* Three chevron arrows */}
            <path 
              d="M4 8 L12 20 L4 32" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`text-emerald-400 ${startAnimation ? 'animate-pulse' : 'opacity-30'}`}
              style={{ animationDelay: '0ms' }}
            />
            <path 
              d="M10 8 L18 20 L10 32" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`text-emerald-500 ${startAnimation ? 'animate-pulse' : 'opacity-30'}`}
              style={{ animationDelay: '200ms' }}
            />
            <path 
              d="M16 8 L24 20 L16 32" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`text-emerald-600 ${startAnimation ? 'animate-pulse' : 'opacity-30'}`}
              style={{ animationDelay: '400ms' }}
            />
          </svg>
        </div>
        {/* AGORA - Left Side */}
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 p-4 sm:p-6 border-r border-gray-300">
          <div className="text-center mb-4">
            <span className="inline-block bg-gray-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
              AGORA
            </span>
          </div>
          
          {/* Body image */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img 
                src={userGender === 'male' ? imgAgoraMale : imgAgora} 
                alt="Antes" 
                className="w-32 h-44 sm:w-40 sm:h-52 object-cover object-top rounded-lg"
              />
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
          <div className="mt-4 space-y-1 text-xs sm:text-sm text-gray-500">
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
            <div className="flex items-center gap-1">
              <span className="text-red-400">✗</span>
              <span>Baixa queima de gordura</span>
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
          
          {/* Body image - healthier */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img 
                src={userGender === 'male' ? imgMetaMale : imgMeta} 
                alt="Meta" 
                className="w-32 h-44 sm:w-40 sm:h-52 object-cover object-top rounded-lg"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full -z-10"></div>
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
          <div className="mt-4 space-y-1 text-xs sm:text-sm text-emerald-700">
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
            <div className="flex items-center gap-1">
              <span className="text-emerald-500">✓</span>
              <span>Alta queima de gordura</span>
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
