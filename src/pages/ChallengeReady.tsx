import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import transformationImage from "@/assets/transformation-comparison.png";

const ChallengeReady = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      {/* Logo */}
      <div className="mb-8">
        <img src={logo} alt="Detox Fígado" className="h-12 md:h-16" />
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 max-w-md">
        Seu desafio pessoal de desintoxicação do fígado está pronto!
      </h1>

      {/* Transformation Image */}
      <div className="w-full max-w-lg">
        <img 
          src={transformationImage} 
          alt="Transformação - Antes e Depois" 
          className="w-full rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default ChallengeReady;
