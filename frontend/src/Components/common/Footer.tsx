import { Lock } from "lucide-react"

export const Footer = () => (
    <div className="mt-4 bg-white border-6 border-black p-6 shadow-[8px_8px_0_0_#00FFFF]">
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
)