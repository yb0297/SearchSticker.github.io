import { StatsCard } from "@/components/StatsCard";
import { StickerCard } from "@/components/StickerCard";
import { Layers, Activity, BatteryWarning, Bluetooth } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

//todo: remove mock functionality
const mockStickers = [
  {
    id: "1",
    name: "Office Laptop",
    batteryLevel: 75,
    rssi: -65,
    assetName: "MacBook Pro 16",
    location: "Office - Desk 12",
    lastSeen: new Date(Date.now() - 5 * 60 * 1000),
    status: "active",
  },
  {
    id: "2",
    name: "Warehouse Tool",
    batteryLevel: 45,
    rssi: -78,
    assetName: "Power Drill",
    location: "Warehouse - Shelf A3",
    lastSeen: new Date(Date.now() - 15 * 60 * 1000),
    status: "active",
  },
  {
    id: "3",
    name: "Store Display",
    batteryLevel: 15,
    rssi: -85,
    assetName: "Luxury Watch",
    location: "Store - Display Case 2",
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "low battery",
  },
  {
    id: "4",
    name: "Meeting Room",
    batteryLevel: 92,
    rssi: -55,
    assetName: "Projector Remote",
    location: "Floor 3 - Room 301",
    lastSeen: new Date(Date.now() - 30 * 60 * 1000),
    status: "active",
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  //todo: remove mock functionality
  const activeCount = mockStickers.filter(s => s.status === "active").length;
  const lowBatteryCount = mockStickers.filter(s => s.batteryLevel < 20).length;

  const filteredStickers = mockStickers.filter(sticker => {
    const matchesSearch = sticker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sticker.assetName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sticker.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "All") return matchesSearch;
    if (selectedFilter === "Active") return matchesSearch && sticker.status === "active";
    if (selectedFilter === "Low Battery") return matchesSearch && sticker.batteryLevel < 20;
    if (selectedFilter === "Inactive") return matchesSearch && sticker.status === "inactive";
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6 space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your BLE search stickers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            title="Total Stickers"
            value={mockStickers.length}
            icon={Layers}
            description={`${activeCount} active`}
          />
          <StatsCard
            title="Active Now"
            value={activeCount}
            icon={Activity}
            description="Connected"
          />
          <StatsCard
            title="Low Battery"
            value={lowBatteryCount}
            icon={BatteryWarning}
            description="Need attention"
          />
          <StatsCard
            title="BLE Devices"
            value={mockStickers.length}
            icon={Bluetooth}
            description="Total tracked"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stickers, assets, or locations..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {["All", "Active", "Low Battery", "Inactive"].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                data-testid={`button-filter-${filter.toLowerCase().replace(/\s+/g, '-')}`}
                className="whitespace-nowrap"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredStickers.map((sticker) => (
            <StickerCard
              key={sticker.id}
              {...sticker}
              onClick={() => console.log(`View details for ${sticker.name}`)}
            />
          ))}
        </div>

        {filteredStickers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No stickers found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
