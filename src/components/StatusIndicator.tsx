import { Wifi, WifiOff } from "lucide-react";

interface StatusIndicatorProps {
  isConnected: boolean;
}

const StatusIndicator = ({ isConnected }: StatusIndicatorProps) => {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
      isConnected 
        ? "bg-success/10 border border-success/30" 
        : "bg-destructive/10 border border-destructive/30"
    }`}>
      <div className="relative">
        {isConnected && (
          <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-success animate-ping opacity-75" />
        )}
        <div 
          className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
            isConnected ? "bg-success" : "bg-destructive"
          }`} 
        />
      </div>
      {isConnected ? (
        <Wifi className="w-4 h-4 text-success" />
      ) : (
        <WifiOff className="w-4 h-4 text-destructive" />
      )}
      <span className={`text-sm font-medium transition-colors duration-300 ${
        isConnected ? "text-success" : "text-destructive"
      }`}>
        {isConnected ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
};

export default StatusIndicator;
