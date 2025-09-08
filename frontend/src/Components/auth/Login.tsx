import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Cpu,
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
} from 'lucide-react';
import api from '../../utils/api/api';
import { useToast } from '../common/Toast';


interface LoginProps {
  onBack: () => void;
}

interface Credentials {
  email: string;
  password: string;
}

//Ai ne khud ka toast bana diya hai usse remove karna padega
//login ke code ko refactor ki zarurat hai 
//this are temp fix since it was not my job  ('-')

export default function Login({ onBack }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const {addToast} = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const email = credentials.email;
      const password = credentials.password;
      const response = await api.post("/members/signin",{email,password})
      const data = response.data;
      if (data.success && data.token) {
        addToast({ type: 'success', message: "Login Successful" });
        localStorage.setItem('token', data.token);
      } else {
        addToast({ type: 'error', message: 'Invalid response from server' });
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during login'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { name: keyof Credentials };
    setCredentials((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
    if (error) setError('');
  };

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
            backgroundSize: '40px 40px',
          }}
        />

        {/* Geometric shapes */}
        <div className="absolute top-32 left-16 w-12 h-12 bg-cyan-400 border-4 border-black"></div>
        <div className="absolute top-60 right-24 w-8 h-20 bg-black"></div>
        <div className="absolute bottom-32 left-32 w-16 h-16 bg-cyan-400 border-4 border-black transform rotate-45"></div>
        <div className="absolute bottom-60 right-40 w-20 h-4 bg-black"></div>
      </div>

      {/* Floating geometric elements */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <div
            className={`w-3 h-3 border-2 border-black ${
              i % 2 === 0 ? 'bg-cyan-400' : 'bg-cyan-400'
            }`}
          />
        </div>
      ))}

      {/* Login Form Container */}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="w-full max-w-md">
          {/* Main container */}
          <div className="bg-black border-[6px] border-black p-8 shadow-[12px_12px_0_0_#00FFFF]">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0_0_#00FFFF]">
                  <Lock className="w-8 h-8 text-black" />
                </div>
              </div>
              <h2 className="text-3xl font-black text-white mb-3 tracking-tight">
                AUTHENTICATION
              </h2>
              <h3 className="text-xl font-black text-white mb-2">REQUIRED</h3>
              <div className="w-full h-1 bg-cyan-400 border-2 border-black mt-3"></div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-cyan-400 border-4 border-black shadow-[4px_4px_0_0_#000]">
                <div className="flex items-center gap-3 text-black">
                  <div className="w-6 h-6 bg-black flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold">{error}</span>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-lg font-black text-white tracking-wider"
                >
                  EMAIL
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 w-6 h-6 bg-cyan-400 border-2 border-black flex items-center justify-center">
                    <Mail className="w-3 h-3 text-black" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ADMIN@COC.CLUB"
                    value={credentials.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-3 py-4 bg-white border-4 border-black text-black font-bold text-base placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-shadow"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-lg font-black text-white tracking-wider"
                >
                  PASSWORD
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 w-6 h-6 bg-cyan-400 border-2 border-black flex items-center justify-center">
                    <Lock className="w-3 h-3 text-black" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-4 bg-white border-4 border-black text-black font-bold text-base placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-shadow"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-pressed={showPassword}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    title={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-3 w-6 h-6 bg-black border-2 border-black flex items-center justify-center text-white hover:bg-cyan-400 hover:text-black transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-3 h-3" />
                    ) : (
                      <Eye className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#1edfff] font-black text-xl text-black
             shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000]
             hover:translate-x-1 hover:translate-y-1
             active:translate-x-2 active:translate-y-2 active:shadow-[2px_2px_0_0_#000]
             transition-all duration-150"
              >
                <div className="flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-[3px] border-black border-t-transparent animate-spin"></div>
                      <span>AUTHENTICATING...</span>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 bg-black flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-white" />
                      </div>
                      <span>./LOGIN.SH</span>
                    </>
                  )}
                </div>
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={onBack}
                className="w-full py-3 bg-white border-4 border-black font-bold text-lg text-black hover:bg-gray-200 transition-colors shadow-[3px_3px_0_0_#00FFFF] hover:shadow-[2px_2px_0_0_#00FFFF] hover:translate-x-1 hover:translate-y-1"
              >
                <div className="flex items-center justify-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  <span>EXIT</span>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
