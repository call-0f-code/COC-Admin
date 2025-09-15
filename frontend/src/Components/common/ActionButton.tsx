export const ActionButton = ({ onClick, children, variant = 'primary', disabled = false }) => {
  const baseClasses = "px-6 py-3 font-black text-lg border-4 border-black transition-all duration-150";
  const variants = {
    primary: "bg-cyan-400 text-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-1 hover:translate-y-1",
    danger: "bg-red-400 text-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-1 hover:translate-y-1",
    secondary: "bg-white text-black shadow-[4px_4px_0_0_#00FFFF] hover:shadow-[2px_2px_0_0_#00FFFF] hover:translate-x-1 hover:translate-y-1"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};