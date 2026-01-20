import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avesImage from "@/assets/aves.jpg";
import carneBovinaImage from "@/assets/carne-bovina.jpg";
import carnePorcoImage from "@/assets/carne-porco.jpg";
import cordeiroImage from "@/assets/cordeiro.jpg";
import peixeImage from "@/assets/peixe.jpg";
import vitelaImage from "@/assets/vitela.jpg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import QuizHeader from "@/components/QuizHeader";

// Preload images immediately on module load
const preloadImages = [avesImage, carnePorcoImage, carneBovinaImage, peixeImage, cordeiroImage, vitelaImage];
preloadImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});

const MeatSelection = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const meatOptions = [
    { id: "aves", label: "Aves", image: avesImage },
    { id: "porco", label: "Carne de porco", image: carnePorcoImage },
    { id: "bovina", label: "Carne bovina", image: carneBovinaImage },
    { id: "peixe", label: "Peixe", image: peixeImage },
    { id: "cordeiro", label: "Cordeiro", image: cordeiroImage },
    { id: "vitela", label: "Vitela", image: vitelaImage },
  ];

  const toggleOption = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAllMeats = () => {
    if (selected.includes("all")) {
      setSelected([]);
    } else {
      setSelected(["all"]);
    }
  };

  const handleVegetarian = () => {
    if (selected.includes("vegetarian")) {
      setSelected([]);
    } else {
      setSelected(["vegetarian"]);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader backRoute="/liver-habits" currentStep={15} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center max-w-md leading-tight">
          Selecione as carnes
          <br />
          que você <span className="text-primary">NÃO</span> gosta.
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-center max-w-md mt-2 mb-6">
          Selecione todos os itens que você não deseja incluir no seu plano.
        </p>

        {/* Options */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {/* All meats option */}
          <button
            onClick={handleAllMeats}
            className="w-full flex items-center justify-between px-4 py-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <span className="text-foreground">Eu como todos os tipos de carne.</span>
            <Checkbox
              checked={selected.includes("all")}
              onCheckedChange={handleAllMeats}
            />
          </button>

          {/* Meat options with images */}
          {meatOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              disabled={selected.includes("all") || selected.includes("vegetarian")}
              className="w-full flex items-center justify-between px-4 py-3 bg-background border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <img
                  src={option.image}
                  alt={option.label}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="eager"
                  decoding="sync"
                />
                <span className="text-foreground">{option.label}</span>
              </div>
              <Checkbox
                checked={selected.includes(option.id)}
                onCheckedChange={() => toggleOption(option.id)}
                disabled={selected.includes("all") || selected.includes("vegetarian")}
              />
            </button>
          ))}

          {/* Vegetarian option */}
          <button
            onClick={handleVegetarian}
            className="w-full flex items-center justify-between px-4 py-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <span className="text-foreground">Sou vegetariana.</span>
            <Checkbox
              checked={selected.includes("vegetarian")}
              onCheckedChange={handleVegetarian}
            />
          </button>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => navigate("/ingredients-selection")}
          className="w-full max-w-md mt-8 py-6 text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default MeatSelection;