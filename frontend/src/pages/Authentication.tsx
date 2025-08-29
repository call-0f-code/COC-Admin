import React, { useState } from 'react';
import { Lock, Terminal, Code } from 'lucide-react';
import Login from '@/Components/auth/Login';

export default function Authentication() {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <Login onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 relative overflow-hidden">
      {/* Geometric background pattern */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-black transform rotate-45"></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-cyan-400 border-4 border-black"></div>
        <div className="absolute bottom-40 left-40 w-20 h-20 bg-cyan-400 border-4 border-black"></div>
        <div className="absolute bottom-20 right-20 w-8 h-32 bg-black"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-4 bg-black transform -rotate-12"></div>
      </div>

      {/* Floating geometric elements */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <div 
            className={`w-2 h-2 border-2 border-black ${
              i % 3 === 0 ? 'bg-cyan-400' : 
              i % 3 === 1 ? 'bg-cyan-400' : 
              'bg-black'
            }`}
          />
        </div>
      ))}

      {/* Main Content Container */}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="w-full max-w-xl space-y-6">
          {/* Header Section */}
          <div className="bg-black border-6 border-black p-8 shadow-[12px_12px_0_0_#00FFFF]">
            {/* Club Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center shadow-[6px_6px_0_0_#00FFFF]">
                <div className="text-2xl font-black text-black">
                  {"</>"}
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-8 tracking-tighter">
              COC.ADMIN
            </h1>
            
            {/* Terminal Display */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 bg-cyan-400 border-3 border-black flex items-center justify-center shadow-[3px_3px_0_0_#000]">
                <Terminal className="w-6 h-6 text-black" />
              </div>
              
              <div className="px-4 py-2 bg-white border-3 border-black font-mono text-lg font-bold text-black shadow-[3px_3px_0_0_#00FFFF]">
                ~/coding-club/admin$
              </div>
              
              <div className="w-12 h-12 bg-cyan-400 border-3 border-black flex items-center justify-center shadow-[3px_3px_0_0_#000]">
                <Code className="w-6 h-6 text-black" />
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="flex justify-center">
              <div className="w-32 h-6 bg-white border-3 border-black overflow-hidden shadow-[3px_3px_0_0_#000]">
                <div 
                  className="h-full bg-cyan-400 border-r-3 border-black"
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          </div>

          {/* Login Button */}
          <div className="text-center">
            <button
  onClick={() => setShowLogin(true)
  }
  disabled={false}
  className="w-full px-8 py-6 bg-[#1edfff] font-black text-2xl text-black
             shadow-[8px_8px_0_0_#000] transition-all duration-150
             hover:translate-x-1 hover:translate-y-1 hover:shadow-[6px_6px_0_0_#000]
             active:translate-x-2 active:translate-y-2 active:shadow-[3px_3px_0_0_#000]"
>
  <div className="flex items-center justify-center gap-4">
    <div className="w-8 h-8 flex bg-black items-center justify-center">
      <Lock className="w-4 h-4 text-white" />
    </div>
    <span className="tracking-wider">SUDO LOGIN</span>
  </div>
</button>

          </div>

          {/* Footer */}
          <div className="bg-white border-6 border-black p-6 shadow-[8px_8px_0_0_#00FFFF]">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-6 h-6 bg-black flex items-center justify-center">
                  <Lock className="w-3 h-3 text-white" />
                </div>
                <p className="text-lg font-black text-black tracking-widest">
                  AUTHORIZED_ACCESS_ONLY
                </p>
                <div className="w-6 h-6 bg-black flex items-center justify-center">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              </div>
              <p className="text-sm font-bold text-black tracking-wide">
                © 2024 COC • ALL_RIGHTS_RESERVED
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}