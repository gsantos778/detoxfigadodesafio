import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QuizHeader from "@/components/QuizHeader";

const AgeInputSelection = () => {
  const navigate = useNavigate();
  const [age, setAge] = useState("");

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 120)) {
      setAge(value);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizHeader backRoute="/desired-weight-selection" currentStep={21} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
          Qual é a sua idade?
        </h1>

        {/* Age Input */}
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center border border-border rounded-lg py-6 px-8 bg-neutral-200">
            <input
              type="text"
              inputMode="numeric"
              value={age}
              onChange={handleAgeChange}
              placeholder="0"
              className="text-5xl font-bold text-center bg-transparent border-none outline-none w-28 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => {
            localStorage.setItem("userAge", age);
            navigate("/weight-projection");
          }}
          disabled={!age || parseInt(age) < 18}
          className="w-full max-w-md mt-8 py-6 text-lg font-semibold rounded-full"
        >
          Próximo
        </Button>
      </main>
    </div>
  );
};

export default AgeInputSelection;