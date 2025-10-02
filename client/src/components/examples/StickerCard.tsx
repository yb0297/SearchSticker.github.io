import { StickerCard } from '../StickerCard';

export default function StickerCardExample() {
  return (
    <div className="p-6 max-w-md bg-background">
      <StickerCard
        id="1"
        name="Office Laptop"
        batteryLevel={75}
        rssi={-65}
        assetName="MacBook Pro 16"
        location="Office - Desk 12"
        lastSeen={new Date(Date.now() - 5 * 60 * 1000)}
        status="active"
        onClick={() => console.log('Card clicked')}
      />
    </div>
  );
}
