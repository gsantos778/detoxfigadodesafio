import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const WeightProjection = () => {
  const navigate = useNavigate();

  const { currentWeight, desiredWeight, targetDate, chartData, daysNeeded } = useMemo(() => {
    const current = parseInt(localStorage.getItem("currentWeight") || "90");
    const desired = parseInt(localStorage.getItem("desiredWeight") || "75");
    
    const weightToLose = current - desired;
    
    // Calcular dias baseado na faixa de peso a perder
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
    
    // Calcular data alvo a partir de hoje
    const today = new Date();
    const target = new Date(today);
    target.setDate(target.getDate() + days);
    
    const months = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    
    const formattedDate = `${target.getDate()} de ${months[target.getMonth()]} de ${target.getFullYear()}`;
    
    // Gerar dados do gráfico com curva de perda de peso realista
    // A perda de peso é mais rápida no início e desacelera com o tempo
    const dataPoints = 7;
    const data = [];
    
    for (let i = 0; i <= dataPoints; i++) {
      const progress = i / dataPoints;
      // Curva exponencial decrescente para simular perda de peso realista
      const weightLost = weightToLose * (1 - Math.pow(1 - progress, 1.5));
      const currentWeightAtPoint = current - weightLost;
      
      // Calcular o label do período
      let label = "";
      if (i === 0) {
        label = "Hoje";
      } else if (i === dataPoints) {
        label = `${Math.round(days / 30)}m`;
      } else {
        const daysAtPoint = Math.round((days / dataPoints) * i);
        if (daysAtPoint < 30) {
          label = `${daysAtPoint}d`;
        } else {
          label = `${Math.round(daysAtPoint / 30)}m`;
        }
      }
      
      data.push({
        name: label,
        peso: Math.round(currentWeightAtPoint * 10) / 10,
        meta: desired,
      });
    }
    
    return {
      currentWeight: current,
      desiredWeight: desired,
      targetDate: formattedDate,
      chartData: data,
      daysNeeded: days,
    };
  }, []);

  // Calcular domínio do eixo Y com margem
  const yMin = Math.floor(desiredWeight - 5);
  const yMax = Math.ceil(currentWeight + 5);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center relative px-4">
        <button
          onClick={() => navigate("/age-input-selection")}
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
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4 max-w-md">
          Com a dieta de desintoxicação do fígado, você atingirá o peso desejado.
        </h1>

        {/* Dynamic Weight Goal */}
        <p className="text-primary font-semibold text-lg mb-6">
          {desiredWeight} kg até {targetDate}
        </p>

        {/* Weight Chart - Real and Animated */}
        <div className="w-full max-w-md animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          {/* Weight Labels */}
          <div className="flex justify-between mb-2 px-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm text-muted-foreground">Peso atual: <strong className="text-orange-500">{currentWeight} kg</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm text-muted-foreground">Meta: <strong className="text-primary">{desiredWeight} kg</strong></span>
            </div>
          </div>

          {/* Chart Container */}
          <div className="bg-gradient-to-br from-muted/50 to-muted rounded-2xl p-4 shadow-lg">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                
                <YAxis 
                  domain={[yMin, yMax]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={(value) => `${value}`}
                />
                
                {/* Reference line for goal weight */}
                <ReferenceLine 
                  y={desiredWeight} 
                  stroke="hsl(var(--primary))" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
                
                {/* Weight progression area */}
                <Area
                  type="monotone"
                  dataKey="peso"
                  stroke="hsl(25, 95%, 53%)"
                  strokeWidth={3}
                  fill="url(#weightGradient)"
                  animationDuration={2000}
                  animationBegin={300}
                  dot={{ 
                    fill: 'hsl(25, 95%, 53%)', 
                    strokeWidth: 2, 
                    stroke: 'white',
                    r: 4
                  }}
                  activeDot={{
                    fill: 'hsl(25, 95%, 53%)',
                    strokeWidth: 3,
                    stroke: 'white',
                    r: 6
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Info Text */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            Projeção baseada em {daysNeeded} dias de dieta
          </p>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => navigate("/")}
          className="w-full max-w-md mt-8 py-6 text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default WeightProjection;
