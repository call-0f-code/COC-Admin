import { ArrowLeft, Terminal } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle: string;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onBack }) => (
  <div className="fixed top-0 left-[260px] w-[calc(100%-260px)] bg-black border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#00FFFF] z-50">
    <div className="flex items-center justify-between">
      {onBack ? (
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0_0_#00FFFF] hover:shadow-[1px_1px_0_0_#00FFFF] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </button>
      ) : (
        <div className="w-10 h-10" /> // keeps layout balanced when no back button
      )}

      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl font-bold text-cyan-400 tracking-wider uppercase">
            {subtitle}
          </p>
        )}
      </div>

      <div className="w-10 h-10 bg-cyan-400 border-2 border-black flex items-center justify-center shadow-[3px_3px_0_0_#000]">
        <Terminal className="w-5 h-5 text-black" />
      </div>
    </div>

    <div className="mt-3 w-full h-[3px] bg-cyan-400 border-2 border-black"></div>
  </div>
);
