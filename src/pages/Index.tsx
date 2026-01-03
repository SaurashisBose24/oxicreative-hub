import { useState, useCallback } from "react";
import { Activity } from "lucide-react";
import CircularGauge from "@/components/CircularGauge";
import ECGWaveform from "@/components/ECGWaveform";
import ReadingHistory from "@/components/ReadingHistory";
import TipsCard from "@/components/TipsCard";
import StatusIndicator from "@/components/StatusIndicator";
import { Button } from "@/components/ui/button";

interface Reading {
  id: string;
  oxygen: number;
  heartRate: number;
  timestamp: Date;
}

const Index = () => {
  const [isConnected] = useState(true);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [results, setResults] = useState<{ oxygen: number | null; heartRate: number | null }>({
    oxygen: null,
    heartRate: null,
  });
  const [readings, setReadings] = useState<Reading[]>([]);

  const handleMeasure = useCallback(() => {
    if (isMeasuring) {
      // Stop measuring
      setIsMeasuring(false);
      return;
    }
    
    setIsMeasuring(true);
    setResults({ oxygen: null, heartRate: null });
    
    // Simulate measurement
    setTimeout(() => {
      const newOxygen = Math.floor(Math.random() * 5) + 95;
      const newHeartRate = Math.floor(Math.random() * 30) + 65;
      
      setResults({
        oxygen: newOxygen,
        heartRate: newHeartRate,
      });
      setIsMeasuring(false);
      
      // Add to history
      setReadings(prev => [{
        id: Date.now().toString(),
        oxygen: newOxygen,
        heartRate: newHeartRate,
        timestamp: new Date()
      }, ...prev]);
    }, 4000);
  }, [isMeasuring]);

  const getStatus = (oxygen: number | null) => {
    if (!oxygen) return { text: "", color: "" };
    if (oxygen >= 95) return { text: "Normal", color: "text-success" };
    if (oxygen >= 90) return { text: "Low", color: "text-primary" };
    return { text: "Critical", color: "text-destructive" };
  };

  const status = getStatus(results.oxygen);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="gradient-hero py-6 px-4 border-b border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">VitalSync</h1>
              <p className="text-xs text-muted-foreground">Health Monitor</p>
            </div>
          </div>
          <StatusIndicator isConnected={isConnected} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Gauge & ECG */}
            <div className="lg:col-span-2 space-y-6">
              {/* Gauge Card */}
              <div className="bg-card rounded-3xl shadow-card border border-border/50 p-8 animate-fade-in">
                <div className="flex flex-col items-center">
                  <CircularGauge
                    value={results.oxygen}
                    isAnimating={isMeasuring}
                    label="SpO₂ Level"
                    unit="%"
                    status={isMeasuring ? "Measuring..." : status.text}
                    statusColor={isMeasuring ? "text-primary animate-pulse" : status.color}
                  />
                  
                  {/* Measure Button */}
                  <Button
                    onClick={handleMeasure}
                    disabled={!isConnected}
                    variant="measure"
                    size="lg"
                    className="mt-8 min-w-[280px] group relative overflow-hidden"
                  >
                    <Activity 
                      className={`w-5 h-5 mr-2 transition-transform duration-300 ${
                        isMeasuring ? "animate-pulse" : "group-hover:scale-110"
                      }`} 
                    />
                    <span>{isMeasuring ? "Measuring... Tap to Stop" : "Start Measurement"}</span>
                    
                    {/* Shimmer effect */}
                    {!isMeasuring && !(!isConnected) && (
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute inset-0 animate-shimmer opacity-50" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>

              {/* ECG Waveform */}
              <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
                <ECGWaveform 
                  isActive={isMeasuring || results.heartRate !== null} 
                  heartRate={isMeasuring ? 72 : results.heartRate}
                />
              </div>
            </div>

            {/* Right Column - Tips & History */}
            <div className="space-y-6">
              <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
                <TipsCard />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
                <ReadingHistory readings={readings} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 border-t border-border/50 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            VitalSync Health Monitor • For reference only, not a medical device
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
