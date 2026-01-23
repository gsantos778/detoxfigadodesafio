import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import logo from "@/assets/logo.png";
import TransformationComparison from "@/components/TransformationComparison";
import phoneMockup from "@/assets/phone-mockup-recipe.png";
import guiaSubstituicoes from "@/assets/guia-substituicoes.png";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Coins, CircleCheck, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Testimonial images - Female
import testimonial1 from "@/assets/testimonial-1.png";
import testimonial2 from "@/assets/testimonial-2.png";
import testimonial3 from "@/assets/testimonial-3.png";
import testimonial4 from "@/assets/testimonial-4.png";
import testimonial5 from "@/assets/testimonial-5.png";
import testimonial6 from "@/assets/testimonial-6.png";

// Testimonial images - Male
import testimonialMale1 from "@/assets/testimonial-male-1.png";
import testimonialMale2 from "@/assets/testimonial-male-2.png";
import testimonialMale3 from "@/assets/testimonial-male-3.png";
import testimonialMale4 from "@/assets/testimonial-male-4.png";
import testimonialMale5 from "@/assets/testimonial-male-5.png";
import testimonialMale6 from "@/assets/testimonial-male-6.png";
import testimonialMale7 from "@/assets/testimonial-male-7.png";
import testimonialMale8 from "@/assets/testimonial-male-8.png";
import produtoDetox from "@/assets/produto-detox.png";
import badgeCompraSegura from "@/assets/badge-compra-segura.png";
import badgeSatisfacaoGarantida from "@/assets/badge-satisfacao-garantida.jpg";
import badgePrivacidadeProtegida from "@/assets/badge-privacidade-protegida.jpg";
import garantia15DiasImg from "@/assets/15-dias-garantia.png";

// Social proof images
import provaSocialKoreena from "@/assets/prova-social-koreena.png";
import provaSocialSandra from "@/assets/prova-social-sandra.png";
import provaSocialMike from "@/assets/prova-social-mike.png";
const ChallengeReady = () => {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showCredits, setShowCredits] = useState(true);
  const [animatingCoins, setAnimatingCoins] = useState(false);
  const [coins, setCoins] = useState<number[]>([]);
  const [creditsCount, setCreditsCount] = useState(0);
  const [userGender, setUserGender] = useState<'male' | 'female'>('female');
  const [creditsReceived, setCreditsReceived] = useState(false);

  // Gamification states
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<{
    id: number;
    startX: number;
    startY: number;
    velocityX: number;
    velocityY: number;
    color: string;
    delay: number;
    size: number;
    rotation: number;
    shape: string;
  }[]>([]);

  // Preload all critical images on mount
  useEffect(() => {
    const imagesToPreload = [phoneMockup, produtoDetox, guiaSubstituicoes, ...testimonials];
    let loadedCount = 0;
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imagesToPreload.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);
  useEffect(() => {
    // Get user gender from localStorage
    const savedGender = localStorage.getItem('userGender');
    if (savedGender === 'male' || savedGender === 'female') {
      setUserGender(savedGender);
    }

    // Check if credits were already received
    const creditsAlreadyReceived = localStorage.getItem('creditsReceived') === 'true';
    
    if (creditsAlreadyReceived) {
      // If already received, show credits counter with 1000 immediately
      setCreditsReceived(true);
      setCreditsCount(1000);
    } else {
      // Show popup after a short delay when page loads (only first time)
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);
  const handleReceiveCredits = () => {
    setShowPopup(false);
    setCreditsReceived(true);
    
    // Save to localStorage so popup doesn't appear again
    localStorage.setItem('creditsReceived', 'true');
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

  // Handle apply discount with gamification
  const handleApplyDiscount = () => {
    setIsApplyingDiscount(true);
    setLoadingProgress(0);

    // Animate loading bar from 0 to 100
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Small delay to let user see 100%, then hide bar and trigger confetti
          setTimeout(() => {
            setIsApplyingDiscount(false); // Hide the loading bar first
            triggerConfetti(); // Then trigger confetti immediately
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };
  const triggerConfetti = () => {
    // Show purchase button immediately when confetti starts
    setDiscountApplied(true);
    setShowConfetti(true);

    // Fire multiple bursts for a more dramatic effect
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const colors = ['#0ea06b', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FF69B4', '#00CED1'];
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    // Initial big burst from center
    confetti({
      particleCount: 100,
      spread: 100,
      origin: {
        x: 0.5,
        y: 0.6
      },
      colors: colors,
      startVelocity: 45,
      gravity: 0.8,
      scalar: 1.2,
      drift: 0
    });

    // Continuous bursts
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        setShowConfetti(false);
        return;
      }
      const particleCount = 50 * (timeLeft / duration);

      // Left side burst
      confetti({
        particleCount: Math.floor(particleCount / 2),
        angle: 60,
        spread: 55,
        origin: {
          x: 0,
          y: 0.6
        },
        colors: colors,
        startVelocity: randomInRange(30, 50),
        gravity: 1,
        scalar: randomInRange(0.8, 1.2)
      });

      // Right side burst
      confetti({
        particleCount: Math.floor(particleCount / 2),
        angle: 120,
        spread: 55,
        origin: {
          x: 1,
          y: 0.6
        },
        colors: colors,
        startVelocity: randomInRange(30, 50),
        gravity: 1,
        scalar: randomInRange(0.8, 1.2)
      });
    }, 250);
    setShowConfetti(true);
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
  const femaleTestimonials = [testimonial1, testimonial2, testimonial3, testimonial4, testimonial5, testimonial6];
  const maleTestimonials = [testimonialMale1, testimonialMale2, testimonialMale3, testimonialMale4, testimonialMale5, testimonialMale6, testimonialMale7, testimonialMale8];
  const testimonials = userGender === 'male' ? maleTestimonials : femaleTestimonials;
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
  return <div className="min-h-screen bg-white flex flex-col items-center px-0 sm:px-4 py-6 sm:py-8 relative overflow-hidden">
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
        <DialogContent className="max-w-[90vw] sm:max-w-md text-center p-4 sm:p-8">
          <div className="space-y-4 sm:space-y-6">
            <div className="text-4xl sm:text-5xl">🎉</div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Parabéns, você respondeu todas as perguntas do questionário e ganhou 1000 créditos!
            </h2>
            <Button onClick={handleReceiveCredits} className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold px-4 sm:px-6 py-2 rounded-full shadow-lg text-sm sm:text-base">
              <Coins className="w-4 h-4 mr-2" />
              RECEBER CRÉDITOS
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Logo */}
      <div className="mb-6 sm:mb-8 px-4">
        <img src={logo} alt="Detox Fígado" className="h-14 sm:h-16 w-auto" loading="eager" decoding="sync" fetchPriority="high" width="150" height="64" />
      </div>

      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8 max-w-md px-4">
        Seu desafio pessoal de desintoxicação do fígado está pronto!
      </h1>

      {/* Transformation Comparison */}
      <div className="w-full max-w-lg mb-6 px-4">
        <TransformationComparison userGender={userGender} startAnimation={creditsReceived} />
      </div>

      {/* O que você recebe Section */}
      <section className="w-full px-4 py-8 sm:py-12" style={{
      backgroundColor: '#EFF8F2'
    }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-800 mb-6 sm:mb-8 text-center uppercase tracking-wide">
            O QUE VOCÊ VAI RECEBER
          </h2>
          <p className="text-base sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 underline decoration-green-500 decoration-2 underline-offset-4">📱 Aplicativo elaborado com:</p>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            {/* Benefits List - LEFT */}
            <div className="flex-1 space-y-4 sm:space-y-6">
              {benefits.map((benefit, index) => <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <CircleCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">{benefit.description}</p>
                  </div>
                </div>)}
              
              {/* Bonus Section */}
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-xl">
                <div className="flex flex-col gap-4">
                  <div className="flex-shrink-0 flex justify-center">
                    <img src={guiaSubstituicoes} alt="Guia de Substituições Inteligentes" className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[200px] rounded-lg shadow-md" loading="lazy" width="200" height="200" />
                  </div>
                  <div className="flex gap-3 flex-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <CircleCheck className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800">{bonusBenefit.title}</h3>
                        <span className="text-xs sm:text-sm line-through text-gray-400">{bonusBenefit.originalPrice}</span>
                        <span className="text-xs sm:text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">{bonusBenefit.price}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">{bonusBenefit.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Phone Mockup - RIGHT */}
            <div className="flex-shrink-0 w-full md:w-64 flex justify-center md:justify-end order-first md:order-last">
              <img src={phoneMockup} alt="App de receitas" className="w-full max-w-[240px] sm:max-w-[320px] drop-shadow-2xl" loading="lazy" width="320" height="640" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full px-2 sm:px-4 pt-4 pb-8 sm:pb-12 bg-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg sm:text-2xl md:text-4xl font-extrabold text-gray-800 mb-6 sm:mb-8 text-center leading-tight px-2">
            {userGender === 'male' 
              ? <>Mais de <span className="text-green-600">287 homens</span> que recuperaram a energia e a saúde do fígado 💪</>
              : <>Mais de <span className="text-green-600">287 mulheres</span> que recuperaram a autoestima e a saúde do fígado ✨</>
            }
          </h2>
          
          <div className="relative">
            {/* Arrows */}
            <button onClick={scrollPrev} className="absolute -left-1 sm:left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>
            <button onClick={scrollNext} className="absolute -right-1 sm:right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>
            
            <div className="overflow-hidden mx-6 sm:mx-10" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => <div key={index} className="flex-shrink-0 w-full md:w-1/3 flex justify-center px-1 sm:px-2 md:px-4">
                    <img src={testimonial} alt={`Depoimento ${index + 1}`} className="max-w-[240px] sm:max-w-[280px] md:max-w-[240px] rounded-xl shadow-lg" loading="lazy" width="240" height="320" />
                  </div>)}
              </div>
            </div>
            
            {/* Dots */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
              {testimonials.map((_, index) => <button key={index} onClick={() => scrollTo(index)} className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${index === selectedIndex ? 'bg-green-600 w-5 sm:w-6' : 'bg-gray-300 hover:bg-gray-400'}`} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Price Block Section */}
      <section className="max-w-[1100px] mx-auto my-6 sm:my-9 px-3 sm:px-6">
        <div className="bg-[#9be4b5] rounded-2xl p-4 sm:p-6 shadow-[0_8px_24px_rgba(10,107,72,0.2)]">
          <h2 className="text-center text-[#0a573f] text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5">
            Recupere sua saúde e autoestima por menos de um café por dia ✨
          </h2>

          <div className="flex flex-col gap-3 sm:gap-4 items-center p-3 sm:p-4 bg-white rounded-xl shadow-[0_6px_16px_rgba(4,85,48,0.04)]">
            <img src={produtoDetox} alt="Protocolo Detox Fígado + Guia de Substituições" className="max-w-full h-auto max-h-[200px] sm:max-h-[300px] object-contain" loading="lazy" width="300" height="300" />
            <div className="w-full text-center">
              <p className="font-bold text-[#0a6b48] mb-1 text-sm sm:text-base">Protocolo Detox Fígado + Bônus</p>
            </div>

            <div className="flex-1 min-w-[240px] sm:min-w-[280px] text-center p-2 sm:p-3">
              <p className="text-[#0a6b48] font-semibold text-xs sm:text-sm">Oferta especial</p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a6b48] my-1">
                R$ <span>57</span><small className="text-xs sm:text-sm font-bold">,00</small>
              </p>
              <p className="text-[#2b6b4a] font-semibold my-1 mb-2 sm:mb-3 text-sm sm:text-base">
                ou 12x de <strong>R$ 4,75</strong> sem juros
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center mt-3 sm:mt-4">
            <img src={badgeCompraSegura} alt="Compra Segura" className="h-10 sm:h-12 w-auto object-contain rounded-lg" loading="lazy" />
            <img src={badgeSatisfacaoGarantida} alt="Satisfação Garantida" className="h-10 sm:h-12 w-auto object-contain rounded-lg" loading="lazy" />
            <img src={badgePrivacidadeProtegida} alt="Privacidade Protegida" className="h-10 sm:h-12 w-auto object-contain rounded-lg" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Discount Block - Use Credits */}
      <section className="max-w-[1100px] mx-auto mb-6 sm:mb-9 px-3 sm:px-6">
        <div className="bg-[#d4f5e0] rounded-2xl p-4 sm:p-6 shadow-[0_8px_24px_rgba(10,107,72,0.1)] text-center">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-[#0a573f] to-[#0ea06b] text-white rounded-xl shadow-lg inline-block" style={{
          fontFamily: "'Trebuchet MS', 'Lucida Sans', sans-serif"
        }}>
            🎁 Use seus créditos do Quiz e ganhe desconto
          </h3>
          <p className="text-base sm:text-lg text-[#0a573f] mb-1 mt-4 sm:mt-6">
            Você acumulou <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#0ea06b]">1000 CRÉDITOS</span> no sistema.
          </p>
          <p className="text-xs text-red-500 mb-2">
            Seus créditos são exibidos no canto superior direito da tela.
          </p>
          <p className="text-[#0a573f] mb-6 sm:mb-10 mt-4 sm:mt-8 text-sm sm:text-base">
            E esses 1000 créditos podem ser usados <strong>AGORA</strong> para reduzir ainda mais o preço do <span className="font-bold text-[#0ea06b]">Protocolo Detox</span>.
          </p>

          <div className="text-left mb-4 sm:mb-6">
            <p className="font-bold text-[#0a573f] mb-2 text-sm sm:text-base">Funciona assim:</p>
            <div className="text-[#0a573f] space-y-2 sm:space-y-3 text-sm sm:text-base">
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="bg-[#0ea06b] text-white font-bold w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center text-xs sm:text-sm flex-shrink-0">1</span>
                <div>
                  Abaixo, você verá um botão:
                  <div className="font-bold text-[#0ea06b] mt-2 sm:mt-3 text-sm sm:text-base">APLIQUE SEUS CRÉDITOS PARA OBTER DESCONTO</div>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="bg-[#0ea06b] text-white font-bold w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center text-xs sm:text-sm flex-shrink-0">2</span>
                <span>Ao clicar, os 1000 créditos serão aplicados automaticamente.</span>
              </div>
            </div>
          </div>

        </div>
        
        <div className="text-center mt-4 sm:mt-6">
          {!discountApplied && !isApplyingDiscount && <button className="relative bg-[#0ea06b] hover:bg-[#0a6b48] text-white font-bold px-4 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-lg shadow-[0_8px_20px_rgba(14,160,107,0.3)] transition-colors duration-300 cursor-pointer overflow-hidden animate-button-pulse" onClick={handleApplyDiscount}>
              <span className="relative z-10">APLIQUE SEUS CRÉDITOS PARA OBTER DESCONTO</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-button-shine"></span>
            </button>}

          {/* Loading Bar */}
          {isApplyingDiscount && !discountApplied && <div className="max-w-xs sm:max-w-sm mx-auto bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100">
              <p className="text-[#0a573f] font-bold mb-3 sm:mb-4 text-base sm:text-lg">⚡ Aplicando seus créditos...</p>
              <div className="w-full bg-gray-200 rounded-full h-6 sm:h-8 overflow-hidden shadow-inner relative">
                <div className="h-full bg-gradient-to-r from-[#0ea06b] via-[#12c77e] to-[#0ea06b] rounded-full transition-all duration-100 relative overflow-hidden" style={{
              width: `${loadingProgress}%`
            }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>
                <span className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold text-gray-700">
                  {loadingProgress}%
                </span>
              </div>
            </div>}

          {/* Flash Effect when confetti starts */}
          {showConfetti && <div className="fixed inset-0 pointer-events-none z-40">
              <div className="absolute inset-0 bg-yellow-300/20 animate-flash"></div>
            </div>}

          {/* Discount Applied - Show Purchase Button */}
          {discountApplied && <div className="animate-bounce-in">
              <div className="max-w-xs sm:max-w-sm mx-auto px-2">
                {/* Price display with animations */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <span className="text-red-500 line-through text-xl sm:text-2xl font-bold animate-shake">R$ 57,00</span>
                  <span className="text-[#0ea06b] font-black text-3xl sm:text-4xl animate-price-pop">R$ 37,00</span>
                </div>
                
                <button className="relative bg-[#0ea06b] hover:bg-[#0a6b48] text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl shadow-[0_8px_20px_rgba(14,160,107,0.4)] transition-all duration-300 cursor-pointer overflow-hidden animate-button-pulse w-full" onClick={() => window.open('https://pay.hotmart.com/SEU_LINK', '_blank')}>
                  <span className="relative z-10">GARANTIR MEU DESCONTO</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-button-shine"></span>
                </button>
              </div>
            </div>}
        </div>
      </section>

      {/* 7 Days Guarantee Section - closer to button above */}
      <section className="w-full max-w-[900px] mx-auto mt-0 md:mt-1 mb-8 md:mb-12 px-4">
        <div className="bg-gradient-to-br from-[#98e6c2] to-[#2fb673] rounded-3xl p-5 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-[rgba(234,249,240,0.6)]">
            {/* Badge Image */}
            <div className="flex-shrink-0">
              <img src={garantia15DiasImg} alt="Garantia 15 Dias Incondicional" className="w-32 h-32 md:w-40 md:h-40 object-contain" />
            </div>

            {/* Content */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black mb-6 md:mb-8" style={{
              fontFamily: "'Trebuchet MS', 'Arial Black', sans-serif"
            }}>
                <span className="bg-gradient-to-r from-[#0a6b48] to-[#0ea06b] bg-clip-text text-transparent">Risco Zero para Você!</span> ✨
              </h2>
              <p className="text-[#184c39] leading-relaxed mb-3 text-sm md:text-base">
                Eu tenho tanta confiança no <strong>Protocolo Detox Fígado</strong> e nos resultados que ele entrega, que vou tirar todo o peso das suas costas.
              </p>
              <p className="text-[#184c39] leading-relaxed mb-5 md:mb-6 text-sm md:text-base">
                Você tem <strong>15 dias inteiros</strong> para testar o aplicativo, as receitas e o guia de bônus. Se por qualquer motivo você sentir que o desafio não é para você, basta nos enviar um e-mail.
              </p>
              <p className="text-[#0a6b48] font-bold bg-[#eaf9f0] px-3 py-2 rounded-lg inline-block mb-4 text-sm md:text-base">
                Nós devolveremos 100% do seu dinheiro, sem perguntas e sem burocracia. Simples assim.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 font-bold text-[#0ea06b] text-sm">
                <span>🔒 Compra 100% Segura</span>
                <span>🛡️ Satisfação Garantida</span>
              </div>
            </div>
          </div>
        </div>

        {/* Second Apply Credits Button */}
        <div className="text-center mt-6">
          {!discountApplied && !isApplyingDiscount && <button className="relative bg-[#0ea06b] hover:bg-[#0a6b48] text-white font-bold px-4 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-lg shadow-[0_8px_20px_rgba(14,160,107,0.3)] transition-colors duration-300 cursor-pointer overflow-hidden animate-button-pulse" onClick={handleApplyDiscount}>
              <span className="relative z-10">APLIQUE SEUS CRÉDITOS PARA OBTER DESCONTO</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-button-shine"></span>
            </button>}

          {/* Loading Bar */}
          {isApplyingDiscount && !discountApplied && <div className="max-w-xs sm:max-w-sm mx-auto bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100">
              <p className="text-[#0a573f] font-bold mb-3 sm:mb-4 text-base sm:text-lg">⚡ Aplicando seus créditos...</p>
              <div className="w-full bg-gray-200 rounded-full h-6 sm:h-8 overflow-hidden shadow-inner relative">
                <div className="h-full bg-gradient-to-r from-[#0ea06b] via-[#12c77e] to-[#0ea06b] rounded-full transition-all duration-100 relative overflow-hidden" style={{
              width: `${loadingProgress}%`
            }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>
                <span className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold text-gray-700">
                  {loadingProgress}%
                </span>
              </div>
            </div>}

          {/* Flash Effect when confetti starts */}
          {showConfetti && <div className="fixed inset-0 pointer-events-none z-40">
              <div className="absolute inset-0 bg-yellow-300/20 animate-flash"></div>
            </div>}

          {/* Discount Applied - Show Purchase Button */}
          {discountApplied && <div className="animate-bounce-in">
              <div className="max-w-xs sm:max-w-sm mx-auto px-2">
                {/* Price display with animations */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <span className="text-red-500 line-through text-xl sm:text-2xl font-bold animate-shake">R$ 57,00</span>
                  <span className="text-[#0ea06b] font-black text-3xl sm:text-4xl animate-price-pop">R$ 37,00</span>
                </div>
                
                <button className="relative bg-[#0ea06b] hover:bg-[#0a6b48] text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl shadow-[0_8px_20px_rgba(14,160,107,0.4)] transition-all duration-300 cursor-pointer overflow-hidden animate-button-pulse w-full" onClick={() => window.open('https://pay.hotmart.com/SEU_LINK', '_blank')}>
                  <span className="relative z-10">GARANTIR MEU DESCONTO</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-button-shine"></span>
                </button>
              </div>
            </div>}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="-mt-6 pb-12 px-4">
        <div className="w-full max-w-[95%] sm:max-w-[900px] mx-auto bg-gray-100 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-4xl font-black text-[#0a573f] text-center mb-8" style={{
          fontFamily: "'Trebuchet MS', sans-serif",
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
            Perguntas Frequentes
          </h2>
          
          <Accordion type="single" collapsible className="space-y-3 text-left w-full">
            <AccordionItem value="item-1" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                Quanto tempo leva para ver resultado?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                Em geral clientes relatam redução de inchaço e mais disposição já nas 1–2 primeiras semanas; mudanças de composição corporal (gordura) tendem a aparecer em 3–8 semanas dependendo da dedicação. Resultados variam por metabolismo, histórico e adesão ao protocolo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                Isso funciona para todos os tipos de corpo / idade?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                O protocolo foi desenhado para mulheres adultas e tem adaptações para diferentes fases (menopausa, TPM). E sim, funciona para todas as idades, aquela ideia de que é mais difícil de emagrecer depois dos 40 é mito, temos várias alunas que emagreceram até depois dos 55.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                Posso perder peso rápido com segurança?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                O foco é emagrecimento saudável e sustentável trabalhando o fígado e o equilíbrio hormonal. Não prometemos "perda milagrosa"; priorizamos saúde, redução de inchaço e ganho de bem-estar com métodos seguros. Mas é certo que com o nosso detox você irá perder peso em ritmo acelerado, principalmente as que aderiram ao projeto treino em casa.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                Posso fazer se estiver grávida ou amamentando?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                Gestantes e lactantes devem consultar o médico antes de qualquer mudança alimentar ou suplementação. Temos materiais adaptáveis, mas a recomendação médica precede a adesão.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                Existem restrições alimentares (vegana, intolerância, alergias)?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                Sim — o plano inclui alternativas. Receitas e listas de compras têm substituições para vegetarianas/veganas e sugestões para intolerâncias comuns. Informe suas restrições e utilize as substituições sugeridas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                Quanto tempo por dia preciso dedicar?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                A grande maioria das rotinas pode ser seguida com 10–30 minutos por dia entre planejamento, preparo e uso do app. O conteúdo foi pensado para mulheres ocupadas — há versões rápidas e práticas de cada etapa.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                Preciso de equipamentos ou academia?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                Não. Os treinos e atividades propostas têm versões sem equipamentos e com alternativas simples para fazer em casa.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                O conteúdo é personalizado?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                Sim. Há planos de refeição e recomendações adaptadas ao perfil feminino e masculino, além de orientações para ajustar conforme ciclo menstrual e disponibilidade.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                Existe evidência científica por trás do protocolo?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                As recomendações seguem princípios reconhecidos (anti-inflamatório alimentar, suporte hepático, equilíbrio hormonal) baseados em estudos científicos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                Como acesso o conteúdo? (plataforma / app)
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                Você acessa via app e área de membros web — todo conteúdo fica liberado conforme sua compra: planos, receitas, vídeos e o grupo VIP.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                Por quanto tempo eu terei acesso?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                O acesso ao Protocolo é Vitalício.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                E se eu tiver problemas técnicos?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                Temos suporte técnico — envie um print/descrição pelo canal de suporte (e-mail ou formulário) e resolvemos em até 48h úteis.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-13" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                "Eu já tentei de tudo"
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                Nosso método age no ponto pouco explorado: saúde do fígado e equilíbrio hormonal, integrando alimentação, hábitos e práticas que muitas dietas tradicionais não cobrem. Comece com 7 dias e veja mudanças no inchaço e energia.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-14" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                "Não tenho tempo"
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                O protocolo tem versões de 10 minutos e receitas práticas com listas de compras; ajudamos a encaixar nas rotinas mais corridas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-15" className="border border-[#eaf9f0] rounded-lg overflow-hidden bg-white w-full">
              <AccordionTrigger className="px-5 py-4 text-left font-bold text-[#0a6b48] hover:no-underline hover:bg-[#f8fdf9]">
                Posso transferir minha conta ou dar acesso para outra pessoa?
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#4c6b55] leading-relaxed">
                Política padrão: contas são individuais. Para casos especiais (presente), entre em contato com o suporte.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Third Apply Credits Button - After FAQ */}
      <section className="pt-2 pb-8 px-4 bg-white -mt-8">
        <div className="text-center">
          {!discountApplied && !isApplyingDiscount && <button className="relative bg-[#0ea06b] hover:bg-[#0a6b48] text-white font-bold px-4 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-lg shadow-[0_8px_20px_rgba(14,160,107,0.3)] transition-colors duration-300 cursor-pointer overflow-hidden animate-button-pulse" onClick={handleApplyDiscount}>
              <span className="relative z-10">APLIQUE SEUS CRÉDITOS PARA OBTER DESCONTO</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-button-shine"></span>
            </button>}

          {/* Loading Bar */}
          {isApplyingDiscount && !discountApplied && <div className="max-w-xs sm:max-w-sm mx-auto bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100">
              <p className="text-[#0a573f] font-bold mb-3 sm:mb-4 text-base sm:text-lg">⚡ Aplicando seus créditos...</p>
              <div className="w-full bg-gray-200 rounded-full h-6 sm:h-8 overflow-hidden shadow-inner relative">
                <div className="h-full bg-gradient-to-r from-[#0ea06b] via-[#12c77e] to-[#0ea06b] rounded-full transition-all duration-100 relative overflow-hidden" style={{
              width: `${loadingProgress}%`
            }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>
                <span className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold text-gray-700">
                  {loadingProgress}%
                </span>
              </div>
            </div>}

          {/* Flash Effect when confetti starts */}
          {showConfetti && <div className="fixed inset-0 pointer-events-none z-40">
              <div className="absolute inset-0 bg-yellow-300/20 animate-flash"></div>
            </div>}

          {/* Discount Applied - Show Purchase Button */}
          {discountApplied && <div className="animate-bounce-in">
              <div className="max-w-xs sm:max-w-sm mx-auto px-2">
                {/* Price display with animations */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <span className="text-red-500 line-through text-xl sm:text-2xl font-bold animate-shake">R$ 57,00</span>
                  <span className="text-[#0ea06b] font-black text-3xl sm:text-4xl animate-price-pop">R$ 37,00</span>
                </div>
                
                <button className="relative bg-[#0ea06b] hover:bg-[#0a6b48] text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl shadow-[0_8px_20px_rgba(14,160,107,0.4)] transition-all duration-300 cursor-pointer overflow-hidden animate-button-pulse w-full" onClick={() => window.open('https://pay.hotmart.com/SEU_LINK', '_blank')}>
                  <span className="relative z-10">GARANTIR MEU DESCONTO</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-button-shine"></span>
                </button>
              </div>
            </div>}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-10 px-4 bg-[#EFF8F2]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-2" style={{
          fontFamily: "'Trebuchet MS', sans-serif"
        }}>
            Pessoas como você obtiveram ótimos resultados com o nosso{" "}
            <span className="text-[#0ea06b] font-black">Desafio de Desintoxicação do Fígado.</span>
          </h2>
          <p className="text-center text-gray-600 text-sm sm:text-base mb-8">
            Estamos orgulhosos destes resultados e ansiosos para ver os seus!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Koreena */}
            <div className="bg-[#f0fdf4] rounded-2xl overflow-hidden shadow-md">
              <img src={provaSocialKoreena} alt="Koreena - Antes e Depois" className="w-full h-auto" loading="lazy" />
              <div className="p-4 bg-white min-h-[180px]">
                <h3 className="font-bold text-gray-800">
                  Cristina, 42 anos, <span className="text-[#0ea06b]">perdeu 15 kg</span>
                </h3>
                <div className="flex items-center gap-1 text-[#0ea06b] text-xs mt-3 mb-4">
                  <CircleCheck className="w-4 h-4" />
                  <span className="font-semibold">CLIENTE VERIFICADO</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">Antes da desintoxicação, eu me sentia letárgica, tinha erupções cutâneas e meu peso continuava aumentando apesar de me alimentar de forma saudável. Eu também sofria com oscilações de humor e estresse. Este desafio me ajudou a recomeçar, minha digestão, foi uma virada de chave para mim.</p>
              </div>
            </div>

            {/* Card 2 - Sandra */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-md">
              <img src={provaSocialSandra} alt="Sandra - Antes e Depois" className="w-full h-auto" loading="lazy" />
              <div className="p-4 bg-white min-h-[180px]">
                <h3 className="font-bold text-gray-800">
                  Sandra, 27 anos, <span className="text-[#0ea06b]">perdeu 28 kg</span>
                </h3>
                <div className="flex items-center gap-1 text-[#0ea06b] text-xs mt-3 mb-4">
                  <CircleCheck className="w-4 h-4" />
                  <span className="font-semibold">CLIENTE VERIFICADO</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Problemas digestivos fazem parte da minha vida desde que me lembro – inchaço constante, idas irregulares ao banheiro e sensação de desconforto após cada refeição. Eu estava cética em relação à desintoxicação do fígado...
                </p>
              </div>
            </div>

            {/* Card 3 - Mike */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-md">
              <img src={provaSocialMike} alt="Mike - Antes e Depois" className="w-full h-auto" loading="lazy" />
              <div className="p-4 bg-white min-h-[180px]">
                <h3 className="font-bold text-gray-800">
                  Elizeu, 57 anos, <span className="text-[#0ea06b]">perdeu 27 kg</span>
                </h3>
                <div className="flex items-center gap-1 text-[#0ea06b] text-xs mt-3 mb-4">
                  <CircleCheck className="w-4 h-4" />
                  <span className="font-semibold">CLIENTE VERIFICADO</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">Eu não bebia todos os dias, mas definitivamente mais do que deveria, especialmente em dias estressantes. Sabia que isso estava me afetando porque estava sempre cansado e sem nenhuma motivação. Participar do Desafio de Desintoxicação do Fígado foi o que realmente me ajudou.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botão Aplicar Créditos - Fora do bloco de provas sociais */}
      <div className="flex flex-col items-center py-8 px-4 w-full max-w-lg mx-auto">
        {!discountApplied && !isApplyingDiscount && <button className="relative bg-[#0ea06b] hover:bg-[#0a6b48] text-white font-bold px-3 sm:px-7 rounded-full text-[12px] sm:text-lg shadow-[0_8px_20px_rgba(14,160,107,0.3)] transition-colors duration-300 cursor-pointer overflow-hidden animate-button-pulse w-full h-14 sm:h-[60px] flex items-center justify-center text-center whitespace-nowrap" onClick={handleApplyDiscount}>
            <span className="relative z-10">APLIQUE SEUS CRÉDITOS PARA OBTER DESCONTO</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-button-shine"></span>
          </button>}

        {/* Loading Bar */}
        {isApplyingDiscount && !discountApplied && <div className="w-full bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100">
            <p className="text-[#0a573f] font-bold mb-3 sm:mb-4 text-base sm:text-lg">⚡ Aplicando seus créditos...</p>
            <div className="w-full bg-gray-200 rounded-full h-6 sm:h-8 overflow-hidden shadow-inner relative">
              <div className="h-full bg-gradient-to-r from-[#0ea06b] via-[#12c77e] to-[#0ea06b] rounded-full transition-all duration-100 relative overflow-hidden" style={{
            width: `${loadingProgress}%`
          }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>
              <span className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold text-gray-700">
                {loadingProgress}%
              </span>
            </div>
          </div>}

        {/* Discount Applied - Show Purchase Button */}
        {discountApplied && <div className="animate-bounce-in w-full">
            <div className="w-full">
              {/* Price display with animations */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <span className="text-red-500 line-through text-xl sm:text-2xl font-bold animate-shake">R$ 57,00</span>
                <span className="text-[#0ea06b] font-black text-3xl sm:text-4xl animate-price-pop">R$ 37,00</span>
              </div>
              
              <button className="relative bg-[#0ea06b] hover:bg-[#0a6b48] text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl shadow-[0_8px_20px_rgba(14,160,107,0.4)] transition-all duration-300 cursor-pointer overflow-hidden animate-button-pulse w-full" onClick={() => window.open('https://pay.hotmart.com/SEU_LINK', '_blank')}>
                <span className="relative z-10">GARANTIR MEU DESCONTO</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-button-shine"></span>
              </button>
            </div>
          </div>}

        {/* Botão de Rejeição */}
        <button className="relative bg-gray-400 hover:bg-gray-500 text-white font-bold px-3 sm:px-7 rounded-full text-[12px] sm:text-lg shadow-[0_8px_20px_rgba(156,163,175,0.3)] transition-colors duration-300 cursor-pointer overflow-hidden mt-4 w-full animate-button-pulse h-14 sm:h-[60px] flex items-center justify-center text-center whitespace-nowrap">
          <span className="relative z-10">Não, eu prefiro continuar sem o desconto</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-button-shine"></span>
        </button>
      </div>

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
        
        @keyframes button-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 8px 20px rgba(14, 160, 107, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 12px 30px rgba(14, 160, 107, 0.5);
          }
        }
        .animate-button-pulse {
          animation: button-pulse 2s ease-in-out infinite;
        }
        
        @keyframes button-shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-button-shine {
          animation: button-shine 2s ease-in-out infinite;
        }
        
        @keyframes confetti-explode {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          20% {
            transform: translate(calc(var(--vx) * 0.4), calc(var(--vy) * 0.5)) rotate(180deg) scale(1.2);
            opacity: 1;
          }
          50% {
            transform: translate(calc(var(--vx) * 0.8), calc(var(--vy) * 0.3 + 50px)) rotate(360deg) scale(1);
            opacity: 0.9;
          }
          100% {
            transform: translate(calc(var(--vx)), calc(var(--vy) * -0.5 + 300px)) rotate(720deg) scale(0.5);
            opacity: 0;
          }
        }
        .animate-confetti-explode {
          animation: confetti-explode 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        @keyframes flash {
          0% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
          }
        }
        .animate-flash {
          animation: flash 0.3s ease-out forwards;
        }
        
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1s ease-in-out infinite;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
        
        @keyframes price-pop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.3);
          }
          70% {
            transform: scale(0.9);
          }
          85% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-price-pop {
          animation: price-pop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          text-shadow: 0 0 20px rgba(14, 160, 107, 0.5);
        }
      `}</style>
    </div>;
};
export default ChallengeReady;