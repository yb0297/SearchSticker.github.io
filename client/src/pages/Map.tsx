import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import type { Sticker } from "@shared/types";
import { BatteryIndicator } from "@/components/BatteryIndicator";
import { StatusBadge } from "@/components/StatusBadge";
import { SignalStrength } from "@/components/SignalStrength";
import { formatDistanceToNow } from "date-fns";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

export default function Map() {
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

  const stickersWithLocation = stickers.filter(
    (s) => s.latitude !== null && s.longitude !== null
  );

  const centerLat = stickersWithLocation.length > 0
    ? stickersWithLocation.reduce((sum, s) => sum + (s.latitude || 0), 0) / stickersWithLocation.length
    : 40.7589;

  const centerLng = stickersWithLocation.length > 0
    ? stickersWithLocation.reduce((sum, s) => sum + (s.longitude || 0), 0) / stickersWithLocation.length
    : -73.9851;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6 space-y-4 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-2">Sticker Locations</h1>
          <p className="text-muted-foreground">
            {stickersWithLocation.length} stickers with location data
          </p>
        </div>

        <div className="rounded-lg overflow-hidden border border-border" style={{ height: "calc(100vh - 220px)" }}>
          <MapContainer
            center={[centerLat, centerLng]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {stickersWithLocation.map((sticker) => (
              <Marker
                key={sticker.id}
                position={[sticker.latitude!, sticker.longitude!]}
              >
                <Popup>
                  <div className="min-w-[250px] p-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{sticker.name}</h3>
                      <StatusBadge status={sticker.status} />
                    </div>
                    
                    {sticker.assetName && (
                      <p className="text-sm text-gray-600 mb-1">
                        📦 {sticker.assetName}
                      </p>
                    )}
                    
                    {sticker.location && (
                      <p className="text-sm text-gray-600 mb-2">
                        📍 {sticker.location}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 mb-2">
                      <BatteryIndicator level={sticker.batteryLevel} />
                      <SignalStrength rssi={sticker.rssi} />
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      Last seen {formatDistanceToNow(new Date(sticker.lastSeen), { addSuffix: true })}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {stickersWithLocation.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No stickers with location data found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
