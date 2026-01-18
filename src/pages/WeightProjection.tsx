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
  Tooltip,
  Label,
  LabelList,
} from "recharts";

interface ChartDataPoint {
  day: number;
  name: string;
  peso: number;
  meta: number;
  lostSoFar: number;
}

const WeightProjection = () => {
  const navigate = useNavigate();

  const { currentWeight, desiredWeight, targetDate, chartData, daysNeeded, totalWeightToLose, avgWeightLossPerWeek } = useMemo(() => {
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
    
    // Gerar dados do gráfico a cada 10 dias para ser mais detalhado
    const data: ChartDataPoint[] = [];
    const interval = 10; // Intervalo de 10 dias
    const numPoints = Math.ceil(days / interval) + 1;
    
    for (let i = 0; i < numPoints; i++) {
      const dayNumber = Math.min(i * interval, days);
      const progress = dayNumber / days;
      
      // Curva exponencial decrescente para simular perda de peso realista
      const weightLost = weightToLose * (1 - Math.pow(1 - progress, 1.5));
      const currentWeightAtPoint = current - weightLost;
      
      // Calcular o label do período
      let label = "";
      if (dayNumber === 0) {
        label = "Início";
      } else if (dayNumber >= days) {
        label = "Meta";
      } else {
        label = `${dayNumber}d`;
      }
      
      data.push({
        day: dayNumber,
        name: label,
        peso: Math.round(currentWeightAtPoint * 10) / 10,
        meta: desired,
        lostSoFar: Math.round(weightLost * 10) / 10,
      });
    }
    
    // Garantir que o último ponto seja exatamente a meta
    if (data[data.length - 1].day !== days) {
      data.push({
        day: days,
        name: "Meta",
        peso: desired,
        meta: desired,
        lostSoFar: weightToLose,
      });
    }
    
    // Calcular média de perda por semana
    const weeks = days / 7;
    const avgPerWeek = Math.round((weightToLose / weeks) * 10) / 10;
    
    return {
      currentWeight: current,
      desiredWeight: desired,
      targetDate: formattedDate,
      chartData: data,
      daysNeeded: days,
      totalWeightToLose: weightToLose,
      avgWeightLossPerWeek: avgPerWeek,
    };
  }, []);

  // Calcular domínio do eixo Y com margem
  const yMin = Math.floor(desiredWeight - 3);
  const yMax = Math.ceil(currentWeight + 3);

  // Custom tooltip para explicar cada ponto
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChartDataPoint }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-bold text-foreground">
            {data.day === 0 ? "Hoje" : `Dia ${data.day}`}
          </p>
          <p className="text-primary font-semibold text-lg">{data.peso} kg</p>
          {data.lostSoFar > 0 && (
            <p className="text-green-500 text-sm">
              -{data.lostSoFar} kg perdidos
            </p>
          )}
        </div>
      );
    }
    return null;
  };

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
          
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Peso Inicial</p>
              <p className="text-xl font-bold text-orange-500">{currentWeight}kg</p>
            </div>
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Peso Objetivo</p>
              <p className="text-xl font-bold text-primary">{desiredWeight}kg</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Total a Perder</p>
              <p className="text-xl font-bold text-green-500">-{totalWeightToLose}kg</p>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-xs text-muted-foreground">Sua jornada de perda de peso</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 border-t-2 border-dashed border-primary"></div>
              <span className="text-xs text-muted-foreground">Linha da meta ({desiredWeight}kg)</span>
            </div>
          </div>

          {/* Chart Container */}
          <div className="bg-gradient-to-br from-muted/50 to-muted rounded-2xl p-4 shadow-lg">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData} margin={{ top: 30, right: 30, left: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                />
                
                <YAxis 
                  domain={[yMin, yMax]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  tickFormatter={(value) => `${value}kg`}
                  width={50}
                />

                <Tooltip content={<CustomTooltip />} />
                
                {/* Reference line for goal weight */}
                <ReferenceLine 
                  y={desiredWeight} 
                  stroke="hsl(var(--primary))" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                >
                  <Label 
                    value={`Meta: ${desiredWeight}kg`}
                    position="right"
                    fill="hsl(var(--primary))"
                    fontSize={11}
                    fontWeight="bold"
                  />
                </ReferenceLine>

                {/* Reference line for starting weight */}
                <ReferenceLine 
                  y={currentWeight} 
                  stroke="hsl(25, 95%, 53%)" 
                  strokeDasharray="3 3"
                  strokeWidth={1}
                  strokeOpacity={0.5}
                >
                  <Label 
                    value={`Início: ${currentWeight}kg`}
                    position="right"
                    fill="hsl(25, 95%, 53%)"
                    fontSize={11}
                  />
                </ReferenceLine>
                
                {/* Weight progression area */}
                <Area
                  type="monotone"
                  dataKey="peso"
                  stroke="hsl(25, 95%, 53%)"
                  strokeWidth={3}
                  fill="url(#weightGradient)"
                  animationDuration={2500}
                  animationBegin={300}
                  dot={{ 
                    fill: 'hsl(25, 95%, 53%)', 
                    strokeWidth: 2, 
                    stroke: 'white',
                    r: 5
                  }}
                  activeDot={{
                    fill: 'hsl(25, 95%, 53%)',
                    strokeWidth: 3,
                    stroke: 'white',
                    r: 7
                  }}
                >
                  <LabelList 
                    dataKey="peso"
                    position="top"
                    formatter={(value: number, entry: any, index: number) => {
                      // Mostrar apenas no primeiro e último ponto
                      if (index === 0) return `${value}kg`;
                      if (index === chartData.length - 1) return `${value}kg`;
                      return '';
                    }}
                    style={{ 
                      fill: 'hsl(var(--foreground))', 
                      fontSize: 12, 
                      fontWeight: 'bold' 
                    }}
                  />
                </Area>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Stats */}
          <div className="mt-4 bg-muted/30 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-foreground text-center mb-3">📊 Resumo da sua Jornada</h3>
            
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">⏱️ Duração do programa</span>
              <span className="font-semibold text-foreground">{daysNeeded} dias</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">📉 Média de perda semanal</span>
              <span className="font-semibold text-green-500">~{avgWeightLossPerWeek}kg/semana</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">🎯 Data prevista para atingir a meta</span>
              <span className="font-semibold text-primary">{targetDate}</span>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-3 italic">
              * Toque nos pontos do gráfico para ver detalhes de cada etapa
            </p>
          </div>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => navigate("/personal-summary")}
          className="w-full max-w-md mt-8 py-6 text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default WeightProjection;
