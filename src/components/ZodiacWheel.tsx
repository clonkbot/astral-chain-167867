import { useState, useRef, useEffect } from 'react';

interface ZodiacSign {
  name: string;
  symbol: string;
  dates: string;
  element: string;
}

interface ZodiacWheelProps {
  signs: ZodiacSign[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export default function ZodiacWheel({ signs, selectedIndex, onSelect }: ZodiacWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef(0);

  const handleSignClick = (index: number) => {
    const targetRotation = -index * 30;
    setRotation(targetRotation);
    onSelect(index);
  };

  const getPointAngle = (clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  };

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    lastAngleRef.current = getPointAngle(clientX, clientY);
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const currentAngle = getPointAngle(clientX, clientY);
    const delta = currentAngle - lastAngleRef.current;
    setRotation(prev => prev + delta);
    lastAngleRef.current = currentAngle;
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest sign
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const nearestIndex = Math.round(normalizedRotation / 30) % 12;
    const snappedRotation = Math.round(rotation / 30) * 30;
    setRotation(snappedRotation);
    onSelect((12 - nearestIndex) % 12);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDragMove(e.clientX, e.clientY);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => handleDragEnd();

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div className="flex justify-center">
      <div
        ref={containerRef}
        className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
        onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
      >
        {/* Outer decorative ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#c4a052]/20" />
        <div className="absolute inset-2 md:inset-3 rounded-full border border-[#c4a052]/10" />

        {/* Rotating wheel */}
        <div
          className="absolute inset-4 md:inset-6 transition-transform duration-500 ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {/* Inner decorative elements */}
          <div className="absolute inset-0 rounded-full border border-[#c4a052]/30" />

          {/* Zodiac signs */}
          {signs.map((sign, index) => {
            const angle = index * 30 - 90;
            const isSelected = selectedIndex === index;
            const radius = 42;

            return (
              <button
                key={sign.name}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSignClick(index);
                }}
                className={`absolute w-10 h-10 md:w-12 md:h-12 -ml-5 md:-ml-6 -mt-5 md:-mt-6 flex items-center justify-center rounded-full transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#c4a052] text-[#0a0a12] scale-125 shadow-lg shadow-[#c4a052]/50'
                    : 'bg-[#1a1028]/80 text-[#c4a052] hover:bg-[#c4a052]/20 hover:scale-110'
                } border ${isSelected ? 'border-[#f4e4bc]' : 'border-[#c4a052]/30'}`}
                style={{
                  left: `${50 + radius * Math.cos(angle * Math.PI / 180)}%`,
                  top: `${50 + radius * Math.sin(angle * Math.PI / 180)}%`,
                  transform: `rotate(${-rotation}deg)`,
                }}
              >
                <span className="text-lg md:text-2xl">{sign.symbol}</span>
              </button>
            );
          })}

          {/* Center orb */}
          <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-[#1a1028] to-[#0d0d18] border border-[#c4a052]/40 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c4a052]/10 to-transparent" />
            <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-[#f4e4bc] to-[#c4a052] animate-pulse shadow-lg shadow-[#c4a052]/50" />
          </div>
        </div>

        {/* Pointer/indicator */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
          <div className="w-0 h-0 border-l-[6px] md:border-l-[8px] border-r-[6px] md:border-r-[8px] border-t-[10px] md:border-t-[12px] border-l-transparent border-r-transparent border-t-[#c4a052]" />
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#c4a052]/5 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
