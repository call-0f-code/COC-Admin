export const GeometricBackground = () => (
  <div className="fixed inset-0 w-full h-full">
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

    {/* Static geometric shapes */}
    <div className="absolute top-16 left-1/3 w-20 h-20 bg-cyan-400 rounded-full border-4 border-black"></div>
    <div className="absolute bottom-24 right-28 w-16 h-16 bg-black rotate-12"></div>
    <div className="absolute top-1/4 right-1/4 w-24 h-12 bg-cyan-400 border-4 border-black rotate-6"></div>
    <div className="absolute bottom-12 left-12 w-8 h-24 bg-black"></div>
    <div className="absolute top-2/3 left-[20%] w-10 h-10 bg-black rounded-full"></div>

    {/* Floating random shapes */}
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      >
        {i % 2 === 0 ? (
          <div className="w-3 h-3 bg-cyan-400 border-2 border-black rounded-full" />
        ) : (
          <div className="w-3 h-3 bg-black border-2 border-cyan-400 rotate-45" />
        )}
      </div>
    ))}
  </div>
);

