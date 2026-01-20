import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import logo from "@/assets/logo.png";
import transformationImage from "@/assets/transformation-comparison.png";
import phoneMockup from "@/assets/phone-mockup-recipe.png";
import guiaSubstituicoes from "@/assets/guia-substituicoes.png";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins, CircleCheck, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Testimonial images
import testimonial1 from "@/assets/testimonial-1.png";
import testimonial2 from "@/assets/testimonial-2.png";
import testimonial3 from "@/assets/testimonial-3.png";
import testimonial4 from "@/assets/testimonial-4.png";
import testimonial5 from "@/assets/testimonial-5.png";
import testimonial6 from "@/assets/testimonial-6.png";
import produtoDetox from "@/assets/produto-detox.png";
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
  const femaleBenefits = [{
    title: "Planos de refeições personalizados para mulheres",
    description: "Receba planos alimentares elaborados especialmente para o corpo feminino, promovendo a saúde do fígado e equilíbrio hormonal. Cada plano prioriza alimentos desintoxicantes que ajudam na TPM, menopausa e retenção de líquidos."
  }, {
    title: "Receitas deliciosas e listas de compras",
    description: "Descubra receitas saborosas que nutrem o fígado e aceleram o metabolismo feminino. Nossas listas de compras facilitam sua rotina, tornando o processo simples para mulheres ocupadas."
  }, {
    title: "Rastreador diário",
    description: "Mantenha-se motivada monitorando suas refeições, ciclo menstrual, energia e progresso. Esse acompanhamento ajuda você a se manter comprometida e a ajustar seu plano para maximizar seus resultados."
  }, {
    title: "Protocolo Anti-Inflamatório e Barriga Zero",
    description: "Aprenda a combinar alimentos que combatem a inflamação sistêmica, reduzindo drasticamente o inchaço abdominal e a sensação de 'estufamento' logo nas primeiras semanas."
  }, {
    title: "Suporte ao Ciclo e Equilíbrio Hormonal",
    description: "Orientações específicas para cada fase do seu ciclo menstrual, ajudando a controlar a compulsão por doces e a irritabilidade através de nutrientes estratégicos para o fígado."
  }];

  // Bônus
  const bonusBenefit = {
    title: "🎁 BÔNUS: Guia de Substituições Inteligentes",
    description: "Não deixe de comer o que gosta. Tenha em mãos uma lista prática para substituir ingredientes calóricos por opções saudáveis e detoxificantes sem perder o sabor das suas refeições.",
    originalPrice: "R$ 57",
    price: "GRÁTIS"
  };

  // Benefícios para homens
  const maleBenefits = [{
    title: "Planos de refeições personalizados para homens",
    description: "Receba planos alimentares elaborados especialmente para o corpo masculino, promovendo a saúde do fígado e níveis saudáveis de testosterona. Cada plano prioriza alimentos que aumentam energia e força muscular."
  }, {
    title: "Receitas deliciosas e listas de compras",
    description: "Descubra receitas saborosas e substanciosas que nutrem o fígado e aceleram o metabolismo masculino. Nossas listas de compras são práticas e diretas ao ponto."
  }, {
    title: "Rastreador diário",
    description: "Mantenha-se motivado monitorando suas refeições, ingestão de água, energia e performance. Esse acompanhamento ajuda você a se manter comprometido e a atingir suas metas de forma eficiente."
  }, {
    title: "Protocolo Anti-Inflamatório e Barriga Zero",
    description: "Aprenda a combinar alimentos que combatem a inflamação sistêmica, reduzindo drasticamente o inchaço abdominal e a sensação de 'estufamento' logo nas primeiras semanas."
  }];
  const benefits = userGender === 'female' ? femaleBenefits : maleBenefits;

  // Testimonials carousel
  const testimonials = [testimonial1, testimonial2, testimonial3, testimonial4, testimonial5, testimonial6];
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center'
  }, [Autoplay({
    delay: 4000,
    stopOnInteraction: true
  })]);
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);
  
  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);
  return <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 relative overflow-hidden">
      {/* Credits Display - Top Right */}
      {showCredits && <div className="fixed top-4 right-4 z-50 flex flex-col items-center gap-1 animate-scale-in">
          <span className="text-xs font-semibold text-gray-600">créditos</span>
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm" style={{
        boxShadow: '0 0 10px #34d399, 0 0 20px #34d399, 0 0 30px #10b981'
      }}>
            <Coins className="w-4 h-4" />
            <span className="font-bold">{creditsCount}</span>
          </div>
        </div>}

      {/* Animated Coins */}
      {animatingCoins && coins.map((coin, index) => <div key={coin} className="fixed z-40 animate-coin-fly" style={{
      left: `${30 + Math.random() * 40}%`,
      bottom: '30%',
      animationDelay: `${index * 0.1}s`
    }}>
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-600">
            <span className="text-yellow-800 font-bold text-xs">$</span>
          </div>
        </div>)}

      {/* Congratulations Popup */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-md text-center p-8">
          <div className="space-y-6">
            <div className="text-5xl">🎉</div>
            <h2 className="text-xl font-bold text-gray-800">
              Parabéns, você respondeu todas as perguntas do questionário e ganhou 1000 créditos!
            </h2>
            <Button onClick={handleReceiveCredits} className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-lg">
              <Coins className="w-4 h-4 mr-2" />
              RECEBER CRÉDITOS
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Logo */}
      <div className="mb-8">
        <img src={logo} alt="Detox Fígado" className="h-16 w-auto" loading="eager" decoding="sync" fetchPriority="high" style={{
        minHeight: '64px'
      }} />
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 max-w-md">
        Seu desafio pessoal de desintoxicação do fígado está pronto!
      </h1>

      {/* Transformation Image */}
      <div className="w-full max-w-lg mb-6">
        {!imageLoaded && <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl animate-pulse" />}
        <img src={transformationImage} alt="Transformação - Antes e Depois" className={`w-full rounded-xl shadow-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute'}`} onLoad={() => setImageLoaded(true)} loading="eager" decoding="async" />
      </div>

      {/* O que você recebe Section */}
      <section className="w-full px-4 py-12" style={{
      backgroundColor: '#EFF8F2'
    }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center uppercase tracking-wide">
            O QUE VOCÊ VAI RECEBER
          </h2>
          <p className="text-xl font-bold text-gray-800 mb-6 underline decoration-green-500 decoration-2 underline-offset-4">📱 Aplicativo elaborado com:</p>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {/* Benefits List - LEFT */}
            <div className="flex-1 space-y-6">
              {benefits.map((benefit, index) => <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <CircleCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{benefit.description}</p>
                  </div>
                </div>)}
              
              {/* Bonus Section */}
              <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-xl">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-shrink-0 flex justify-center">
                    <img 
                      src={guiaSubstituicoes} 
                      alt="Guia de Substituições Inteligentes" 
                      className="w-full max-w-[280px] md:max-w-[200px] rounded-lg shadow-md"
                    />
                  </div>
                  <div className="flex gap-3 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      <CircleCheck className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-lg font-bold text-gray-800">{bonusBenefit.title}</h3>
                        <span className="text-sm line-through text-gray-400">{bonusBenefit.originalPrice}</span>
                        <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">{bonusBenefit.price}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm">{bonusBenefit.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Phone Mockup - RIGHT */}
            <div className="flex-shrink-0 w-full md:w-64 flex justify-center md:justify-end">
              <img src={phoneMockup} alt="App de receitas" className="w-full max-w-[320px] drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full px-4 pt-4 pb-12 bg-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center leading-tight">
            Mais de <span className="text-green-600">287 mulheres</span> que recuperaram a autoestima e a saúde do fígado ✨
          </h2>
          
          <div className="relative">
            {/* Arrows */}
            <button 
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button 
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
            
            <div className="overflow-hidden mx-10" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex-shrink-0 w-full md:w-1/3 flex justify-center px-2 md:px-4">
                    <img 
                      src={testimonial} 
                      alt={`Depoimento ${index + 1}`} 
                      className="max-w-[280px] md:max-w-[240px] rounded-xl shadow-lg" 
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === selectedIndex 
                      ? 'bg-green-600 w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Price Block Section */}
      <section className="max-w-[1100px] mx-auto my-9 px-6">
        <div className="bg-gradient-to-br from-[#eaf9f0] to-[#f7fff7] rounded-2xl p-6 shadow-[0_8px_24px_rgba(10,107,72,0.08)]">
          <h2 className="text-center text-[#0a573f] text-xl md:text-2xl font-bold mb-5">
            Recupere sua saúde e autoestima por menos de um café por dia ✨
          </h2>

          <div className="flex flex-col gap-4 items-center p-4 bg-white rounded-xl shadow-[0_6px_16px_rgba(4,85,48,0.04)]">
            <img 
              src={produtoDetox} 
              alt="Protocolo Detox Fígado + Guia de Substituições" 
              className="max-w-full h-auto max-h-[300px] object-contain"
            />
            <div className="w-full text-center">
              <p className="font-bold text-[#0a6b48] mb-1">Protocolo Detox Fígado + Bônus</p>
              <p className="text-gray-500 text-sm">
                Valor total: <span className="line-through opacity-90">R$ 441,00</span>
              </p>
            </div>

            <div className="flex-1 min-w-[280px] text-center p-3">
              <p className="text-[#0a6b48] font-semibold text-sm">Oferta especial</p>
              <p className="text-4xl md:text-5xl font-black text-[#0a6b48] my-1">
                R$ <span>57</span><small className="text-sm font-bold">,00</small>
              </p>
              <p className="text-[#2b6b4a] font-semibold my-1 mb-3">
                ou 12x de <strong>R$ 4,75</strong> sem juros
              </p>
              <a 
                href="#checkout" 
                className="inline-block bg-[#0ea06b] text-white py-3.5 px-9 rounded-full font-extrabold shadow-[0_8px_20px_rgba(14,160,107,0.2)] hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(14,160,107,0.28)] transition-all duration-200"
              >
                QUERO COMEÇAR MEU DETOX AGORA
              </a>
              <p className="mt-2.5 text-gray-500 text-sm">
                Desconto aplicado no checkout • Garantia incondicional de 7 dias
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-4 text-[#4c6b55] font-semibold">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg">🔒 Pagamento 100% seguro</div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg">✅ Garantia 7 dias</div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg">💬 Suporte 30 dias</div>
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
    </div>;
};
export default ChallengeReady;