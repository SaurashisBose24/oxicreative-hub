import { useState, useCallback } from "react";
import FingerSensor from "@/components/FingerSensor";
import StatusIndicator from "@/components/StatusIndicator";
import InstructionCard from "@/components/InstructionCard";
import MeasureButton from "@/components/MeasureButton";
import OximeterLogo from "@/components/OximeterLogo";
import ResultDisplay from "@/components/ResultDisplay";

const Index = () => {
  const [isConnected] = useState(true);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{ oxygen: number | null; heartRate: number | null }>({
    oxygen: null,
    heartRate: null,
  });

  const handleMeasure = useCallback(() => {
    if (isMeasuring) return;
    
    setIsMeasuring(true);
    setShowResults(false);
    
    // Simulate measurement
    setTimeout(() => {
      setResults({
        oxygen: Math.floor(Math.random() * 5) + 95, // 95-99
        heartRate: Math.floor(Math.random() * 30) + 65, // 65-94
      });
      setIsMeasuring(false);
      setShowResults(true);
    }, 3000);
  }, [isMeasuring]);

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Hero Header */}
      <header className="gradient-hero py-10 px-4 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-secondary/10 blur-2xl" />
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
            Oxygen Saturation
          </h1>
          <p className="text-muted-foreground text-lg">
            Please place your finger in the pulse oximeter
          </p>
          <div className="mt-5 flex justify-center">
            <StatusIndicator isConnected={isConnected} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-8 py-12 px-4">
        {/* Finger Sensor */}
        <div className="animate-float">
          <FingerSensor 
            isActive={isMeasuring} 
            onActivate={handleMeasure}
          />
        </div>

        {/* Measure Button */}
        <MeasureButton 
          onClick={handleMeasure} 
          isActive={isMeasuring}
          disabled={!isConnected}
        />

        {/* Results Display */}
        <ResultDisplay 
          oxygenLevel={results.oxygen}
          heartRate={results.heartRate}
          isVisible={showResults}
        />

        {/* Instructions Card */}
        <InstructionCard />
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border/50">
        <div className="max-w-2xl mx-auto flex justify-center">
          <OximeterLogo />
        </div>
      </footer>
    </div>
  );
};

export default Index;
