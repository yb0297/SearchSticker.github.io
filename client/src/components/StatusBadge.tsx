import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getVariant = () => {
    switch (status.toLowerCase()) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "low battery":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Badge variant={getVariant()} data-testid={`badge-status-${status.toLowerCase()}`}>
      <div className="flex items-center gap-1.5">
        <div className={`h-1.5 w-1.5 rounded-full ${
          status === "active" ? "bg-chart-2" : 
          status === "inactive" ? "bg-muted-foreground" : 
          "bg-chart-4"
        }`} />
        {status}
      </div>
    </Badge>
  );
}
