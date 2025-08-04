import type React from "react"
import { useState } from "react"
import { Lock, Mail, Cpu, AlertCircle } from "lucide-react"

interface LoginProps {
  onBack: () => void
  onLoginSuccess?: (token: string) => void
}

interface LoginResponse {
  success: boolean
  message: string
  token?: string
}

export default function Login({ onBack, onLoginSuccess }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>("")
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:8000/api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      if (data.success && data.token) {
        localStorage.setItem("adminToken", data.token)
        console.log("Login successful:", data.message)
        // Redirect or call success callback here
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (error) setError("")
  }

  return (
    <>
      <style>{`
        /* Global Font Declaration */
        * {
          font-family: "Courier New", "Lucida Console", "Monaco", "Consolas", monospace !important;
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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .matrix-fall-effect {
          animation: matrix-fall 8s linear infinite;
        }
        .pulse-bg-effect {
          animation: pulse-bg 8s ease-in-out infinite;
        }
        .shake-effect {
          animation: shake 0.5s ease-in-out;
        }
        input::placeholder {
          color: #6b7280;
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

        {/* Login Form Container */}
        <div className="w-full relative z-10" style={{ maxWidth: "600px" }}>
          <div
            className={`rounded-3xl p-10 relative overflow-hidden transition-all duration-300 ${error ? "shake-effect" : ""}`}
            style={{
              background: "linear-gradient(145deg, #1a1a1a, #0f0f0f)",
              boxShadow:
                "20px 20px 40px rgba(0, 0, 0, 0.9), -20px -20px 40px rgba(255, 255, 255, 0.02), inset 0 0 0 1px rgba(0, 255, 0, 0.1)",
              border: `1px solid ${error ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 255, 0, 0.2)"}`,
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Background Glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${error ? "rgba(255, 0, 0, 0.05)" : "rgba(0, 255, 0, 0.05)"} 0%, transparent 50%)`,
              }}
            ></div>

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <h2
                className="text-xl font-bold text-white mb-2"
                style={{
                  textShadow: `0 0 10px ${error ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 255, 0, 0.5)"}, 0 0 20px ${error ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 255, 0, 0.3)"}`,
                }}
              >
                Authentication Required
              </h2>
              <p className={`text-sm ${error ? "text-red-300" : "text-green-300"}`}>
                Enter admin credentials to access system
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-900/20 border border-red-500/30 relative z-10">
                <div className="flex items-center gap-3 text-red-300">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
              {/* Email Field */}
              <div className="space-y-3">
                <label htmlFor="email" className={`text-sm ml-3 ${error ? "text-red-300" : "text-green-300"}`}>
                  Email:
                </label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-4 w-5 h-5 ${error ? "text-red-400" : "text-green-400"}`} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@coc.club"
                    value={credentials.email}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl pl-12 pr-4 py-4 text-white transition-all duration-300 focus:outline-none"
                    style={{
                      background: "linear-gradient(145deg, #0f0f0f, #1a1a1a)",
                      boxShadow:
                        "inset 10px 10px 20px rgba(0, 0, 0, 0.9), inset -10px -10px 20px rgba(255, 255, 255, 0.02)",
                      border: `1px solid ${error ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 255, 0, 0.2)"}`,
                    }}
                    onFocus={(e) => {
                      const color = error ? "rgba(255, 0, 0, 0.4)" : "rgba(0, 255, 0, 0.4)"
                      const borderColor = error ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 255, 0, 0.5)"
                      e.target.style.boxShadow = `inset 12px 12px 24px rgba(0, 0, 0, 1), inset -12px -12px 24px rgba(255, 255, 255, 0.03), 0 0 25px ${color}`
                      e.target.style.borderColor = borderColor
                    }}
                    onBlur={(e) => {
                      const borderColor = error ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 255, 0, 0.2)"
                      e.target.style.boxShadow =
                        "inset 10px 10px 20px rgba(0, 0, 0, 0.9), inset -10px -10px 20px rgba(255, 255, 255, 0.02)"
                      e.target.style.borderColor = borderColor
                    }}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label htmlFor="password" className={`text-sm ml-3 ${error ? "text-red-300" : "text-green-300"}`}>
                  Password:
                </label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-4 w-5 h-5 ${error ? "text-red-400" : "text-green-400"}`} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl pl-12 pr-12 py-4 text-white transition-all duration-300 focus:outline-none"
                    style={{
                      background: "linear-gradient(145deg, #0f0f0f, #1a1a1a)",
                      boxShadow:
                        "inset 10px 10px 20px rgba(0, 0, 0, 0.9), inset -10px -10px 20px rgba(255, 255, 255, 0.02)",
                      border: `1px solid ${error ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 255, 0, 0.2)"}`,
                    }}
                    onFocus={(e) => {
                      const color = error ? "rgba(255, 0, 0, 0.4)" : "rgba(0, 255, 0, 0.4)"
                      const borderColor = error ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 255, 0, 0.5)"
                      e.target.style.boxShadow = `inset 12px 12px 24px rgba(0, 0, 0, 1), inset -12px -12px 24px rgba(255, 255, 255, 0.03), 0 0 25px ${color}`
                      e.target.style.borderColor = borderColor
                    }}
                    onBlur={(e) => {
                      const borderColor = error ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 255, 0, 0.2)"
                      e.target.style.boxShadow =
                        "inset 10px 10px 20px rgba(0, 0, 0, 0.9), inset -10px -10px 20px rgba(255, 255, 255, 0.02)"
                      e.target.style.borderColor = borderColor
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-4 transition-colors ${error ? "text-red-400 hover:text-red-300" : "text-green-400 hover:text-green-300"}`}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="space-y-4 pt-4">
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full font-bold text-white text-lg rounded-2xl px-8 py-5 relative overflow-hidden transition-all duration-300 group hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0"
                  style={{
                    background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                    boxShadow:
                      "12px 12px 25px rgba(0, 0, 0, 0.9), -12px -12px 25px rgba(255, 255, 255, 0.02), inset 0 0 0 1px rgba(0, 255, 0, 0.2)",
                    border: "1px solid rgba(0, 255, 0, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.boxShadow =
                        "8px 8px 16px rgba(0, 0, 0, 1), -8px -8px 16px rgba(255, 255, 255, 0.03), 0 0 30px rgba(0, 255, 0, 0.5), inset 0 0 0 1px rgba(0, 255, 0, 0.4)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "12px 12px 25px rgba(0, 0, 0, 0.9), -12px -12px 25px rgba(255, 255, 255, 0.02), inset 0 0 0 1px rgba(0, 255, 0, 0.2)"
                  }}
                >
                  <div className="relative flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div
                          className="w-5 h-5 border-2 border-green-400/20 border-t-green-400 rounded-full animate-spin"
                          style={{
                            boxShadow: "0 0 15px rgba(0, 255, 0, 0.4)",
                          }}
                        ></div>
                        <span>authenticating...</span>
                      </>
                    ) : (
                      <>
                        <Cpu className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                        <span>./login.sh</span>
                      </>
                    )}
                  </div>
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={onBack}
                  className="w-full bg-transparent border-none text-green-300 hover:text-white py-3 text-sm transition-colors duration-300"
                >
                  ← exit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
