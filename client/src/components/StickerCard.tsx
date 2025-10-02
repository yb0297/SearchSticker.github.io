import { Card } from "@/components/ui/card";
import { BatteryIndicator } from "./BatteryIndicator";
import { SignalStrength } from "./SignalStrength";
import { StatusBadge } from "./StatusBadge";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Package } from "lucide-react";

interface StickerCardProps {
  id: string;
  name: string;
  batteryLevel: number;
  rssi: number;
  assetName?: string;
  location?: string;
  lastSeen: Date;
  status: string;
  onClick?: () => void;
}

export function StickerCard({
  id,
  name,
  batteryLevel,
  rssi,
  assetName,
  location,
  lastSeen,
  status,
  onClick,
}: StickerCardProps) {
  return (
    <Card
      className="p-4 hover-elevate active-elevate-2 cursor-pointer"
      onClick={onClick}
      data-testid={`card-sticker-${id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-base truncate" data-testid={`text-sticker-name-${id}`}>
              {name}
            </h3>
            <StatusBadge status={status} />
          </div>

          {assetName && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
              <Package className="h-3.5 w-3.5" />
              <span className="truncate">{assetName}</span>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">{location}</span>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Last seen {formatDistanceToNow(lastSeen, { addSuffix: true })}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <BatteryIndicator level={batteryLevel} size="sm" />
          <SignalStrength rssi={rssi} size="sm" />
        </div>
      </div>
    </Card>
  );
}
