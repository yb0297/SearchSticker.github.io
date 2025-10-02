import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function CostCalculator() {
  const [quantity, setQuantity] = useState(200);

  const calculateCost = (qty: number) => {
    if (qty <= 10) return 640;
    if (qty <= 200) return 640 - ((qty - 10) / 190) * (640 - 370);
    if (qty <= 10000) return 370 - ((qty - 200) / 9800) * (370 - 210);
    return 210;
  };

  const cost = Math.round(calculateCost(quantity));
  const totalCost = cost * quantity;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Production Cost Calculator</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-muted-foreground">Quantity</label>
            <span className="text-sm font-mono font-semibold" data-testid="text-quantity">
              {quantity} units
            </span>
          </div>
          <Slider
            value={[quantity]}
            onValueChange={(value) => setQuantity(value[0])}
            min={10}
            max={10000}
            step={10}
            data-testid="slider-quantity"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-md bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Unit Cost</p>
            <p className="text-xl font-bold" data-testid="text-unit-cost">₹{cost}</p>
          </div>
          <div className="p-4 rounded-md bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Total Cost</p>
            <p className="text-xl font-bold" data-testid="text-total-cost">₹{totalCost.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Prototype (10 units)</span>
            <span className="font-mono">₹640/unit</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pilot (200 units)</span>
            <span className="font-mono">₹370/unit</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Mass (10k units)</span>
            <span className="font-mono">₹210/unit</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
