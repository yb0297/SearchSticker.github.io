import { StatusBadge } from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="p-6 space-x-2 bg-background">
      <StatusBadge status="active" />
      <StatusBadge status="inactive" />
      <StatusBadge status="low battery" />
    </div>
  );
}
