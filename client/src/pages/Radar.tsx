import { useQuery } from "@tanstack/react-query";
import type { Sticker } from "@shared/types";
import { useEffect, useRef, useState } from "react";
import { BatteryIndicator } from "@/components/BatteryIndicator";
import { StatusBadge } from "@/components/StatusBadge";
import { Card } from "@/components/ui/card";

function rssiToRadius(rssi: number, maxRadius: number): number {
  if (rssi > -50) return maxRadius * 0.25;
  if (rssi > -70) return maxRadius * 0.55;
  if (rssi > -85) return maxRadius * 0.80;
  return maxRadius * 0.95;
}

function rssiToColor(rssi: number): string {
  if (rssi > -50) return "#22c55e";
  if (rssi > -70) return "#eab308";
  if (rssi > -85) return "#f97316";
  return "#ef4444";
}

export default function Radar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  const [rotation, setRotation] = useState(0);

  const { data: stickers = [], isLoading } = useQuery<Sticker[]>({
    queryKey: ["stickers"],
    queryFn: async () => {
      const response = await fetch("/api/stickers");
      if (!response.ok) {
        throw new Error("Failed to fetch stickers");
      }
      return response.json();
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 20;

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 1;
    [0.25, 0.5, 0.75, 1].forEach((scale) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * scale, 0, Math.PI * 2);
      ctx.stroke();
    });

    ctx.strokeStyle = "#1f2937";
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + maxRadius * Math.cos(angle),
        centerY + maxRadius * Math.sin(angle)
      );
      ctx.stroke();
    }

    const gradient = ctx.createLinearGradient(
      centerX,
      centerY,
      centerX + maxRadius * Math.cos((rotation * Math.PI) / 180),
      centerY + maxRadius * Math.sin((rotation * Math.PI) / 180)
    );
    gradient.addColorStop(0, "rgba(34, 197, 94, 0.3)");
    gradient.addColorStop(1, "rgba(34, 197, 94, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(
      centerX,
      centerY,
      maxRadius,
      ((rotation - 45) * Math.PI) / 180,
      ((rotation + 45) * Math.PI) / 180
    );
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    stickers.forEach((sticker, index) => {
      const radius = rssiToRadius(sticker.rssi, maxRadius);
      const angle = ((index * 360) / stickers.length + rotation * 0.1) * (Math.PI / 180);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const color = rssiToColor(sticker.rssi);

      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.stroke();

      const textSize = 10;
      ctx.font = `${textSize}px sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(sticker.name.substring(0, 10), x, y - 18);
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#3b82f6";
    ctx.fill();
  }, [stickers, rotation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading radar...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6 space-y-4 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-2">Proximity Radar</h1>
          <p className="text-muted-foreground">
            Signal strength detector showing {stickers.length} stickers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card className="p-4 bg-card">
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
              className="w-full h-auto rounded-lg"
              onClick={(e) => {
                const canvas = canvasRef.current;
                if (!canvas) return;

                const rect = canvas.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 600;
                const y = ((e.clientY - rect.top) / rect.height) * 600;

                const centerX = 300;
                const centerY = 300;
                const maxRadius = 280;

                stickers.forEach((sticker, index) => {
                  const radius = rssiToRadius(sticker.rssi, maxRadius);
                  const angle =
                    ((index * 360) / stickers.length + rotation * 0.1) *
                    (Math.PI / 180);
                  const sx = centerX + radius * Math.cos(angle);
                  const sy = centerY + radius * Math.sin(angle);

                  const distance = Math.sqrt((x - sx) ** 2 + (y - sy) ** 2);
                  if (distance < 15) {
                    setSelectedSticker(sticker);
                  }
                });
              }}
            />
            
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Close (&gt;-50dBm)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>Medium (-70dBm)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <span>Far (-85dBm)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>Weak (&lt;-85dBm)</span>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Detected Stickers</h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {stickers.map((sticker) => (
                  <div
                    key={sticker.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedSticker?.id === sticker.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-accent"
                    }`}
                    onClick={() => setSelectedSticker(sticker)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{sticker.name}</span>
                      <StatusBadge status={sticker.status} />
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor: rssiToColor(sticker.rssi) + "20",
                          color: rssiToColor(sticker.rssi),
                        }}
                      >
                        {sticker.rssi} dBm
                      </span>
                      <BatteryIndicator level={sticker.batteryLevel} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {selectedSticker && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Sticker Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Name</span>
                    <p className="font-medium">{selectedSticker.name}</p>
                  </div>
                  {selectedSticker.assetName && (
                    <div>
                      <span className="text-sm text-muted-foreground">Asset</span>
                      <p className="font-medium">{selectedSticker.assetName}</p>
                    </div>
                  )}
                  {selectedSticker.location && (
                    <div>
                      <span className="text-sm text-muted-foreground">Location</span>
                      <p className="font-medium">{selectedSticker.location}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-muted-foreground">Signal Strength</span>
                    <p className="font-medium">{selectedSticker.rssi} dBm</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">MAC Address</span>
                    <p className="font-mono text-sm">{selectedSticker.macAddress}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <BatteryIndicator level={selectedSticker.batteryLevel} />
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
