import { useState } from "react";
import { Hand } from "lucide-react";

interface FingerSensorProps {
  isActive: boolean;
  onActivate: () => void;
}

const FingerSensor = ({ isActive, onActivate }: FingerSensorProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      {/* Animated pulse rings */}
      {isActive && (
        <>
          <div className="absolute w-64 h-64 rounded-full bg-primary/20 animate-pulse-ring" />
          <div className="absolute w-64 h-64 rounded-full bg-primary/20 animate-pulse-ring [animation-delay:0.5s]" />
          <div className="absolute w-64 h-64 rounded-full bg-primary/20 animate-pulse-ring [animation-delay:1s]" />
        </>
      )}
      
      {/* Outer glow ring */}
      <div 
        className={`absolute w-56 h-56 rounded-full transition-all duration-500 ${
          isActive 
            ? "bg-gradient-to-br from-primary/30 to-secondary/30 animate-pulse-glow" 
            : "bg-muted/50"
        }`}
      />
      
      {/* Main sensor circle */}
      <button
        onClick={onActivate}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center gap-3 transition-all duration-300 cursor-pointer shadow-card ${
          isActive 
            ? "bg-gradient-to-br from-card to-accent scale-105" 
            : isHovered 
              ? "bg-card scale-102 shadow-soft" 
              : "bg-card"
        }`}
      >
        {/* Shimmer effect on hover */}
        {isHovered && !isActive && (
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 animate-shimmer" />
          </div>
        )}
        
        {/* Hand icon */}
        <div className={`transition-transform duration-300 ${isActive ? "animate-heartbeat" : isHovered ? "scale-110" : ""}`}>
          <Hand 
            className={`w-16 h-16 transition-colors duration-300 ${
              isActive ? "text-primary" : "text-primary/70"
            }`} 
            strokeWidth={1.5}
          />
        </div>
        
        {/* Label */}
        <span className={`text-lg font-medium transition-colors duration-300 ${
          isActive ? "text-primary" : "text-foreground/80"
        }`}>
          {isActive ? "Measuring..." : "Place Finger"}
        </span>
      </button>
    </div>
  );
};

export default FingerSensor;
