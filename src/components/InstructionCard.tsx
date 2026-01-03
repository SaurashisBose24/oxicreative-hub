import { FileText, AlertTriangle } from "lucide-react";

const instructions = [
  { text: "Place finger", highlight: "gently", suffix: "— do not press hard", isWarning: false },
  { text: "Ensure finger is", highlight: "warm and clean", suffix: "(no nail polish)", isWarning: false },
  { text: "Keep hand relaxed and", highlight: "below heart level", suffix: "", isWarning: false },
  { text: "Keep finger on sensor until", highlight: "red light turns off", suffix: "", isWarning: true },
];

const InstructionCard = () => {
  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/50 p-6 max-w-md w-full transition-all duration-300 hover:shadow-soft">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-secondary" />
        <h3 className="font-display font-semibold text-foreground">Important Instructions</h3>
      </div>
      
      {/* Instructions list */}
      <ul className="space-y-3">
        {instructions.map((instruction, index) => (
          <li 
            key={index}
            className={`flex items-start gap-2 text-sm transition-all duration-200 hover:translate-x-1 ${
              instruction.isWarning ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <span className="text-muted-foreground/60">•</span>
            <span>
              {instruction.text}{" "}
              <strong className={instruction.isWarning ? "text-primary" : "text-foreground"}>
                {instruction.highlight}
              </strong>
              {instruction.suffix && ` ${instruction.suffix}`}
            </span>
          </li>
        ))}
      </ul>
      
      {/* Warning footer */}
      <div className="mt-4 pt-4 border-t border-border/50 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-sm text-primary font-medium">
          Make sure device is connected before starting
        </p>
      </div>
    </div>
  );
};

export default InstructionCard;
