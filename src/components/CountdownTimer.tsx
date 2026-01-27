import { useState, useEffect } from "react";
import { AlarmClock } from "lucide-react";

interface CountdownTimerProps {
  show: boolean;
  initialMinutes?: number;
}

const CountdownTimer = ({ show, initialMinutes = 10 }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Convert to seconds

  useEffect(() => {
    if (!show) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-red-600 py-2 px-4 animate-fade-in">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
        {/* Left section with icon and timer label */}
        <div className="flex items-center gap-2">
          <AlarmClock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-pulse" />
          <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide">
            SEU DESCONTO EXPIRA EM:
          </span>
        </div>

        {/* Timer display */}
        <div className="bg-white/10 px-3 py-1 rounded-lg">
          <span className="text-white font-black text-xl sm:text-2xl tabular-nums">
            {formattedTime}
          </span>
        </div>

        {/* Right section with message */}
        <p className="text-white text-xs sm:text-sm text-center sm:text-left">
          Você tem <strong>{initialMinutes} minutos</strong> para garantir esse preço. Depois disso, ele desaparece.
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
