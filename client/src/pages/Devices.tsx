import { StickerCard } from "@/components/StickerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  {
    id: "5",
    name: "Inventory Item",
    batteryLevel: 60,
    rssi: -72,
    assetName: "Scanner Device",
    location: "Warehouse - Zone B",
    lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000),
    status: "active",
  },
  {
    id: "6",
    name: "Reception Tablet",
    batteryLevel: 88,
    rssi: -58,
    assetName: "iPad Pro",
    location: "Reception Desk",
    lastSeen: new Date(Date.now() - 10 * 60 * 1000),
    status: "active",
  },
];

export default function Devices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredAndSorted = mockStickers
    .filter(sticker => {
      const matchesSearch = sticker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sticker.assetName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sticker.location?.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (filterStatus === "all") return matchesSearch;
      if (filterStatus === "active") return matchesSearch && sticker.status === "active";
      if (filterStatus === "low-battery") return matchesSearch && sticker.batteryLevel < 20;
      if (filterStatus === "inactive") return matchesSearch && sticker.status === "inactive";
      
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "battery") return b.batteryLevel - a.batteryLevel;
      if (sortBy === "signal") return b.rssi - a.rssi;
      if (sortBy === "recent") return b.lastSeen.getTime() - a.lastSeen.getTime();
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Devices</h1>
            <p className="text-muted-foreground">{filteredAndSorted.length} stickers found</p>
          </div>
          <Button data-testid="button-add-sticker" onClick={() => console.log('Add new sticker')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Sticker
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, asset, or location..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-devices"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 flex-1">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="flex-1" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="battery">Battery Level</SelectItem>
                  <SelectItem value="signal">Signal Strength</SelectItem>
                  <SelectItem value="recent">Recently Seen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="flex-1" data-testid="select-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="low-battery">Low Battery</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSorted.map((sticker) => (
            <StickerCard
              key={sticker.id}
              {...sticker}
              onClick={() => console.log(`View details for ${sticker.name}`)}
            />
          ))}
        </div>

        {filteredAndSorted.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-2">No devices found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
