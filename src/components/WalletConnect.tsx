import { useState } from 'react';

interface WalletConnectProps {
  connected: boolean;
  address: string;
  onConnect: () => void;
}

export default function WalletConnect({ connected, address, onConnect }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showRitual, setShowRitual] = useState(false);

  const handleConnect = async () => {
    setShowRitual(true);
    setIsConnecting(true);

    // Simulate ritual animation
    await new Promise(resolve => setTimeout(resolve, 2000));

    onConnect();
    setIsConnecting(false);

    // Keep ritual visible briefly after connection
    await new Promise(resolve => setTimeout(resolve, 500));
    setShowRitual(false);
  };

  if (connected) {
    return (
      <div className="flex justify-center px-4">
        <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-[#1a1028]/60 border border-[#c4a052]/30 backdrop-blur-sm">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#4ade80] animate-pulse shadow-lg shadow-[#4ade80]/50" />
          <span className="text-xs md:text-sm text-[#c4a052]/80 tracking-wider">WALLET CONNECTED</span>
          <span className="text-xs font-mono text-[#f4e4bc]/60 hidden sm:inline">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <span className="text-xs font-mono text-[#f4e4bc]/60 sm:hidden">
            {address.slice(0, 4)}...{address.slice(-3)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center px-4">
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="group relative px-6 md:px-10 py-3 md:py-4 overflow-hidden"
        >
          {/* Animated border */}
          <div className="absolute inset-0 border border-[#c4a052]/50 group-hover:border-[#c4a052] transition-colors duration-300" />
          <div className="absolute inset-[3px] border border-[#c4a052]/20" />

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-l-2 border-[#c4a052] transition-all duration-300 group-hover:w-4 group-hover:h-4 md:group-hover:w-5 md:group-hover:h-5" />
          <div className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 border-[#c4a052] transition-all duration-300 group-hover:w-4 group-hover:h-4 md:group-hover:w-5 md:group-hover:h-5" />
          <div className="absolute bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-l-2 border-[#c4a052] transition-all duration-300 group-hover:w-4 group-hover:h-4 md:group-hover:w-5 md:group-hover:h-5" />
          <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 border-[#c4a052] transition-all duration-300 group-hover:w-4 group-hover:h-4 md:group-hover:w-5 md:group-hover:h-5" />

          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#c4a052]/10 to-transparent" />

          {/* Content */}
          <div className="relative flex items-center gap-2 md:gap-3">
            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-[#c4a052] flex items-center justify-center group-hover:border-[#f4e4bc] transition-colors">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#c4a052] group-hover:bg-[#f4e4bc] group-hover:animate-ping" />
            </div>
            <span className="font-display text-sm md:text-base tracking-[0.2em] text-[#c4a052] group-hover:text-[#f4e4bc] transition-colors">
              CONNECT WALLET
            </span>
          </div>
        </button>
      </div>

      {/* Connection Ritual Overlay */}
      {showRitual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a12]/95 backdrop-blur-md">
          <div className="text-center">
            {/* Mystical circles */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
              <div className="absolute inset-0 rounded-full border border-[#c4a052]/30 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-3 md:inset-4 rounded-full border border-[#c4a052]/40 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
              <div className="absolute inset-6 md:inset-8 rounded-full border border-[#c4a052]/50 animate-spin" style={{ animationDuration: '4s' }} />

              {/* Center orb */}
              <div className="absolute inset-10 md:inset-14 rounded-full bg-gradient-to-br from-[#f4e4bc] via-[#c4a052] to-[#8b6914] animate-pulse shadow-2xl shadow-[#c4a052]/50" />

              {/* Zodiac symbols orbiting */}
              {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((symbol, i) => (
                <span
                  key={symbol}
                  className="absolute text-lg md:text-xl text-[#c4a052]/60 animate-pulse"
                  style={{
                    left: `${50 + 45 * Math.cos((i * 30 - 90) * Math.PI / 180)}%`,
                    top: `${50 + 45 * Math.sin((i * 30 - 90) * Math.PI / 180)}%`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  {symbol}
                </span>
              ))}
            </div>

            <p className="mt-8 md:mt-12 font-display text-lg md:text-xl tracking-[0.3em] text-[#c4a052] animate-pulse">
              {isConnecting ? 'CHANNELING THE COSMOS...' : 'CONNECTED'}
            </p>
            <p className="mt-2 text-xs md:text-sm text-[#c4a052]/50 tracking-wider">
              Aligning celestial energies with your wallet
            </p>
          </div>
        </div>
      )}
    </>
  );
}
