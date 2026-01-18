import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import imgImcNormal from "@/assets/img-imc-normal.png";
import imgImcSobrepeso from "@/assets/img-imc-sobrepeso.png";
import { ChevronLeft, Target, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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
  const [userData, setUserData] = useState<UserData>({
    height: 170,
    currentWeight: 80,
    desiredWeight: 70,
    goal: "Aumentar os níveis de energia",
    weightGain: "Sim",
    energy: "Médio",
  });

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center relative px-4">
        <button
          onClick={() => navigate("/weight-projection")}
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
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-6">
        {/* Card Principal com background colorido */}
        <div 
          className={`w-full max-w-md rounded-3xl p-6 ${
            isOverweight 
              ? 'bg-[#FECACA]' 
              : 'bg-[#D1FAE5]'
          }`}
        >
          {/* IMC Header */}
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">
              Índice de Massa Corporal (IMC)
            </p>
            <h2 className={`text-3xl font-bold ${
              isOverweight ? 'text-orange-500' : 'text-emerald-600'
            }`}>
              {getIMCClassification()}
            </h2>
          </div>

          {/* Velocímetro IMC */}
          <div className="relative w-40 h-20 mx-auto mb-4">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              {/* Arco colorido do velocímetro */}
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
              <g transform={`rotate(${getPointerRotation()}, 100, 90)`}>
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
          <div className="text-center mb-3">
            <p className="text-lg font-bold text-gray-800">
              Seu Índice de Massa Corporal: {imc.toFixed(2).replace('.', ',')}
            </p>
          </div>

          {/* Mensagem baseada no IMC */}
          <div className="text-center mb-6 px-2">
            {isOverweight ? (
              <p className="text-sm text-gray-700">
                <span className="text-red-600 font-bold">Riscos de um IMC não saudável: </span>
                Hipertensão arterial, aumento do risco de ataque cardíaco, AVC, diabetes tipo 2, dores crônicas nas costas e articulações.
              </p>
            ) : (
              <p className="text-sm text-gray-700">
                <span className="text-emerald-600 font-bold">IMC saudável: </span>
                Um bom IMC inicial para tonificar o corpo e conquistar o corpo dos seus sonhos.
              </p>
            )}
          </div>

          {/* Info Cards com Imagem */}
          <div className="flex items-end gap-3">
            {/* Info Left */}
            <div className="flex-1 space-y-3">
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
                  <p className="text-xs text-gray-500">Ganho de peso inexplicável</p>
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

            {/* Imagem da Mulher */}
            <div className="flex-shrink-0">
              <img
                src={isOverweight ? imgImcSobrepeso : imgImcNormal}
                alt="Ilustração corporal"
                className="w-36 h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => navigate("/next-page")}
          className="w-full max-w-md mt-8 py-6 text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default PersonalSummary;
