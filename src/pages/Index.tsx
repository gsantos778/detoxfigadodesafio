import { useNavigate } from "react-router-dom";
import liverHeroImage from "@/assets/liver-detox-hero.png";
import logoImage from "@/assets/logo.png";
import corpoFeminino from "@/assets/corpo-feminino.png";
import corpoMasculino from "@/assets/corpo-masculino.png";

// Preload critical images immediately on module load
[liverHeroImage, logoImage, corpoFeminino, corpoMasculino].forEach(src => {
  const img = new Image();
  img.src = src;
});

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center px-4">
        <img 
          src={logoImage} 
          alt="Detox Fígado Desafio" 
          className="h-16 w-auto"
          loading="eager"
          decoding="sync"
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 md:px-6 pb-8 md:pb-12">
        {/* Hero Image */}
        <div>
          <img
            src={liverHeroImage}
            alt="Fígado saudável com laranja e folhas"
            className="w-56 h-56 md:w-72 md:h-72 object-contain"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center max-w-2xl leading-tight mb-6 md:mb-8 px-2">
          Comece a perder peso em poucos dias com o desafio de desintoxicação do fígado.
        </h1>

        {/* Subtitle */}
        <p className="text-primary text-center mb-6 md:mb-8 text-base md:text-lg font-semibold">
          Selecione o tipo de dieta de desintoxicação do fígado:
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full max-w-md md:max-w-none px-4 md:px-0 items-center justify-center">
          <button className="quiz-button w-full md:w-auto justify-center" onClick={() => {
            localStorage.setItem('userGender', 'female');
            navigate("/age-selection");
          }}>
            <img src={corpoFeminino} alt="Mulher" className="h-10 md:h-12 w-auto" loading="eager" />
            Dieta para mulheres
          </button>
          
          <button className="quiz-button w-full md:w-auto justify-center" onClick={() => {
            localStorage.setItem('userGender', 'male');
            navigate("/age-selection");
          }}>
            <img src={corpoMasculino} alt="Homem" className="h-12 md:h-14 w-auto" loading="eager" />
            Dieta para Homens
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;