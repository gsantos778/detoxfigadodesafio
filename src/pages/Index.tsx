import liverHeroImage from "@/assets/liver-detox-hero.png";
import logoImage from "@/assets/logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full py-4 flex justify-center">
        <img 
          src={logoImage} 
          alt="Detox Fígado Desafio" 
          className="h-14 w-auto"
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Hero Image */}
        <div className="mb-8">
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
        <p className="text-muted-foreground text-center mb-8 text-base">
          Selecione o tipo de dieta de desintoxicação do fígado:
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="quiz-button">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12 2C13.1 2 14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.31 7 20 9.69 20 13V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V13C4 9.69 6.69 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2M7 13V17C7 17.55 7.45 18 8 18C8.55 18 9 17.55 9 17V13C9 12.45 8.55 12 8 12C7.45 12 7 12.45 7 13Z" />
            </svg>
            Dieta para mulheres
          </button>
          
          <button className="quiz-button">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12 2C13.1 2 14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.31 7 20 9.69 20 13V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V13C4 9.69 6.69 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2M15 13V17C15 17.55 15.45 18 16 18C16.55 18 17 17.55 17 17V13C17 12.45 16.55 12 16 12C15.45 12 15 12.45 15 13Z" />
            </svg>
            Dieta para Homens
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;
