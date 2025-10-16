import { Mail, Eye, EyeOff, ArrowLeft, Cpu, Lock } from "lucide-react";
import { useMembers } from "../../hooks/useMembers";
import { globalToast } from "../../utils/toast";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";


interface loginFormProps {
  loginForm: LoginForm;
  setLoginForm: React.Dispatch<React.SetStateAction<LoginForm>>;
  onBack: () => void
}

export const LoginForm: React.FC<loginFormProps> = ({
    loginForm,
    setLoginForm,
    onBack
}) => {
    const navigate = useNavigate()
    const {login} = useMembers();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        login.mutate(
            { email: loginForm.email, password: loginForm.password },
            {
                onSuccess: () => {
                    navigate('/Dashboard')
                    globalToast.success("Login Successful");
                }
            }
        );
    };


    return (
        <form onSubmit={handleSubmit}>
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
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full pl-12 pr-3 py-4 bg-white border-4 border-black text-black font-bold text-base placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#00FFFF] transition-shadow"
                required
                />
            </div>
            </div> 

            {/* Password Field */}
            <div className="space-y-2 pt-4">
            <label
                htmlFor="password"
                className="block text-lg font-black text-white tracking-wider"
            >
                PASSWORD
            </label>
            <div className="relative my-1">
                <div className="absolute left-3 top-3 w-6 h-6 bg-cyan-400 border-2 border-black flex items-center justify-center">
                <Lock className="w-3 h-3 text-black" />
                </div>
                <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
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
            disabled={login.isPending}
            className=" w-full py-4 bg-[#1edfff] font-black text-xl text-black
            shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000]
            hover:translate-x-1 hover:translate-y-1
            active:translate-x-2 active:translate-y-2 active:shadow-[2px_2px_0_0_#000]
            transition-all duration-150 mt-4 mb-2"
            >
            <div className="flex items-center justify-center gap-3">
                {login.isPending ? (
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
)}