import { useState } from "react"
import { Lock, Terminal, Code } from 'lucide-react'
import Login from "./login"

export default function Authentication() {
  const [showLogin, setShowLogin] = useState(false)

  if (showLogin) {
    return <Login onBack={() => setShowLogin(false)} />
  }

  return (
    <>
      <style>{`
        /* Global Font Declaration */
        * {
          font-family: "Courier New", "Lucida Console", "Monaco", "Consolas", monospace !important;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        @keyframes logo-pulse {
          0%, 100% { 
            box-shadow: inset 15px 15px 30px rgba(0, 0, 0, 0.8), inset -15px -15px 30px rgba(255, 255, 255, 0.03), 0 0 60px rgba(0, 255, 0, 0.4), 0 0 30px rgba(0, 255, 0, 0.6);
          }
          50% { 
            box-shadow: inset 15px 15px 30px rgba(0, 0, 0, 0.9), inset -15px -15px 30px rgba(255, 255, 255, 0.05), 0 0 80px rgba(0, 255, 0, 0.6), 0 0 40px rgba(0, 255, 0, 0.8);
          }
        }
        @keyframes terminal-glow {
          from { text-shadow: 0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.3); }
          to { text-shadow: 0 0 15px rgba(0, 255, 0, 0.7), 0 0 25px rgba(0, 255, 0, 0.5); }
        }
        @keyframes icon-pulse {
          from { filter: drop-shadow(0 0 6px rgba(0, 255, 0, 0.6)); }
          to { filter: drop-shadow(0 0 10px rgba(0, 255, 0, 0.8)); }
        }
        @keyframes matrix-fall {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes pulse-bg {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .shimmer-effect {
          animation: shimmer 4s ease-in-out infinite;
        }
        .logo-pulse-effect {
          animation: logo-pulse 3s ease-in-out infinite;
        }
        .terminal-glow-effect {
          animation: terminal-glow 3s ease-in-out infinite alternate;
        }
        .icon-pulse-effect {
          animation: icon-pulse 2s ease-in-out infinite alternate;
        }
        .matrix-fall-effect {
          animation: matrix-fall 8s linear infinite;
        }
        .pulse-bg-effect {
          animation: pulse-bg 8s ease-in-out infinite;
        }
      `}</style>

      <div
        className="min-h-screen relative overflow-hidden flex items-center justify-center p-8"
        style={{
          background:
            "radial-gradient(ellipse at top, #0a0a0a 0%, #000000 100%), linear-gradient(135deg, #0f0f0f 0%, #050505 50%, #0a0a0a 100%)",
        }}
      >
        {/* Background Pulse Effect */}
        <div
          className="absolute inset-0 pulse-bg-effect"
          style={{
            background:
              "radial-gradient(circle at 20% 80%, rgba(0, 255, 0, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 255, 0, 0.05) 0%, transparent 50%)",
          }}
        ></div>

        {/* Matrix Rain Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none text-sm text-green-400/30">
          {[
            "01010101\n11001100\n10101010\n01110111\n00110011",
            "function(){\n return\n true;\n}",
            "const x =\n 'admin';\nlet y = 42;",
            "if(auth){\n login()\n ok;\n }",
            "<script>\n console\n .log()\n</script>",
            "import\n React\nfrom\n'react'",
            "class Admin\n extends\n User\n {}",
            "SELECT *\nFROM\n users\nWHERE",
            "git push\norigin\n main\n--force",
            "npm run\n build\n --prod\n ✓",
          ].map((text, i) => (
            <div
              key={i}
              className="absolute whitespace-pre matrix-fall-effect"
              style={{
                left: `${5 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                top: "-100%",
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* Main Container - Made Much Wider */}
        <div className="w-full flex flex-col gap-6 relative z-10 px-4">
          {/* Logo and Title Section */}
          <div
            className="text-center flex flex-col gap-6 rounded-3xl p-12 relative overflow-hidden w-full max-w-[500px] mx-auto"
            style={{
              background: "linear-gradient(145deg, #1a1a1a, #0f0f0f)",
              boxShadow:
                "15px 15px 40px rgba(0, 0, 0, 0.8), -15px -15px 40px rgba(255, 255, 255, 0.02), inset 0 0 0 1px rgba(0, 255, 0, 0.1)",
              border: "1px solid rgba(0, 255, 0, 0.2)",
              backdropFilter: "blur(20px)",
            }}
          >

            {/* Shimmer Effect */}
            <div
              className="absolute inset-0 shimmer-effect"
              style={{
                background: "linear-gradient(45deg, transparent, rgba(0, 255, 0, 0.03), transparent)",
              }}
            ></div>

            {/* Club Logo */}
            <div className="flex justify-center">
              <div
                className="w-24 h-24 rounded-full relative overflow-hidden flex items-center justify-center logo-pulse-effect"
                style={{
                  background:
                    "linear-gradient(145deg, #2d2d2d, #1a1a1a), radial-gradient(circle at 30% 30%, rgba(0, 255, 0, 0.3), transparent)",
                  boxShadow:
                    "inset 15px 15px 30px rgba(0, 0, 0, 0.8), inset -15px -15px 30px rgba(255, 255, 255, 0.03), 0 0 60px rgba(0, 255, 0, 0.4), 0 0 30px rgba(0, 255, 0, 0.6)",
                }}
              >
                <div className="text-2xl font-bold text-green-400/80 animate-pulse">{"</>"}</div>
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="COC Club Logo"
                  className="w-15 h-15 rounded-full object-contain absolute z-10 opacity-0"
                />
              </div>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-4">
              <h1
                className="text-3xl font-black text-white tracking-wider terminal-glow-effect"
                style={{
                  fontWeight: "900",
                  fontSize: "1.875rem",
                  letterSpacing: "0.1em",
                  textShadow: "0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.3)",
                }}
              >
                COC.ADMIN<span className="animate-pulse">_</span>
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Terminal
                  className="w-5 h-5 text-green-400 icon-pulse-effect"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(0, 255, 0, 0.6))",
                  }}
                />
                <p
                  className="text-sm text-green-300 tracking-wide"
                  style={{
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  ~/coding-club/admin$
                </p>
                <Code
                  className="w-5 h-5 text-green-400 icon-pulse-effect"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(0, 255, 0, 0.6))",
                  }}
                />
              </div>
              <div
                className="w-24 h-0.5 mx-auto rounded-full"
                style={{
                  background: "linear-gradient(to right, transparent, #10b981, transparent)",
                }}
              ></div>
            </div>
          </div>

          {/* Login Button - Made Wider */}
          <div className="text-center px-4">
            <button
              onClick={() => setShowLogin(true)}
              className="w-full max-w-[500px] rounded-2xl px-12 py-5 relative overflow-hidden transition-all duration-300 group hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                boxShadow:
                  "12px 12px 25px rgba(0, 0, 0, 0.9), -12px -12px 25px rgba(255, 255, 255, 0.02), inset 0 0 0 1px rgba(0, 255, 0, 0.2)",
                border: "1px solid rgba(0, 255, 0, 0.3)",
                fontWeight: "bold",
                fontSize: "1.125rem",
                letterSpacing: "0.05em",
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "8px 8px 16px rgba(0, 0, 0, 1), -8px -8px 16px rgba(255, 255, 255, 0.03), 0 0 30px rgba(0, 255, 0, 0.5), inset 0 0 0 1px rgba(0, 255, 0, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "12px 12px 25px rgba(0, 0, 0, 0.9), -12px -12px 25px rgba(255, 255, 255, 0.02), inset 0 0 0 1px rgba(0, 255, 0, 0.2)"
              }}
            >
              <div
                className="absolute inset-0 transition-all duration-600 group-hover:translate-x-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.2), transparent)",
                  transform: "translateX(-100%)",
                }}
              ></div>
              <div className="relative flex items-center justify-center gap-3">
                <Lock className="w-5 h-5 text-green-400 transition-transform group-hover:scale-110" />
                <span>sudo login</span>
              </div>
            </button>
          </div>

          {/* Footer - Made Wider */}
          <div
            className="text-center flex flex-col gap-3 p-5 rounded-xl"
            style={{
              background: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-green-400" />
              <p className="text-xs text-green-300 tracking-widest">AUTHORIZED_ACCESS_ONLY</p>
              <Lock className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-xs text-gray-400">© 2024 COC • ALL_RIGHTS_RESERVED</p>
          </div>
        </div>
      </div>
    </>
  )
}
