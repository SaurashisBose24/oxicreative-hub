import { useState, useCallback } from "react";
import { Activity, Heart, Droplets } from "lucide-react";
import CircularGauge from "@/components/CircularGauge";
import ECGWaveform from "@/components/ECGWaveform";
import ReadingHistory from "@/components/ReadingHistory";
import TipsCard from "@/components/TipsCard";
import StatusIndicator from "@/components/StatusIndicator";

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
      setIsMeasuring(false);
      return;
    }
    
    setIsMeasuring(true);
    setResults({ oxygen: null, heartRate: null });
    
    setTimeout(() => {
      const newOxygen = Math.floor(Math.random() * 5) + 95;
      const newHeartRate = Math.floor(Math.random() * 30) + 65;
      
      setResults({
        oxygen: newOxygen,
        heartRate: newHeartRate,
      });
      setIsMeasuring(false);
      
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
    if (oxygen >= 90) return { text: "Low", color: "text-amber-400" };
    return { text: "Critical", color: "text-destructive" };
  };

  const status = getStatus(results.oxygen);

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 py-5 px-6 border-b border-border/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">VitalSync</h1>
              <p className="text-sm text-muted-foreground">Health Monitor Pro</p>
            </div>
          </div>
          <StatusIndicator isConnected={isConnected} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Left Column - Main Gauge */}
            <div className="xl:col-span-5 flex flex-col items-center justify-center">
              <div className="glass-card rounded-3xl p-10 w-full animate-fade-in">
                <div className="flex flex-col items-center">
                  {/* SpO2 Gauge */}
                  <CircularGauge
                    value={results.oxygen}
                    isAnimating={isMeasuring}
                    label="Blood Oxygen"
                    unit="%"
                    status={isMeasuring ? "Measuring..." : status.text}
                    statusColor={isMeasuring ? "text-primary animate-pulse" : status.color}
                  />
                  
                  {/* Heart Rate Display */}
                  <div className="mt-8 flex items-center gap-6">
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-muted/30 border border-border/50">
                      <Heart className={`w-5 h-5 text-red-400 ${isMeasuring ? 'animate-heartbeat' : ''}`} />
                      <div>
                        <p className="text-xs text-muted-foreground">Heart Rate</p>
                        <p className="text-xl font-bold text-foreground">
                          {results.heartRate ?? (isMeasuring ? '72' : '--')} <span className="text-sm font-normal text-muted-foreground">BPM</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-muted/30 border border-border/50">
                      <Droplets className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">SpO₂</p>
                        <p className="text-xl font-bold text-foreground">
                          {results.oxygen ?? (isMeasuring ? '97' : '--')} <span className="text-sm font-normal text-muted-foreground">%</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Measure Button */}
                  <button
                    onClick={handleMeasure}
                    disabled={!isConnected}
                    className={`mt-10 w-full max-w-sm group relative overflow-hidden rounded-2xl px-10 py-5 font-semibold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                      isMeasuring 
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-[0_0_40px_rgba(239,68,68,0.4)]" 
                        : "bg-gradient-to-r from-primary via-cyan-400 to-secondary text-primary-foreground shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:shadow-[0_0_60px_rgba(14,165,233,0.5)]"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Activity 
                        className={`w-6 h-6 transition-transform duration-300 ${
                          isMeasuring ? "animate-heartbeat" : "group-hover:scale-110"
                        }`} 
                      />
                      <span>{isMeasuring ? "Tap to Stop" : "Start Measurement"}</span>
                    </span>
                    
                    {!isMeasuring && isConnected && (
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 animate-shimmer" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Center Column - ECG Waveform */}
            <div className="xl:col-span-4 flex flex-col gap-6">
              <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
                <ECGWaveform 
                  isActive={isMeasuring || results.heartRate !== null} 
                  heartRate={isMeasuring ? 72 : results.heartRate}
                />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
                <TipsCard />
              </div>
            </div>

            {/* Right Column - History */}
            <div className="xl:col-span-3">
              <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
                <ReadingHistory readings={readings} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-6 border-t border-border/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            VitalSync Health Monitor • For reference only, not a medical device
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
