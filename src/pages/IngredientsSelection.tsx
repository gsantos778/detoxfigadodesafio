import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import cebolaImage from "@/assets/cebola.jpg";
import cogumeloImage from "@/assets/cogumelo.jpg";
import ovosImage from "@/assets/ovos.jpg";
import nozesImage from "@/assets/nozes.jpg";
import queijoImage from "@/assets/queijo.jpg";
import leiteImage from "@/assets/leite.jpg";
import abacateImage from "@/assets/abacate.jpg";
import frutosDoMarImage from "@/assets/frutos-do-mar.jpg";
import azeitonasImage from "@/assets/azeitonas.jpg";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Preload images
const preloadImages = [
  cebolaImage, cogumeloImage, ovosImage, nozesImage, queijoImage,
  leiteImage, abacateImage, frutosDoMarImage, azeitonasImage
];

const IngredientsSelection = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  // Preload images on mount
  useEffect(() => {
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const ingredientOptions = [
    { id: "cebolas", label: "Cebolas", image: cebolaImage },
    { id: "cogumelos", label: "Cogumelos", image: cogumeloImage },
    { id: "ovos", label: "Ovos", image: ovosImage },
    { id: "nozes", label: "Nozes", image: nozesImage },
    { id: "queijo", label: "Queijo", image: queijoImage },
    { id: "leite", label: "Leite", image: leiteImage },
    { id: "abacates", label: "Abacates", image: abacateImage },
    { id: "frutos-do-mar", label: "Frutos do mar", image: frutosDoMarImage },
    { id: "azeitonas", label: "Azeitonas", image: azeitonasImage },
    { id: "alcaparras", label: "Alcaparras", image: null },
    { id: "cocos", label: "Cocos", image: null },
    { id: "queijo-de-cabra", label: "Queijo de cabra", image: queijoImage },
  ];

  const toggleOption = (id: string) => {
    if (selected.includes("all")) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleEatAll = () => {
    if (selected.includes("all")) {
      setSelected([]);
    } else {
      setSelected(["all"]);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center relative px-4">
        <button
          onClick={() => navigate("/meat-selection")}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <img
          src={logoImage}
          alt="Detox Fígado Desafio"
          className="h-20 w-auto"
        />
      </header>

      {/* Progress Bar */}
      <div className="w-full px-4 mt-2">
        <div className="h-1 bg-muted rounded-full max-w-md mx-auto">
          <div className="h-1 bg-primary rounded-full w-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center max-w-md leading-tight">
          Selecione os
          <br />
          ingredientes que você
          <br />
          <span className="text-primary">NÃO</span> gosta.
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-center max-w-md mt-2 mb-6">
          Selecione todos os itens que você não deseja incluir no seu plano.
        </p>

        {/* Options */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {/* Eat all option */}
          <button
            onClick={handleEatAll}
            className="w-full flex items-center justify-between px-4 py-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <span className="text-foreground">Eu como todos eles.</span>
            <Checkbox
              checked={selected.includes("all")}
              onCheckedChange={handleEatAll}
            />
          </button>

          {/* Ingredient options with images */}
          {ingredientOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              disabled={selected.includes("all")}
              className="w-full flex items-center justify-between px-4 py-3 bg-background border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                {option.image ? (
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">🥗</span>
                  </div>
                )}
                <span className="text-foreground">{option.label}</span>
              </div>
              <Checkbox
                checked={selected.includes(option.id)}
                onCheckedChange={() => toggleOption(option.id)}
                disabled={selected.includes("all")}
              />
            </button>
          ))}
        </div>

        {/* Next Button */}
        <Button
          onClick={() => navigate("/")}
          className="w-full max-w-md mt-8 py-6 text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default IngredientsSelection;
