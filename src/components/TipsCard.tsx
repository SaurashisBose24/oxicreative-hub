import { Lightbulb, ThermometerSun, Hand, Timer, Sparkles } from "lucide-react";

const tips = [
  {
    icon: Hand,
    text: "Rest finger gently on sensor",
    highlight: "Don't press too hard"
  },
  {
    icon: ThermometerSun,
    text: "Warm hands give more accurate",
    highlight: "readings"
  },
  {
    icon: Sparkles,
    text: "Avoid nail polish or artificial",
    highlight: "nails"
  },
  {
    icon: Timer,
    text: "Stay at rest for 2-3 min before",
    highlight: "measuring"
  }
];

const TipsCard = () => {
  return (
    <div className="bg-gradient-to-br from-card to-accent/20 rounded-2xl shadow-card border border-border/50 p-6">
      <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-primary" />
        Tips for accurate measurement
      </h3>
      
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors duration-200">
              <tip.icon className="w-4 h-4 text-secondary" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tip.text}{" "}
              <span className="text-foreground font-medium">{tip.highlight}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsCard;
