import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeightSelection = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState("");

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 300)) {
      setHeight(value);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center relative px-4">
        <button
          onClick={() => navigate("/meal-plan-benefits")}
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
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
          Qual é a sua altura?
        </h1>

        {/* Unit Toggle */}
        <div className="flex items-center gap-2 mb-8">
          <span className="px-4 py-2 text-muted-foreground">PÉS</span>
          <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium">
            CM
          </span>
        </div>

        {/* Height Input */}
        <div className="w-full max-w-md">
          <div className="relative flex items-center justify-center border border-border rounded-lg p-4">
            <Input
              type="text"
              inputMode="numeric"
              value={height}
              onChange={handleHeightChange}
              placeholder="0"
              className="text-4xl font-bold text-center border-none shadow-none focus-visible:ring-0 w-32"
            />
            <span className="text-muted-foreground text-lg ml-2">cm</span>
          </div>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => navigate("/")}
          disabled={!height || parseInt(height) < 100}
          className="w-full max-w-md mt-8 py-6 text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default HeightSelection;
