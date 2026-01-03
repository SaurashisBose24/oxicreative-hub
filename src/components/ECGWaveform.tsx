import { useEffect, useState, useRef } from "react";

interface ECGWaveformProps {
  isActive: boolean;
  heartRate: number | null;
}

const ECGWaveform = ({ isActive, heartRate }: ECGWaveformProps) => {
  const [points, setPoints] = useState<number[]>([]);
  const animationRef = useRef<number>();
  const indexRef = useRef(0);
  
  // ECG pattern - realistic heartbeat wave
  const ecgPattern = [
    0, 0, 0, 0, 0, 2, 4, 2, 0, -2, 
    0, 2, 0, 0, 0, 5, 15, 40, -20, 5, 
    0, 0, 0, 2, 5, 8, 10, 8, 5, 2, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];

  useEffect(() => {
    if (!isActive) {
      setPoints([]);
      indexRef.current = 0;
      return;
    }

    const baseY = 50;
    const amplitude = 0.8;
    
    const animate = () => {
      setPoints(prev => {
        const newPoint = baseY - (ecgPattern[indexRef.current % ecgPattern.length] * amplitude);
        indexRef.current++;
        
        const updated = [...prev, newPoint];
        // Keep only last 100 points for smooth scrolling effect
        if (updated.length > 100) {
          return updated.slice(-100);
        }
        return updated;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Speed based on heart rate
    const interval = heartRate ? 60000 / heartRate / 40 : 50;
    const timer = setInterval(() => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animate();
    }, interval);

    return () => {
      clearInterval(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, heartRate]);

  const pathData = points.length > 1 
    ? `M 0 ${points[0]} ` + points.map((y, i) => `L ${i * 4} ${y}`).join(" ")
    : "";

  return (
    <div className="w-full bg-card rounded-2xl shadow-card border border-border/50 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">ECG Waveform</span>
        {heartRate && (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </span>
            <span className="text-sm font-bold text-destructive">{heartRate} BPM</span>
          </div>
        )}
      </div>
      
      <div className="relative h-24 w-full">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {[...Array(5)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 25}
              x2="100%"
              y2={i * 25}
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 5 + "%"}
              y1="0"
              x2={i * 5 + "%"}
              y2="100%"
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
        </svg>
        
        {/* ECG line */}
        <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="hsl(0, 84%, 60%)" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(0, 84%, 60%)" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {pathData && (
            <path
              d={pathData}
              fill="none"
              stroke="url(#ecgGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              className="transition-all"
            />
          )}
        </svg>
        
        {/* Placeholder when not active */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Start measurement to see waveform</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ECGWaveform;
