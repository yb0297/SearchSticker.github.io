import { BatteryIndicator } from '../BatteryIndicator';

export default function BatteryIndicatorExample() {
  return (
    <div className="p-6 space-y-4 bg-background">
      <BatteryIndicator level={85} size="lg" />
      <BatteryIndicator level={45} size="md" />
      <BatteryIndicator level={15} size="sm" />
    </div>
  );
}
