import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, X, Info, AlertTriangle } from 'lucide-react';
import type { Toast as ToastType } from './types';

interface ToastComponentProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

export const ToastComponent: React.FC<ToastComponentProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(toast.id), 200);
  };

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-green-400',
          border: 'border-black',
          icon: CheckCircle,
          iconBg: 'bg-black',
          iconColor: 'text-green-400'
        };
      case 'error':
        return {
          bg: 'bg-red-400',
          border: 'border-black',
          icon: AlertCircle,
          iconBg: 'bg-black',
          iconColor: 'text-red-400'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-400',
          border: 'border-black',
          icon: AlertTriangle,
          iconBg: 'bg-black',
          iconColor: 'text-yellow-400'
        };
      case 'info':
        return {
          bg: 'bg-cyan-400',
          border: 'border-black',
          icon: Info,
          iconBg: 'bg-black',
          iconColor: 'text-cyan-400'
        };
      default:
        return {
          bg: 'bg-gray-400',
          border: 'border-black',
          icon: Info,
          iconBg: 'bg-black',
          iconColor: 'text-gray-400'
        };
    }
  };

  const styles = getToastStyles();
  const Icon = styles.icon;

  return (
    <div
      className={`
        transform transition-all duration-300 ease-out mb-3
        ${isVisible && !isRemoving 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
      `}
    >
      <div className={`
        ${styles.bg} ${styles.border} border-4 p-4 
        shadow-[6px_6px_0_0_#000] 
        min-w-[300px] max-w-[400px]
        hover:shadow-[4px_4px_0_0_#000] 
        hover:translate-x-1 hover:translate-y-1
        transition-all duration-150
      `}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`${styles.iconBg} ${styles.border} border-2 w-8 h-8 flex items-center justify-center`}>
              <Icon className={`w-4 h-4 ${styles.iconColor}`} />
            </div>
            
            <div className="text-black font-bold text-sm leading-tight">
              {toast.message}
            </div>
          </div>

          <button
            onClick={handleRemove}
            className={`
              ${styles.iconBg} ${styles.border} border-2 w-6 h-6 
              flex items-center justify-center
              hover:bg-gray-800 transition-colors
              group
            `}
            aria-label="Close notification"
          >
            <X className="w-3 h-3 text-white group-hover:text-gray-300" />
          </button>
        </div>

        <div className="mt-3 h-1 bg-black border border-black">
          <div 
            className="h-full bg-white border-r border-black"
            style={{
              animation: `shrink ${toast.duration || 4000}ms linear forwards`
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};