import { useNavigate } from "react-router-dom";
import imgImcNormal from "@/assets/img-imc-normal.png";
import imgImcSobrepeso from "@/assets/img-imc-sobrepeso.png";
import imgImcNormalMale from "@/assets/img-imc-normal-male.png";
import imgImcSobrepesoMale from "@/assets/img-imc-sobrepeso-male.png";
import logoImage from "@/assets/logo.png";
import { Target, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import QuizHeader from "@/components/QuizHeader";

// Read gender synchronously to avoid flash
const getInitialGender = (): 'male' | 'female' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('userGender');
    if (stored === 'male' || stored === 'female') return stored;
  }
  return 'female';
};

// Preload images immediately on module load
[imgImcNormal, imgImcSobrepeso, imgImcNormalMale, imgImcSobrepesoMale, logoImage].forEach(src => {
  const img = new Image();
  img.src = src;
});

interface UserData {
  height: number;
  currentWeight: number;
  desiredWeight: number;
  goal: string;
  weightGain: string;
  energy: string;
}

const PersonalSummary = () => {
  const navigate = useNavigate();
  const userGender = getInitialGender();
  const [userData, setUserData] = useState<UserData>({
    height: 170,
    currentWeight: 80,
    desiredWeight: 70,
    goal: "Aumentar os níveis de energia",
    weightGain: "Sim",
    energy: "Médio",
  });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [animatedRotation, setAnimatedRotation] = useState(-90); // Começa na esquerda

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = [imgImcNormal, imgImcSobrepeso, logoImage].map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };
    preloadImages();
  }, []);

  useEffect(() => {
    // Carregar dados do localStorage
    const height = parseInt(localStorage.getItem("height") || "170");
    const currentWeight = parseInt(localStorage.getItem("currentWeight") || "80");
    const desiredWeight = parseInt(localStorage.getItem("desiredWeight") || "70");
    const goal = localStorage.getItem("goal") || "Aumentar os níveis de energia";
    const weightGain = localStorage.getItem("weightGain") || "Sim";
    const energy = localStorage.getItem("energy") || "Médio";

    setUserData({
      height,
      currentWeight,
      desiredWeight,
      goal,
      weightGain,
      energy,
    });
  }, []);

  // Calcular IMC
  const calculateIMC = () => {
    const heightInMeters = userData.height / 100;
    const imc = userData.currentWeight / (heightInMeters * heightInMeters);
    return imc;
  };

  const imc = calculateIMC();
  const isOverweight = imc >= 25;

  // Determinar classificação do IMC
  const getIMCClassification = () => {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 25) return "Normal";
    if (imc < 30) return "Sobrepeso";
    if (imc < 35) return "Obesidade I";
    if (imc < 40) return "Obesidade II";
    return "Obesidade III";
  };

  // Calcular posição do ponteiro no velocímetro (0-180 graus)
  const getPointerRotation = () => {
    const minIMC = 15;
    const maxIMC = 40;
    const clampedIMC = Math.max(minIMC, Math.min(maxIMC, imc));
    const rotation = ((clampedIMC - minIMC) / (maxIMC - minIMC)) * 180;
    return rotation - 90;
  };

  // Animação do ponteiro - inicia imediatamente sem delay
  useEffect(() => {
    if (imagesLoaded) {
      const targetRotation = getPointerRotation();
      const duration = 1500; // 1.5 segundos
      let startTime: number | null = null;
      const startRotation = -90;
      let animationId: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out cubic)
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        const currentRotation = startRotation + (targetRotation - startRotation) * easeOutCubic;
        setAnimatedRotation(currentRotation);

        if (progress < 1) {
          animationId = requestAnimationFrame(animate);
        }
      };

      // Inicia imediatamente sem delay
      animationId = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationId);
    }
  }, [imagesLoaded, imc]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!imagesLoaded ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <QuizHeader backRoute="/weight-projection" currentStep={23} />

          {/* Main Content */}
          <main className="flex-1 flex flex-col items-center justify-start px-3 md:px-4 py-4 md:py-6">
            {/* Card Principal */}
            <div className="w-full max-w-md rounded-2xl md:rounded-3xl overflow-hidden">
              {/* Top Section - Pink for overweight, Green for normal */}
              <div 
                className={`p-4 md:p-6 pb-3 md:pb-4 ${
                  isOverweight 
                    ? 'bg-[#FECACA]' 
                    : 'bg-[#D1FAE5]'
                }`}
              >
                {/* IMC Header */}
                <div className="text-center mb-3 md:mb-4">
                  <p className="text-sm text-gray-600 mb-1">
                    Índice de Massa Corporal (IMC)
                  </p>
                  <h2 className={`text-2xl md:text-3xl font-bold ${
                    isOverweight ? 'text-orange-500' : 'text-emerald-600'
                  }`}>
                    {getIMCClassification()}
                  </h2>
                </div>

                {/* Velocímetro IMC */}
                <div className="relative w-36 h-18 md:w-44 md:h-22 mx-auto mb-3 md:mb-4">
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    {/* Azul - Abaixo do peso */}
                    <path
                      d="M 20 90 A 80 80 0 0 1 50 40"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="18"
                      strokeLinecap="round"
                    />
                    {/* Verde escuro - Normal baixo */}
                    <path
                      d="M 52 38 A 80 80 0 0 1 85 22"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="18"
                    />
                    {/* Verde claro - Normal alto */}
                    <path
                      d="M 87 21 A 80 80 0 0 1 120 22"
                      fill="none"
                      stroke="#86EFAC"
                      strokeWidth="18"
                    />
                    {/* Amarelo - Sobrepeso */}
                    <path
                      d="M 122 23 A 80 80 0 0 1 150 40"
                      fill="none"
                      stroke="#FCD34D"
                      strokeWidth="18"
                    />
                    {/* Laranja - Obesidade I */}
                    <path
                      d="M 152 42 A 80 80 0 0 1 170 62"
                      fill="none"
                      stroke="#FB923C"
                      strokeWidth="18"
                    />
                    {/* Vermelho - Obesidade II/III */}
                    <path
                      d="M 171 64 A 80 80 0 0 1 180 90"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="18"
                      strokeLinecap="round"
                    />
                    
                    {/* Ponteiro */}
                    <g transform={`rotate(${animatedRotation}, 100, 90)`}>
                      <polygon
                        points="100,25 95,85 100,90 105,85"
                        fill="#374151"
                      />
                      <circle cx="100" cy="90" r="10" fill="#374151" />
                      <circle cx="100" cy="90" r="5" fill="#9CA3AF" />
                    </g>
                  </svg>
                </div>

                {/* IMC Value */}
                <div className="text-center mb-2 md:mb-3">
                  <p className="text-base md:text-lg font-bold text-gray-800">
                    Seu IMC: {imc.toFixed(2).replace('.', ',')}
                  </p>
                </div>

                {/* Mensagem baseada no IMC */}
                <div className="text-center px-1 md:px-2">
                  {isOverweight ? (
                    <p className="text-sm text-gray-700">
                      <span className="text-red-600 font-bold">Riscos de um IMC não saudável: </span>
                      Hipertensão, risco de AVC, diabetes tipo 2, dores crônicas.
                    </p>
                  ) : (
                    <p className="text-sm text-gray-700">
                      <span className="text-emerald-600 font-bold">IMC saudável: </span>
                      Bom IMC para tonificar e conquistar o corpo dos seus sonhos.
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Section - Always White */}
              <div className="bg-white p-4 md:p-6 pt-3 md:pt-4">
                {/* Info Cards com Imagem */}
                <div className="flex items-end gap-2 md:gap-3">
                  {/* Info Left */}
                  <div className="flex-1 space-y-2 md:space-y-3">
                    <div className="flex items-start gap-2">
                      <div className={`p-1.5 rounded-full flex-shrink-0 ${
                        isOverweight ? 'bg-red-200' : 'bg-emerald-200'
                      }`}>
                        <Target className={`w-4 h-4 ${
                          isOverweight ? 'text-red-600' : 'text-emerald-600'
                        }`} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Meta</p>
                        <p className="text-sm font-bold text-gray-800">{userData.goal}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className={`p-1.5 rounded-full flex-shrink-0 ${
                        isOverweight ? 'bg-red-200' : 'bg-emerald-200'
                      }`}>
                        <TrendingUp className={`w-4 h-4 ${
                          isOverweight ? 'text-red-600' : 'text-emerald-600'
                        }`} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Ganho inexplicável</p>
                        <p className="text-sm font-bold text-gray-800">{userData.weightGain}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className={`p-1.5 rounded-full flex-shrink-0 ${
                        isOverweight ? 'bg-red-200' : 'bg-emerald-200'
                      }`}>
                        <Zap className={`w-4 h-4 ${
                          isOverweight ? 'text-red-600' : 'text-emerald-600'
                        }`} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Energia</p>
                        <p className="text-sm font-bold text-gray-800">{userData.energy}</p>
                      </div>
                    </div>
                  </div>

                  {/* Imagem do corpo */}
                  <div className="flex-shrink-0">
                    <img
                      src={
                        userGender === 'male'
                          ? (isOverweight ? imgImcSobrepesoMale : imgImcNormalMale)
                          : (isOverweight ? imgImcSobrepeso : imgImcNormal)
                      }
                      alt="Ilustração corporal"
                      className="w-32 md:w-40 h-auto object-contain"
                      loading="eager"
                      decoding="sync"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <Button
              onClick={() => navigate("/loading-analysis")}
              className="w-full max-w-md mt-6 md:mt-8 py-5 md:py-6 text-base md:text-lg font-semibold rounded-full"
            >
              Próximo
            </Button>
          </main>
        </>
      )}
    </div>
  );
};

export default PersonalSummary;