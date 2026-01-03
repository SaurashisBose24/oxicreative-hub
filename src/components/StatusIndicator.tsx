interface StatusIndicatorProps {
  isConnected: boolean;
}

const StatusIndicator = ({ isConnected }: StatusIndicatorProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {/* Pulse effect when connected */}
        {isConnected && (
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-success animate-ping opacity-75" />
        )}
        <div 
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            isConnected ? "bg-success" : "bg-destructive"
          }`} 
        />
      </div>
      <span className={`text-sm font-medium transition-colors duration-300 ${
        isConnected ? "text-success" : "text-destructive"
      }`}>
        {isConnected ? "Device Connected" : "Device Disconnected"}
      </span>
    </div>
  );
};

export default StatusIndicator;
