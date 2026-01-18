import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QuizHeader from "@/components/QuizHeader";

const DesiredWeightSelection = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState("");

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 500)) {
      setWeight(value);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader backRoute="/current-weight-selection" currentStep={20} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
          Qual é o peso
          <br />
          desejado?
        </h1>

        {/* Weight Input */}
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center border border-border rounded-lg py-6 px-8 bg-neutral-200">
            <input
              type="text"
              inputMode="numeric"
              value={weight}
              onChange={handleWeightChange}
              placeholder="0"
              className="text-5xl font-bold text-center bg-transparent border-none outline-none w-28 text-foreground placeholder:text-muted-foreground"
            />
            <span className="text-muted-foreground text-xl">kg</span>
          </div>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => {
            localStorage.setItem("desiredWeight", weight);
            navigate("/age-input-selection");
          }}
          disabled={!weight || parseInt(weight) < 30}
          className="w-full max-w-md mt-8 py-6 text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default DesiredWeightSelection;