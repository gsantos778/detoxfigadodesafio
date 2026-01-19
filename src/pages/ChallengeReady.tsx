import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import transformationImage from "@/assets/transformation-comparison.png";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

const ChallengeReady = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [animatingCoins, setAnimatingCoins] = useState(false);
  const [coins, setCoins] = useState<number[]>([]);
  const [creditsCount, setCreditsCount] = useState(0);

  useEffect(() => {
    // Show popup after a short delay when page loads
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleReceiveCredits = () => {
    setShowPopup(false);
    setShowCredits(true);
    
    // Start coin animation after a brief delay
    setTimeout(() => {
      setAnimatingCoins(true);
      // Create multiple coins for animation
      setCoins([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      
      // After coins animation, update the credits counter
      setTimeout(() => {
        setAnimatingCoins(false);
        setCoins([]);
        // Animate the counter
        let count = 0;
        const interval = setInterval(() => {
          count += 50;
          if (count >= 1000) {
            setCreditsCount(1000);
            clearInterval(interval);
          } else {
            setCreditsCount(count);
          }
        }, 30);
      }, 1500);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 relative overflow-hidden">
      {/* Credits Display - Top Right */}
      {showCredits && (
        <div 
          className="fixed top-4 right-4 z-50 bg-black/80 text-yellow-400 px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-scale-in text-sm"
          style={{
            boxShadow: '0 0 10px #facc15, 0 0 20px #facc15, 0 0 30px #facc15',
            textShadow: '0 0 5px #facc15, 0 0 10px #facc15'
          }}
        >
          <Coins className="w-4 h-4" />
          <span className="font-bold">{creditsCount}</span>
        </div>
      )}

      {/* Animated Coins */}
      {animatingCoins && coins.map((coin, index) => (
        <div
          key={coin}
          className="fixed z-40 animate-coin-fly"
          style={{
            left: `${30 + Math.random() * 40}%`,
            bottom: '30%',
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-600">
            <span className="text-yellow-800 font-bold text-xs">$</span>
          </div>
        </div>
      ))}

      {/* Congratulations Popup */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-md text-center p-8">
          <div className="space-y-6">
            <div className="text-5xl">🎉</div>
            <h2 className="text-xl font-bold text-gray-800">
              Parabéns, você respondeu todas as perguntas do questionário e ganhou 1000 créditos!
            </h2>
            <Button 
              onClick={handleReceiveCredits}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-lg"
            >
              <Coins className="w-4 h-4 mr-2" />
              RECEBER CRÉDITOS
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Logo */}
      <div className="mb-8">
        <img 
          src={logo} 
          alt="Detox Fígado" 
          className="h-16 w-auto"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          style={{ minHeight: '64px' }}
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 max-w-md">
        Seu desafio pessoal de desintoxicação do fígado está pronto!
      </h1>

      {/* Transformation Image */}
      <div className="w-full max-w-lg">
        {!imageLoaded && (
          <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl animate-pulse" />
        )}
        <img 
          src={transformationImage} 
          alt="Transformação - Antes e Depois" 
          className={`w-full rounded-xl shadow-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
          onLoad={() => setImageLoaded(true)}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Custom styles for coin animation */}
      <style>{`
        @keyframes coin-fly {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-200px) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translateY(-400px) translateX(calc(100vw - 100px)) scale(0.3);
            opacity: 0;
          }
        }
        .animate-coin-fly {
          animation: coin-fly 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChallengeReady;
