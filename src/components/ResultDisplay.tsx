import { Heart, Droplets } from "lucide-react";

interface ResultDisplayProps {
  oxygenLevel: number | null;
  heartRate: number | null;
  isVisible: boolean;
}

const ResultDisplay = ({ oxygenLevel, heartRate, isVisible }: ResultDisplayProps) => {
  if (!isVisible) return null;

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md animate-fade-in">
      {/* Oxygen Level Card */}
      <div className="bg-card rounded-2xl shadow-card border border-border/50 p-6 text-center transition-all duration-300 hover:shadow-soft hover:scale-[1.02]">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Droplets className="w-5 h-5 text-secondary" />
          <span className="text-sm font-medium text-muted-foreground">SpO2</span>
        </div>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-display font-bold text-foreground">
            {oxygenLevel ?? "--"}
          </span>
          <span className="text-lg text-muted-foreground">%</span>
        </div>
        <div className={`mt-2 text-xs font-medium ${
          oxygenLevel && oxygenLevel >= 95 ? "text-success" : 
          oxygenLevel && oxygenLevel >= 90 ? "text-primary" : "text-destructive"
        }`}>
          {oxygenLevel ? (oxygenLevel >= 95 ? "Normal" : oxygenLevel >= 90 ? "Low" : "Critical") : ""}
        </div>
      </div>

      {/* Heart Rate Card */}
      <div className="bg-card rounded-2xl shadow-card border border-border/50 p-6 text-center transition-all duration-300 hover:shadow-soft hover:scale-[1.02]">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-primary animate-heartbeat" />
          <span className="text-sm font-medium text-muted-foreground">Pulse</span>
        </div>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-display font-bold text-foreground">
            {heartRate ?? "--"}
          </span>
          <span className="text-lg text-muted-foreground">bpm</span>
        </div>
        <div className={`mt-2 text-xs font-medium ${
          heartRate && heartRate >= 60 && heartRate <= 100 ? "text-success" : "text-primary"
        }`}>
          {heartRate ? (heartRate >= 60 && heartRate <= 100 ? "Normal" : "Irregular") : ""}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
