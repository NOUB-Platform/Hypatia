import React from 'react';

interface HypatiaIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

/**
 * Classical Portrait Icon for Hypatia of Alexandria (Philosopher, Mathematician & Astronomer)
 * Replaces generic robot icons with a distinguished, classical profile of Hypatia.
 */
export const HypatiaIcon: React.FC<HypatiaIconProps> = ({ 
  size = 24, 
  className = "w-5 h-5", 
  ...props 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Halo / Astrolabe Celestial Orbit ring behind head */}
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.45" />

      {/* Classical Laurel / Headband (Stephane) of the Alexandrian Scholar */}
      <path d="M7.8 7.2C9 5.5 12 5.2 14.5 6.2C15.8 6.7 16.8 7.8 17.2 9.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 5.2L11.5 3.8M13 5.8L14.5 4.5M8.5 6.5L7.2 5.2" stroke="currentColor" strokeWidth="1.4" opacity="0.75" />

      {/* Profile: Forehead, Classical Greek Nose, Lips, Chin, Neck */}
      <path 
        d="M14.5 6.5C14.8 8.5 15.5 9.8 16.8 10.6C16.3 11.2 15.5 11.5 15.8 12.3C16.1 12.9 15.4 13.5 15.7 14.2C15 15.5 13.5 16.2 12.8 18C12.5 18.8 12.5 20 12.5 21" 
        stroke="currentColor" 
        strokeWidth="1.8" 
      />

      {/* Elegant Classical Chignon / Hair Bun draped back */}
      <path 
        d="M8.2 8C6.8 9.2 6 11 6.2 13C6.5 15.2 8.2 16.8 10.2 17.2C11 17.4 11.8 17.2 12.5 17" 
        stroke="currentColor" 
        strokeWidth="1.8" 
      />
      <path d="M6.2 11.8C5 12 4 13.2 4.2 14.5C4.5 15.8 5.8 16.5 7.2 16.2" stroke="currentColor" strokeWidth="1.5" />

      {/* Eye and Brow of contemplation */}
      <path d="M12.8 9.8C13.5 9.5 14.2 9.6 14.8 10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13.8" cy="10.8" r="0.6" fill="currentColor" />

      {/* Draped Stola / Robe Collar */}
      <path d="M9 19.5C10.5 20.2 12.5 20.8 15 21" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 21C9 21.2 11.5 21.5 14 21.8" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      
      {/* Wisdom Sparkle Star */}
      <circle cx="19" cy="5" r="1" fill="currentColor" />
    </svg>
  );
};
export default HypatiaIcon;
