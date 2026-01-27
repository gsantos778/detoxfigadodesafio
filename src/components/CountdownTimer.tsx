import { useState, useEffect, useCallback } from "react";
import { AlarmClock } from "lucide-react";

interface CountdownTimerProps {
  show: boolean;
  initialMinutes?: number;
}

const STORAGE_KEY = "countdownEndTime";

const CountdownTimer = ({ show, initialMinutes = 10 }: CountdownTimerProps) => {
  const getInitialTime = useCallback(() => {
    const savedEndTime = localStorage.getItem(STORAGE_KEY);
    if (savedEndTime) {
      const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000);
      return remaining > 0 ? remaining : 0;
    }
    return initialMinutes * 60;
  }, [initialMinutes]);

  const [timeLeft, setTimeLeft] = useState(getInitialTime);
  const isUrgent = timeLeft <= 120; // Less than 2 minutes

  useEffect(() => {
    if (!show) return;

    // Set end time in localStorage if not already set
    if (!localStorage.getItem(STORAGE_KEY)) {
      const endTime = Date.now() + initialMinutes * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, endTime.toString());
    }

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
  }, [show, initialMinutes]);

  if (!show) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-[60] py-2 px-3 sm:px-4 animate-fade-in transition-colors duration-300 ${
        isUrgent ? 'bg-red-700 animate-pulse' : 'bg-red-600'
      }`}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4">
        {/* Left section with icon and timer label */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <AlarmClock className={`w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 ${isUrgent ? 'animate-bounce' : 'animate-pulse'}`} />
          <span className="text-white font-bold text-[10px] sm:text-xs uppercase tracking-wide">
            SEU DESCONTO EXPIRA EM:
          </span>
        </div>

        {/* Timer display */}
        <div className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg ${isUrgent ? 'bg-yellow-400/30' : 'bg-white/10'}`}>
          <span className={`font-black text-lg sm:text-xl tabular-nums ${isUrgent ? 'text-yellow-300' : 'text-white'}`}>
            {formattedTime}
          </span>
        </div>

        {/* Right section with message - hidden on very small screens */}
        <p className="text-white text-[10px] sm:text-xs text-center hidden xs:block">
          {isUrgent ? (
            <strong className="text-yellow-300">⚠️ CORRA! Últimos minutos!</strong>
          ) : (
            <>Você tem <strong>{initialMinutes} min</strong> para garantir esse preço.</>
          )}
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
