export interface Sticker {
  id: string;
  name: string;
  macAddress: string;
  batteryLevel: number;
  rssi: number;
  assetName: string | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  lastSeen: Date;
  status: string;
}

export interface InsertSticker {
  name: string;
  macAddress: string;
  batteryLevel: number;
  rssi: number;
  assetName?: string | null;
  location?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  lastSeen: Date;
  status: string;
}
