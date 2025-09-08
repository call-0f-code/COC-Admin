import { ArrowLeft, Terminal } from "lucide-react";

interface HeaderProps {
  title : string;
  subtitle : string;
  onBack : (()=>void )| undefined;
}

export const Header : React.FC<HeaderProps> = ({ title, subtitle, onBack }) => (
  <div className="bg-black border-6 border-black p-6 shadow-[12px_12px_0_0_#00FFFF] mb-6">
    <div className="flex items-center justify-between mb-4">
      {onBack && (
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0_0_#00FFFF] hover:shadow-[2px_2px_0_0_#00FFFF] hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
      )}
      
      <div className="flex-1 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg font-bold text-cyan-400 mt-2 tracking-wider">
            {subtitle}
          </p>
        )}
      </div>

      <div className="w-12 h-12 bg-cyan-400 border-4 border-black flex items-center justify-center shadow-[4px_4px_0_0_#000]">
        <Terminal className="w-6 h-6 text-black" />
      </div>
    </div>

    <div className="w-full h-2 bg-cyan-400 border-2 border-black"></div>
  </div>
);