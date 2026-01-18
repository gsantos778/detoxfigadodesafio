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
    // IMC varia de ~15 a ~40 para a maioria das pessoas
    // Mapear para 0-180 graus
    const minIMC = 15;
    const maxIMC = 40;
    const clampedIMC = Math.max(minIMC, Math.min(maxIMC, imc));
    const rotation = ((clampedIMC - minIMC) / (maxIMC - minIMC)) * 180;
    return rotation - 90; // Ajustar para começar da esquerda
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
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-6">
          Seu resumo pessoal
        </h1>

        {/* Card Principal */}
        <div className={`w-full max-w-md rounded-2xl p-6 ${isOverweight ? 'bg-red-50' : 'bg-green-50'}`}>
          {/* IMC Header */}
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground mb-1">
              Índice de Massa Corporal (IMC)
            </p>
            <h2 className={`text-2xl font-bold ${isOverweight ? 'text-orange-500' : 'text-primary'}`}>
              {getIMCClassification()}
            </h2>
          </div>

          {/* Velocímetro IMC */}
          <div className="relative w-48 h-24 mx-auto mb-4">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              {/* Arco colorido do velocímetro */}
              {/* Azul - Abaixo do peso */}
              <path
                d="M 20 90 A 80 80 0 0 1 56 34"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Verde - Normal */}
              <path
                d="M 60 30 A 80 80 0 0 1 100 20"
                fill="none"
                stroke="#22C55E"
                strokeWidth="16"
              />
              {/* Verde claro */}
              <path
                d="M 100 20 A 80 80 0 0 1 130 28"
                fill="none"
                stroke="#86EFAC"
                strokeWidth="16"
              />
              {/* Amarelo */}
              <path
                d="M 130 28 A 80 80 0 0 1 155 45"
                fill="none"
                stroke="#FCD34D"
                strokeWidth="16"
              />
              {/* Laranja */}
              <path
                d="M 155 45 A 80 80 0 0 1 172 65"
                fill="none"
                stroke="#FB923C"
                strokeWidth="16"
              />
              {/* Vermelho */}
              <path
                d="M 172 65 A 80 80 0 0 1 180 90"
                fill="none"
                stroke="#EF4444"
                strokeWidth="16"
                strokeLinecap="round"
              />
              
              {/* Ponteiro */}
              <g transform={`rotate(${getPointerRotation()}, 100, 90)`}>
                <line
                  x1="100"
                  y1="90"
                  x2="100"
                  y2="30"
                  stroke="#1F2937"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="90" r="8" fill="#1F2937" />
              </g>
            </svg>
          </div>

          {/* IMC Value */}
          <div className="text-center mb-4">
            <p className="text-lg font-semibold text-foreground">
              Seu Índice de Massa Corporal: {imc.toFixed(2).replace('.', ',')}
            </p>
          </div>

          {/* Mensagem baseada no IMC */}
          <div className="text-center mb-6">
            {isOverweight ? (
              <p className="text-sm text-muted-foreground">
                <span className="text-red-500 font-semibold">Riscos de um IMC não saudável: </span>
                Hipertensão arterial, aumento do risco de ataque cardíaco, AVC, diabetes tipo 2, dores crônicas nas costas e articulações.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-semibold">IMC saudável: </span>
                Um bom IMC inicial para tonificar o corpo e conquistar o corpo dos seus sonhos.
              </p>
            )}
          </div>

          {/* Info Cards com Imagem */}
          <div className="flex items-center gap-4">
            {/* Info Left */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${isOverweight ? 'bg-red-100' : 'bg-green-100'}`}>
                  <Target className={`w-4 h-4 ${isOverweight ? 'text-red-500' : 'text-primary'}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Meta</p>
                  <p className="text-sm font-semibold text-foreground">{userData.goal}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${isOverweight ? 'bg-red-100' : 'bg-green-100'}`}>
                  <TrendingUp className={`w-4 h-4 ${isOverweight ? 'text-red-500' : 'text-primary'}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ganho de peso inexplicável</p>
                  <p className="text-sm font-semibold text-foreground">{userData.weightGain}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${isOverweight ? 'bg-red-100' : 'bg-green-100'}`}>
                  <Zap className={`w-4 h-4 ${isOverweight ? 'text-red-500' : 'text-primary'}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Energia</p>
                  <p className="text-sm font-semibold text-foreground">{userData.energy}</p>
                </div>
              </div>
            </div>

            {/* Imagem */}
            <div className="flex-shrink-0">
              <img
                src={isOverweight ? imgImcSobrepeso : imgImcNormal}
                alt="Ilustração corporal"
                className="w-32 h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => navigate("/next-page")} // Próxima página do quiz
          className="w-full max-w-md mt-8 py-6 text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default PersonalSummary;
