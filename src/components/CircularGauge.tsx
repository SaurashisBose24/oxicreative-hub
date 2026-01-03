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
  
  const size = 260;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  useEffect(() => {
    if (value !== null && !isAnimating) {
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
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/40 animate-float-particle"
            style={{
              left: `${50 + Math.cos((i * 45) * Math.PI / 180) * 55}%`,
              top: `${50 + Math.sin((i * 45) * Math.PI / 180) * 55}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + i * 0.3}s`
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
          width: size + 60,
          height: size + 60,
          background: `radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)`
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
          className="opacity-40"
        />
        
        {/* Progress circle with gradient */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(0, 85%, 55%)" />
            <stop offset="50%" stopColor="hsl(340, 80%, 50%)" />
            <stop offset="100%" stopColor="hsl(210, 100%, 55%)" />
          </linearGradient>
          <filter id="gaugeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
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
          filter="url(#gaugeGlow)"
          className="transition-all duration-300 ease-out"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-baseline gap-1">
          <span className="text-7xl font-display font-bold text-foreground tabular-nums tracking-tight">
            {displayValue || "--"}
          </span>
          <span className="text-3xl font-medium text-muted-foreground">{unit}</span>
        </div>
        <span className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">{label}</span>
        {status && (
          <span className={`text-sm font-semibold mt-3 px-4 py-1 rounded-full bg-muted/50 ${statusColor}`}>
            {status}
          </span>
        )}
      </div>
    </div>
  );
};

export default CircularGauge;
