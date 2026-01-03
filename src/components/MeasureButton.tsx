import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MeasureButtonProps {
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
}

const MeasureButton = ({ onClick, isActive, disabled }: MeasureButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="measure"
      size="lg"
      className="group"
    >
      <Activity 
        className={`w-5 h-5 mr-2 transition-transform duration-300 ${
          isActive ? "animate-pulse" : "group-hover:scale-110"
        }`} 
      />
      <span>{isActive ? "Measuring..." : "Measure Oxygen"}</span>
      
      {/* Shimmer effect */}
      {!isActive && !disabled && (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 animate-shimmer opacity-50" />
        </div>
      )}
    </Button>
  );
};

export default MeasureButton;
