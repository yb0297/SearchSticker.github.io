interface SignalStrengthProps {
  rssi: number;
  size?: "sm" | "md";
}

export function SignalStrength({ rssi, size = "md" }: SignalStrengthProps) {
  const bars = Math.max(1, Math.min(5, Math.floor((rssi + 100) / 15) + 1));
  const barHeight = size === "sm" ? 12 : 16;
  const barWidth = size === "sm" ? 2 : 3;
  const gap = size === "sm" ? 1 : 2;

  const getColor = () => {
    if (rssi >= -60) return "hsl(var(--chart-2))";
    if (rssi >= -75) return "hsl(var(--chart-3))";
    return "hsl(var(--chart-4))";
  };

  return (
    <div className="flex items-end gap-0.5" style={{ gap: `${gap}px` }}>
      {[1, 2, 3, 4, 5].map((bar) => (
        <div
          key={bar}
          style={{
            width: `${barWidth}px`,
            height: `${(barHeight * bar) / 5}px`,
            backgroundColor: bar <= bars ? getColor() : "hsl(var(--muted))",
          }}
          className="rounded-sm"
        />
      ))}
    </div>
  );
}
