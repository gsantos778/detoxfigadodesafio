import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QuizHeader from "@/components/QuizHeader";

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
      <QuizHeader backRoute="/meal-plan-benefits" currentStep={18} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
          Qual é a sua altura?
        </h1>

        {/* Unit Badge */}
        <div className="flex items-center mb-8">
          <span className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium">
            CM
          </span>
        </div>

        {/* Height Input */}
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center border border-border rounded-lg py-6 px-8 bg-neutral-200">
            <input
              type="text"
              inputMode="numeric"
              value={height}
              onChange={handleHeightChange}
              placeholder="0"
              className="text-5xl font-bold text-center bg-transparent border-none outline-none w-28 text-foreground placeholder:text-muted-foreground"
            />
            <span className="text-muted-foreground text-xl">cm</span>
          </div>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => navigate("/current-weight-selection")}
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