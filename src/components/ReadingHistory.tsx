import { Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";

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
    if (current < previous) return <TrendingDown className="w-3 h-3 text-destructive" />;
    return <Minus className="w-3 h-3 text-muted-foreground" />;
  };

  if (readings.length === 0) {
    return (
      <div className="bg-card rounded-2xl shadow-card border border-border/50 p-6">
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-secondary" />
          Recent Readings
        </h3>
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No readings yet</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Start a measurement to see history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/50 p-6">
      <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-secondary" />
        Recent Readings
      </h3>
      
      <div className="space-y-3">
        {readings.slice(0, 5).map((reading, index) => (
          <div 
            key={reading.id}
            className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-200 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <span className="text-sm font-bold text-success">{reading.oxygen}%</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    SpO2: {reading.oxygen}%
                  </span>
                  {getTrend(reading.oxygen, readings[index + 1]?.oxygen)}
                </div>
                <span className="text-xs text-muted-foreground">
                  {reading.heartRate} BPM
                </span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatTime(reading.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingHistory;
