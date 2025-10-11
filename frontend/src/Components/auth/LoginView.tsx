import { useState } from 'react';
import {Lock} from 'lucide-react';

import { LoginForm } from './LoginForm';


interface LoginProps {
  onBack: () => void;
}

interface Credentials {
  email: string;
  password: string;
}

export default function Login({ onBack }: LoginProps) {

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });


  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">

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
            <LoginForm
                loginForm={loginForm}
                setLoginForm={setLoginForm}
                onBack={onBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
