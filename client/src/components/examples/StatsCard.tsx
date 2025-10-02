import { StatsCard } from '../StatsCard';
import { Layers } from 'lucide-react';

export default function StatsCardExample() {
  return (
    <div className="p-6 max-w-sm bg-background">
      <StatsCard
        title="Total Stickers"
        value={24}
        icon={Layers}
        description="8 active"
      />
    </div>
  );
}
