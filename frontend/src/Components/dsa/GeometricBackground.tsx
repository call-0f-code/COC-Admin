export const GeometricBackground = () => (
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

    {/* Static geometric shapes */}
    <div className="absolute top-20 left-20 w-16 h-16 bg-black transform rotate-45"></div>
    <div className="absolute top-40 right-32 w-12 h-12 bg-cyan-400 border-4 border-black"></div>
    <div className="absolute bottom-40 left-40 w-20 h-20 bg-cyan-400 border-4 border-black"></div>
    <div className="absolute bottom-20 right-20 w-8 h-32 bg-black"></div>
    <div className="absolute top-1/2 right-1/4 w-24 h-4 bg-black transform -rotate-12"></div>

    {/* Floating elements */}
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      >
        <div
          className={`w-2 h-2 border-2 border-black ${
            i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-cyan-400' : 'bg-black'
          }`}
        />
      </div>
    ))}
  </div>
);