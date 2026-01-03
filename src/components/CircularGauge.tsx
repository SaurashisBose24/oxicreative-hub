import { useEffect, useState } from "react";

interface CircularGaugeProps {
  value: number | null;
  maxValue?: number;
  isAnimating?: boolean;
  label: string;
  unit: string;
  status?: string;
  statusColor?: string;
}

const CircularGauge = ({ 
  value, 
  maxValue = 100, 
  isAnimating = false,
  label,
  unit,
  status,
  statusColor = "text-success"
}: CircularGaugeProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const size = 220;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  useEffect(() => {
    if (value !== null && !isAnimating) {
      // Animate the value counting up
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          setProgress((value / maxValue) * 100);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
          setProgress((current / maxValue) * 100);
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    } else if (isAnimating) {
      // Pulsing animation during measurement
      let angle = 0;
      const timer = setInterval(() => {
        angle += 5;
        setProgress(50 + Math.sin(angle * Math.PI / 180) * 30);
        setDisplayValue(Math.floor(90 + Math.random() * 8));
      }, 100);
      
      return () => clearInterval(timer);
    }
  }, [value, maxValue, isAnimating]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-secondary/60 animate-float-particle"
            style={{
              left: `${20 + Math.cos((i * 60) * Math.PI / 180) * 45}%`,
              top: `${50 + Math.sin((i * 60) * Math.PI / 180) * 45}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Outer glow */}
      <div 
        className={`absolute rounded-full transition-all duration-500 ${
          isAnimating ? "animate-pulse-glow" : ""
        }`}
        style={{
          width: size + 40,
          height: size + 40,
          background: `radial-gradient(circle, hsl(var(--success) / 0.15) 0%, transparent 70%)`
        }}
      />

      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          className="opacity-30"
        />
        
        {/* Progress circle with gradient */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(142, 70%, 45%)" />
            <stop offset="100%" stopColor="hsl(160, 80%, 40%)" />
          </linearGradient>
        </defs>
        
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-out drop-shadow-[0_0_8px_hsl(142,70%,45%,0.5)]"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-baseline gap-1">
          <span className="text-6xl font-display font-bold text-foreground tabular-nums">
            {displayValue || "--"}
          </span>
          <span className="text-2xl font-medium text-muted-foreground">{unit}</span>
        </div>
        <span className="text-sm text-muted-foreground mt-1">{label}</span>
        {status && (
          <span className={`text-sm font-semibold mt-2 ${statusColor}`}>
            {status}
          </span>
        )}
      </div>
    </div>
  );
};

export default CircularGauge;
