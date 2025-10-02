import { SignalStrength } from '../SignalStrength';

export default function SignalStrengthExample() {
  return (
    <div className="p-6 space-y-4 bg-background">
      <SignalStrength rssi={-50} size="md" />
      <SignalStrength rssi={-70} size="md" />
      <SignalStrength rssi={-90} size="sm" />
    </div>
  );
}
