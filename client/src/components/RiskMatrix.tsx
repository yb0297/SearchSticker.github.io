import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Risk {
  drawback: string;
  solution: string;
  impact: "High" | "Medium" | "Low";
}

const risks: Risk[] = [
  { drawback: "Battery life limitations", solution: "Deep-sleep firmware, fewer adverts, bigger cell, replacement schedule", impact: "High" },
  { drawback: "Limited power for features", solution: "Phone app alerts, low-power LEDs, rechargeable SKU", impact: "Medium" },
  { drawback: "IR false positives", solution: "Pulsed IR, debounce, alternative sensors", impact: "High" },
  { drawback: "BLE range/interference", solution: "Adaptive TX power, BLE-WiFi gateways, antenna tuning", impact: "High" },
  { drawback: "Sticker fragility", solution: "Rugged SKU, strong adhesive, mounting clips", impact: "High" },
  { drawback: "Maintenance overhead", solution: "Battery alerts, service kits, mesh/gateway", impact: "High" },
  { drawback: "Security/privacy risks", solution: "BLE bonding, rotating IDs, minimal PII", impact: "High" },
  { drawback: "Cost vs. value mismatch", solution: "Tiered pricing, ROI case studies", impact: "Medium" },
  { drawback: "Certification costs", solution: "Pre-certified modules, EMS partners", impact: "Medium" },
  { drawback: "Competition", solution: "Ultra-thin design, tamper logs, system integration", impact: "Medium" },
];

export function RiskMatrix() {
  const [filter, setFilter] = useState<"All" | "High" | "Medium" | "Low">("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredRisks = filter === "All" ? risks : risks.filter(r => r.impact === filter);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Risk vs. Solution Matrix</h3>
        <div className="flex gap-2">
          {["All", "High", "Medium", "Low"].map((f) => (
            <Badge
              key={f}
              variant={filter === f ? "default" : "outline"}
              className="cursor-pointer hover-elevate active-elevate-2"
              onClick={() => setFilter(f as typeof filter)}
              data-testid={`button-filter-${f.toLowerCase()}`}
            >
              {f}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filteredRisks.map((risk, index) => (
          <div
            key={index}
            className="border rounded-md hover-elevate"
            data-testid={`risk-item-${index}`}
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full p-3 flex items-center justify-between text-left"
              data-testid={`button-expand-risk-${index}`}
            >
              <div className="flex items-center gap-3 flex-1">
                {expandedIndex === index ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="font-medium">{risk.drawback}</span>
              </div>
              <Badge variant={risk.impact === "High" ? "destructive" : risk.impact === "Medium" ? "default" : "secondary"}>
                {risk.impact}
              </Badge>
            </button>
            {expandedIndex === index && (
              <div className="px-3 pb-3 pl-10 text-sm text-muted-foreground">
                <strong>Solution:</strong> {risk.solution}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
