import liverHeroImage from "@/assets/liver-detox-hero.png";
import logoImage from "@/assets/logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex justify-center">
        <img 
          src={logoImage} 
          alt="Detox Fígado Desafio" 
          className="h-28 w-auto"
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 pb-12">
        {/* Hero Image */}
        <div>
          <img
            src={liverHeroImage}
            alt="Fígado saudável com laranja e folhas"
            className="w-72 h-72 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center max-w-2xl leading-tight mb-8">
          Comece a perder peso em poucos dias com o desafio de desintoxicação do fígado.
        </h1>

        {/* Subtitle */}
        <p className="text-primary text-center mb-8 text-lg font-semibold">
          Selecione o tipo de dieta de desintoxicação do fígado:
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="quiz-button">
            <span className="text-xl">👩</span>
            Dieta para mulheres
          </button>
          
          <button className="quiz-button">
            <span className="text-xl">👨</span>
            Dieta para Homens
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;
