import { Clock, TrendingUp, TrendingDown, Minus, Activity } from "lucide-react";

interface Reading {
  id: string;
  oxygen: number;
  heartRate: number;
  timestamp: Date;
}

interface ReadingHistoryProps {
  readings: Reading[];
}

const ReadingHistory = ({ readings }: ReadingHistoryProps) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const getTrend = (current: number, previous: number | undefined) => {
    if (!previous) return null;
    if (current > previous) return <TrendingUp className="w-3 h-3 text-success" />;
    if (current < previous) return <TrendingDown className="w-3 h-3 text-red-400" />;
    return <Minus className="w-3 h-3 text-muted-foreground" />;
  };

  if (readings.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 h-full">
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center">
            <Clock className="w-4 h-4 text-secondary" />
          </div>
          Recent Readings
        </h3>
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <p className="text-sm text-muted-foreground">No readings yet</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Start measuring to build history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center">
          <Clock className="w-4 h-4 text-secondary" />
        </div>
        Recent Readings
      </h3>
      
      <div className="space-y-3">
        {readings.slice(0, 5).map((reading, index) => (
          <div 
            key={reading.id}
            className="flex items-center justify-between p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors duration-200 animate-fade-in border border-border/30"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{reading.oxygen}%</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    SpO₂: {reading.oxygen}%
                  </span>
                  {getTrend(reading.oxygen, readings[index + 1]?.oxygen)}
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  {reading.heartRate} BPM
                </span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground/80">
              {formatTime(reading.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingHistory;
