import { useState, useEffect } from 'react';
import StarField from './components/StarField';
import ZodiacWheel from './components/ZodiacWheel';
import ReadingCard from './components/ReadingCard';
import WalletConnect from './components/WalletConnect';

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire' },
  { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth' },
  { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air' },
  { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water' },
  { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire' },
  { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth' },
  { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air' },
  { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water' },
  { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire' },
  { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth' },
  { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air' },
  { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water' },
];

const readings = [
  { title: 'Daily Horoscope', icon: '☀', description: 'Your celestial guidance for today' },
  { title: 'Love Compatibility', icon: '♡', description: 'Discover your cosmic connections' },
  { title: 'Career Path', icon: '⚔', description: 'Navigate your professional destiny' },
  { title: 'Moon Phase', icon: '☾', description: 'Harness lunar energy cycles' },
];

function App() {
  const [selectedSign, setSelectedSign] = useState<number | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [activeReading, setActiveReading] = useState<number | null>(null);
  const [showReadingResult, setShowReadingResult] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const handleWalletConnect = () => {
    const mockAddress = '0x' + Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setWalletAddress(mockAddress);
    setWalletConnected(true);
  };

  const handleReadingClick = (index: number) => {
    setActiveReading(index);
    setTimeout(() => setShowReadingResult(true), 800);
  };

  const closeReading = () => {
    setShowReadingResult(false);
    setTimeout(() => setActiveReading(null), 300);
  };

  return (
    <div className="min-h-screen bg-[#0a0a12] text-[#e8e4d9] overflow-x-hidden relative">
      <StarField />

      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#1a1028]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0a0a12] to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <header className={`pt-8 md:pt-12 px-4 md:px-8 text-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="inline-block relative">
            <div className="absolute -inset-4 md:-inset-8 border border-[#c4a052]/20 rotate-45 scale-75" />
            <div className="absolute -inset-6 md:-inset-12 border border-[#c4a052]/10 rotate-45 scale-90" />
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-[#f4e4bc] via-[#c4a052] to-[#8b6914]">
              ASTRAL CHAIN
            </h1>
          </div>
          <p className="mt-4 md:mt-6 text-sm md:text-base tracking-[0.3em] text-[#c4a052]/60 uppercase font-light">
            Interactive Celestial Wallet
          </p>
        </header>

        {/* Wallet Connection */}
        <div className={`mt-8 md:mt-12 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <WalletConnect
            connected={walletConnected}
            address={walletAddress}
            onConnect={handleWalletConnect}
          />
        </div>

        {/* Zodiac Wheel Section */}
        <section className={`mt-12 md:mt-16 px-4 transition-all duration-1000 delay-400 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-6 md:mb-8">
            <h2 className="font-display text-xl md:text-2xl tracking-[0.15em] text-[#c4a052]">
              SELECT YOUR SIGN
            </h2>
            <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-[#c4a052]/50 to-transparent mx-auto mt-3" />
          </div>

          <ZodiacWheel
            signs={zodiacSigns}
            selectedIndex={selectedSign}
            onSelect={setSelectedSign}
          />

          {selectedSign !== null && (
            <div className="mt-6 md:mt-8 text-center animate-fadeIn">
              <div className="inline-block px-6 md:px-8 py-3 md:py-4 border border-[#c4a052]/30 bg-[#1a1028]/50 backdrop-blur-sm">
                <span className="text-3xl md:text-4xl mr-3">{zodiacSigns[selectedSign].symbol}</span>
                <span className="font-display text-xl md:text-2xl tracking-widest text-[#f4e4bc]">
                  {zodiacSigns[selectedSign].name}
                </span>
                <p className="text-xs md:text-sm text-[#c4a052]/60 mt-1 tracking-wider">
                  {zodiacSigns[selectedSign].dates} • {zodiacSigns[selectedSign].element}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Readings Section */}
        <section className={`mt-16 md:mt-20 px-4 md:px-8 pb-8 transition-all duration-1000 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-display text-xl md:text-2xl tracking-[0.15em] text-[#c4a052]">
              COSMIC READINGS
            </h2>
            <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-[#c4a052]/50 to-transparent mx-auto mt-3" />
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {readings.map((reading, index) => (
              <ReadingCard
                key={reading.title}
                {...reading}
                index={index}
                onClick={() => handleReadingClick(index)}
                disabled={!walletConnected || selectedSign === null}
              />
            ))}
          </div>

          {!walletConnected && (
            <p className="text-center mt-6 text-[#c4a052]/40 text-sm tracking-wider">
              Connect your wallet to unlock readings
            </p>
          )}
          {walletConnected && selectedSign === null && (
            <p className="text-center mt-6 text-[#c4a052]/40 text-sm tracking-wider">
              Select your zodiac sign to begin
            </p>
          )}
        </section>

        {/* Reading Result Modal */}
        {activeReading !== null && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${showReadingResult ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`}
            onClick={closeReading}
          >
            <div
              className={`relative max-w-lg w-full bg-gradient-to-b from-[#1a1028] to-[#0d0d18] border border-[#c4a052]/30 p-6 md:p-8 transition-all duration-500 ${showReadingResult ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute -inset-px bg-gradient-to-b from-[#c4a052]/20 to-transparent pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 2px, 0 2px)' }} />

              <button
                onClick={closeReading}
                className="absolute top-4 right-4 text-[#c4a052]/60 hover:text-[#c4a052] transition-colors text-2xl"
              >
                ×
              </button>

              <div className="text-center">
                <span className="text-4xl md:text-5xl">{readings[activeReading].icon}</span>
                <h3 className="font-display text-xl md:text-2xl tracking-widest text-[#f4e4bc] mt-4">
                  {readings[activeReading].title}
                </h3>
                <div className="w-16 h-px bg-[#c4a052]/30 mx-auto my-4" />

                {selectedSign !== null && (
                  <>
                    <p className="text-[#c4a052] tracking-wider mb-4">
                      {zodiacSigns[selectedSign].symbol} {zodiacSigns[selectedSign].name}
                    </p>
                    <p className="text-[#e8e4d9]/80 leading-relaxed text-sm md:text-base">
                      The celestial bodies align in your favor, dear {zodiacSigns[selectedSign].name}.
                      As the stars weave their ancient patterns across the cosmic tapestry,
                      your path becomes illuminated with newfound clarity. Trust in the universe's
                      divine timing and embrace the transformative energy flowing through your sign.
                    </p>
                    <div className="mt-6 pt-6 border-t border-[#c4a052]/20">
                      <p className="text-xs text-[#c4a052]/40 tracking-wider">
                        READING STORED ON-CHAIN
                      </p>
                      <p className="text-xs text-[#c4a052]/60 font-mono mt-1 break-all">
                        {walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 md:mt-24 pb-6 md:pb-8 text-center">
          <div className="w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-[#c4a052]/20 to-transparent mx-auto mb-4 md:mb-6" />
          <p className="text-[10px] md:text-xs text-[#c4a052]/30 tracking-widest">
            Requested by @jianke2 · Built by @clonkbot
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
