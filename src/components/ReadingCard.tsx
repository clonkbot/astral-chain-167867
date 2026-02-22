interface ReadingCardProps {
  title: string;
  icon: string;
  description: string;
  index: number;
  onClick: () => void;
  disabled: boolean;
}

export default function ReadingCard({ title, icon, description, index, onClick, disabled }: ReadingCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative p-5 md:p-6 text-left transition-all duration-500 ${
        disabled
          ? 'opacity-40 cursor-not-allowed'
          : 'hover:scale-[1.02] cursor-pointer'
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1028]/80 to-[#0d0d18]/90 border border-[#c4a052]/20 transition-all duration-300 group-hover:border-[#c4a052]/40" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#c4a052]/40 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-[#c4a052]" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#c4a052]/40 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-[#c4a052]" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#c4a052]/40 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-[#c4a052]" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#c4a052]/40 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-[#c4a052]" />

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#c4a052]/5 via-[#c4a052]/10 to-[#c4a052]/5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start gap-3 md:gap-4">
          <span className="text-2xl md:text-3xl text-[#c4a052] group-hover:scale-110 transition-transform duration-300">
            {icon}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base md:text-lg tracking-widest text-[#f4e4bc] group-hover:text-[#fff] transition-colors truncate">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-[#c4a052]/60 mt-1 group-hover:text-[#c4a052]/80 transition-colors line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* Mystical line decoration */}
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#c4a052]/30 to-transparent group-hover:via-[#c4a052]/60 transition-all duration-300" />

        {/* Action hint */}
        <div className="mt-3 flex items-center justify-end gap-2 text-[#c4a052]/40 group-hover:text-[#c4a052] transition-colors">
          <span className="text-xs tracking-widest uppercase">
            {disabled ? 'Locked' : 'Begin Reading'}
          </span>
          <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
            {disabled ? '◇' : '→'}
          </span>
        </div>
      </div>
    </button>
  );
}
