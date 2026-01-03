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
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-primary" />
        </div>
        Tips for accuracy
      </h3>
      
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 group"
          >
            <div className="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
              <tip.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
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
