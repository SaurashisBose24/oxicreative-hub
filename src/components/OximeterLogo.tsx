import { Hand } from "lucide-react";

const OximeterLogo = () => {
  return (
    <div className="flex items-center gap-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
      {/* Hand in oximeter illustration */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
        <Hand className="w-5 h-5 text-secondary" />
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground leading-tight">Please keep your hand inside</span>
          <span className="text-xs text-muted-foreground leading-tight">the oximeter</span>
        </div>
      </div>
      
      {/* Brand */}
      <span className="font-display text-lg font-bold">
        <span className="text-foreground">Re</span>
        <span className="text-secondary">liv</span>
      </span>
    </div>
  );
};

export default OximeterLogo;
