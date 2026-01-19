import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import logo from "@/assets/logo.png";
import transformationImage from "@/assets/transformation-comparison.png";
import phoneMockup from "@/assets/phone-mockup-recipe.png";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins, CircleCheck } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Testimonial images
import testimonial1 from "@/assets/testimonial-1.png";
import testimonial2 from "@/assets/testimonial-2.png";
import testimonial3 from "@/assets/testimonial-3.png";
import testimonial4 from "@/assets/testimonial-4.png";
import testimonial5 from "@/assets/testimonial-5.png";
import testimonial6 from "@/assets/testimonial-6.png";

const ChallengeReady = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showCredits, setShowCredits] = useState(true);
  const [animatingCoins, setAnimatingCoins] = useState(false);
  const [coins, setCoins] = useState<number[]>([]);
  const [creditsCount, setCreditsCount] = useState(0);
  const [userGender, setUserGender] = useState<'male' | 'female'>('female');

  useEffect(() => {
    // Get user gender from localStorage
    const savedGender = localStorage.getItem('userGender');
    if (savedGender === 'male' || savedGender === 'female') {
      setUserGender(savedGender);
    }

    // Show popup after a short delay when page loads
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleReceiveCredits = () => {
    setShowPopup(false);
    
    // Start coin animation after a brief delay
    setTimeout(() => {
      setAnimatingCoins(true);
      // Create multiple coins for animation
      setCoins([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      
      // After coins animation, update the credits counter
      setTimeout(() => {
        setAnimatingCoins(false);
        setCoins([]);
        // Animate the counter from 0 to 1000
        setCreditsCount(0);
        let count = 0;
        const interval = setInterval(() => {
          count += 25;
          if (count >= 1000) {
            setCreditsCount(1000);
            clearInterval(interval);
          } else {
            setCreditsCount(count);
          }
        }, 20);
      }, 1500);
    }, 300);
  };

  // Benefícios para mulheres
  const femaleBenefits = [
    {
      title: "Planos de refeições personalizados para mulheres",
      description: "Receba planos alimentares elaborados especialmente para o corpo feminino, promovendo a saúde do fígado e equilíbrio hormonal. Cada plano prioriza alimentos desintoxicantes que ajudam na TPM, menopausa e retenção de líquidos."
    },
    {
      title: "Receitas deliciosas e listas de compras",
      description: "Descubra receitas saborosas que nutrem o fígado e aceleram o metabolismo feminino. Nossas listas de compras facilitam sua rotina, tornando o processo simples para mulheres ocupadas."
    },
    {
      title: "Rastreador diário",
      description: "Mantenha-se motivada monitorando suas refeições, ciclo menstrual, energia e progresso. Esse acompanhamento ajuda você a se manter comprometida e a ajustar seu plano para maximizar seus resultados."
    }
  ];

  // Benefícios para homens
  const maleBenefits = [
    {
      title: "Planos de refeições personalizados para homens",
      description: "Receba planos alimentares elaborados especialmente para o corpo masculino, promovendo a saúde do fígado e níveis saudáveis de testosterona. Cada plano prioriza alimentos que aumentam energia e força muscular."
    },
    {
      title: "Receitas deliciosas e listas de compras",
      description: "Descubra receitas saborosas e substanciosas que nutrem o fígado e aceleram o metabolismo masculino. Nossas listas de compras são práticas e diretas ao ponto."
    },
    {
      title: "Rastreador diário",
      description: "Mantenha-se motivado monitorando suas refeições, ingestão de água, energia e performance. Esse acompanhamento ajuda você a se manter comprometido e a atingir suas metas de forma eficiente."
    }
  ];

  const benefits = userGender === 'female' ? femaleBenefits : maleBenefits;

  // Testimonials carousel
  const testimonials = [testimonial1, testimonial2, testimonial3, testimonial4, testimonial5, testimonial6];
  
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'center', slidesToScroll: 1 },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 relative overflow-hidden">
      {/* Credits Display - Top Right */}
      {showCredits && (
        <div className="fixed top-4 right-4 z-50 flex flex-col items-center gap-1 animate-scale-in">
          <span className="text-xs font-semibold text-gray-600">créditos</span>
          <div 
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm"
            style={{
              boxShadow: '0 0 10px #34d399, 0 0 20px #34d399, 0 0 30px #10b981',
            }}
          >
            <Coins className="w-4 h-4" />
            <span className="font-bold">{creditsCount}</span>
          </div>
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
      <div className="w-full max-w-lg mb-16">
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

      {/* O que você recebe Section */}
      <section className="w-full px-4 py-12" style={{ backgroundColor: '#EFF8F2' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            O que você recebe
          </h2>
          <p className="text-lg font-semibold text-gray-800 mb-4">Um Aplicativo elaborado com:</p>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {/* Benefits List - LEFT */}
            <div className="flex-1 space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <CircleCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Phone Mockup - RIGHT */}
            <div className="flex-shrink-0 w-full md:w-48 flex justify-center md:justify-end">
              <img 
                src={phoneMockup} 
                alt="App de receitas" 
                className="w-full max-w-[180px] drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full px-4 py-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            O que as pessoas têm a dizer
          </h2>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full flex justify-center px-4"
                >
                  <img
                    src={testimonial}
                    alt={`Depoimento ${index + 1}`}
                    className="max-w-[220px] md:max-w-[280px] rounded-xl shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
