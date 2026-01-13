import { Mail, Eye, EyeOff, ArrowLeft, Cpu, Lock, XCircle } from "lucide-react";
import { useMembers } from "../../hooks/useMembers";
import { globalToast } from "../../utils/toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const gifUrl = import.meta.env.VITE_GIF_URL;


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
    const { login } = useMembers();
    const [showPassword, setShowPassword] = useState(false);
    const [isUnauthorized, setIsUnauthorized] = useState(false);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isUnauthorized) {
                setIsUnauthorized(false);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isUnauthorized]);

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        setIsUnauthorized(false); // Reset error state
        login.mutate(
            { email: loginForm.email, password: loginForm.password },
            {
                onSuccess: () => {
                    navigate('/Dashboard')
                    globalToast.success("Login Successful");
                },
                onError: () => {
                    setIsUnauthorized(true);
                    globalToast.error("Unauthorized: Access Denied");
                }
            }
        );
    };


    return (
        <>
            {/* Unauthorized Modal Popup */}
            {isUnauthorized && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
                    {/* Dark Overlay */}
                    <div
                        className="absolute inset-0 bg-black/90"
                        onClick={() => setIsUnauthorized(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-3xl bg-black border-8 border-red-500 p-8 shadow-[0_0_50px_rgba(239,68,68,0.5)] animate-scaleIn">
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => setIsUnauthorized(false)}
                            className="absolute top-4 right-4 w-12 h-12 bg-red-500 border-4 border-black flex items-center justify-center hover:bg-red-600 transition-colors shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-1 hover:translate-y-1"
                        >
                            <XCircle className="w-6 h-6 text-white" />
                        </button>

                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="inline-block px-6 py-3 bg-red-500 border-4 border-black mb-4">
                                <h2 className="text-3xl font-black text-white tracking-wider">
                                    ⚠️ ACCESS DENIED ⚠️
                                </h2>
                            </div>
                            <p className="text-xl font-bold text-white">
                                You are not authorized to access this system
                            </p>
                        </div>

                        {/* Large Video/Image Display */}
                        <div className="bg-white border-6 border-black p-4 shadow-[8px_8px_0_0_#ef4444]">
                            <img
                                src={gifUrl}
                                alt="Access Denied"
                                className="w-full h-auto border-4 border-black"
                            />
                            <div className="mt-4 text-center">

                            </div>
                        </div>

                        {/* Footer Message */}
                        <div className="mt-6 text-center">
                            <p className="text-white font-bold text-sm">
                                Press ESC or click the X to close
                            </p>
                        </div>
                    </div>
                </div>
            )}

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
                        <div className="absolute left-3 top-5 w-6 h-6 bg-cyan-400 border-2 border-black flex items-center justify-center">
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
                        <div className="absolute left-3 top-5 w-6 h-6 bg-cyan-400 border-2 border-black flex items-center justify-center">
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
                            className="absolute right-3 top-5 w-6 h-6 bg-black border-2 border-black flex items-center justify-center text-white hover:bg-cyan-400 hover:text-black transition-colors"
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
        </>
    )
}