import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logoImage from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock } from "lucide-react";

const EmailCapture = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [desiredWeight, setDesiredWeight] = useState("60");

  useEffect(() => {
    // Recuperar peso desejado do sessionStorage
    const storedDesiredWeight = sessionStorage.getItem("desiredWeight");
    if (storedDesiredWeight) {
      setDesiredWeight(storedDesiredWeight);
    }
  }, []);

  const isFormValid = email.trim() !== "" && agreedToTerms;

  const handleSubmit = () => {
    if (isFormValid) {
      // Salvar email no sessionStorage
      sessionStorage.setItem("userEmail", email);
      navigate("/weight-impact");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full pt-2 flex items-center justify-center px-3 sm:px-4">
        <img
          src={logoImage}
          alt="Detox Fígado Desafio"
          className="h-12 sm:h-16 w-auto"
          loading="eager"
          decoding="sync"
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-3 sm:px-4 pt-6 sm:pt-8">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8 max-w-md px-2">
          Insira seu e-mail para ver como você pode atingir os{" "}
          <span className="text-emerald-500 text-2xl sm:text-3xl md:text-4xl font-extrabold">{desiredWeight} kg</span>.
        </h1>

        {/* Email Input */}
        <div className="w-full max-w-md space-y-3 sm:space-y-4 px-2 sm:px-0">
          <Input
            type="email"
            placeholder="Insira seu e-mail para obter seu plano."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-5 sm:py-6 px-3 sm:px-4 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:border-primary"
          />

          {/* Checkbox */}
          <div className="flex items-start gap-2 sm:gap-3">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="mt-0.5 sm:mt-1"
            />
            <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 cursor-pointer">
              Concordo com a <span className="text-primary font-medium">Política de Privacidade</span> e receber informações futuras
            </label>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="w-full py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-lg"
          >
            Continuar
          </Button>

          {/* Privacy Notice */}
          <div className="flex items-start gap-2 sm:gap-3 mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
              Respeitamos a sua privacidade e estamos empenhados em proteger os seus dados pessoais.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmailCapture;