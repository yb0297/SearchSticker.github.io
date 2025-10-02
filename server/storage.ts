import { type Sticker, type InsertSticker } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getSticker(id: string): Promise<Sticker | undefined>;
  getAllStickers(): Promise<Sticker[]>;
  createSticker(sticker: InsertSticker): Promise<Sticker>;
  updateSticker(id: string, sticker: Partial<InsertSticker>): Promise<Sticker | undefined>;
  deleteSticker(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private stickers: Map<string, Sticker>;

  constructor() {
    this.stickers = new Map();
    this.seedData();
  }

  private seedData() {
    const sampleStickers: Sticker[] = [
      {
        id: randomUUID(),
        name: "Office Laptop",
        macAddress: "AA:BB:CC:DD:EE:01",
        batteryLevel: 75,
        rssi: -65,
        assetName: "MacBook Pro 16",
        location: "Office - Desk 12",
        latitude: 40.7589,
        longitude: -73.9851,
        lastSeen: new Date(Date.now() - 5 * 60 * 1000),
        status: "active",
      },
      {
        id: randomUUID(),
        name: "Warehouse Tool",
        macAddress: "AA:BB:CC:DD:EE:02",
        batteryLevel: 45,
        rssi: -78,
        assetName: "Power Drill",
        location: "Warehouse - Shelf A3",
        latitude: 40.7410,
        longitude: -73.9896,
        lastSeen: new Date(Date.now() - 15 * 60 * 1000),
        status: "active",
      },
      {
        id: randomUUID(),
        name: "Store Display",
        macAddress: "AA:BB:CC:DD:EE:03",
        batteryLevel: 15,
        rssi: -85,
        assetName: "Luxury Watch",
        location: "Store - Display Case 2",
        latitude: 40.7614,
        longitude: -73.9776,
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: "low battery",
      },
      {
        id: randomUUID(),
        name: "Meeting Room",
        macAddress: "AA:BB:CC:DD:EE:04",
        batteryLevel: 92,
        rssi: -55,
        assetName: "Projector Remote",
        location: "Floor 3 - Room 301",
        latitude: 40.7527,
        longitude: -73.9772,
        lastSeen: new Date(Date.now() - 30 * 60 * 1000),
        status: "active",
      },
    ];

    sampleStickers.forEach(sticker => {
      this.stickers.set(sticker.id, sticker);
    });
  }

  async getSticker(id: string): Promise<Sticker | undefined> {
    return this.stickers.get(id);
  }

  async getAllStickers(): Promise<Sticker[]> {
    return Array.from(this.stickers.values());
  }

  async createSticker(insertSticker: InsertSticker): Promise<Sticker> {
    const id = randomUUID();
    const sticker: Sticker = { 
      ...insertSticker, 
      id,
      assetName: insertSticker.assetName ?? null,
      location: insertSticker.location ?? null,
      latitude: insertSticker.latitude ?? null,
      longitude: insertSticker.longitude ?? null
    };
    this.stickers.set(id, sticker);
    return sticker;
  }

  async updateSticker(id: string, updates: Partial<InsertSticker>): Promise<Sticker | undefined> {
    const sticker = this.stickers.get(id);
    if (!sticker) return undefined;
    
    const updatedSticker = { ...sticker, ...updates };
    this.stickers.set(id, updatedSticker);
    return updatedSticker;
  }

  async deleteSticker(id: string): Promise<boolean> {
    return this.stickers.delete(id);
  }
}

export const storage = new MemStorage();
