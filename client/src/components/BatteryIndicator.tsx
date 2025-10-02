import { Battery, BatteryLow, BatteryMedium, BatteryWarning } from "lucide-react";

interface BatteryIndicatorProps {
  level: number;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
}

export function BatteryIndicator({ 
  level, 
  size = "md",
  showPercentage = true 
}: BatteryIndicatorProps) {
  const getColor = () => {
    if (level >= 50) return "text-chart-2";
    if (level >= 20) return "text-chart-3";
    return "text-chart-4";
  };

  const getIcon = () => {
    const sizeClass = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";
    const color = getColor();
    
    if (level >= 75) return <Battery className={`${sizeClass} ${color}`} />;
    if (level >= 50) return <BatteryMedium className={`${sizeClass} ${color}`} />;
    if (level >= 20) return <BatteryLow className={`${sizeClass} ${color}`} />;
    return <BatteryWarning className={`${sizeClass} ${color}`} />;
  };

  return (
    <div className="flex items-center gap-2">
      {getIcon()}
      {showPercentage && (
        <span className={`text-sm font-medium ${getColor()}`}>
          {level}%
        </span>
      )}
    </div>
  );
}
